import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
import whisper
import asyncio
import os
import uuid
import openai
from fastapi.middleware.cors import CORSMiddleware
import httpx
import traceback  # 追加

app = FastAPI()

origins = [
    "http://localhost:5173",
    # TODO: ここに本番環境のオリジンを入れる
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisperモデルのロード（アプリ起動時に一度だけロード）
model = whisper.load_model("base")  # "tiny", "base", "small", "medium", "large" の中から選択

# Whisperを使った音声のテキスト変換
async def transcribe_audio(file: UploadFile) -> str:
    # ユニークなファイル名を生成
    filename = f"temp_audio_{uuid.uuid4().hex}"
    file_path = os.path.join("/app", filename)

    # アップロードされたファイルを一時ファイルとして保存
    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)

    try:
        # Whisperを使って音声をテキストに変換
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, model.transcribe, file_path)
        transcribed_text = result["text"]
        print(f"Transcribed text: {transcribed_text}")  # デバッグ用
    finally:
        # 一時ファイルを削除
        os.remove(file_path)

    return transcribed_text

initial_prompt = """
命令：
・あなたは私の彼女です。

以下の条件をもとに、会話をしてください

条件：
・会話をしているような口調
・私たちは仲良しです
・出力に記号は使わない
"""

# GPTモデルにテキスト送信 & 返信受信
def get_llm_response(user_text: str) -> str:
    # OpenAIのAPIキーを設定（環境変数から取得）
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    # OpenAI APIを使って応答を取得
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": initial_prompt},
            {"role": "user", "content": user_text},
        ]
    )
    llm_response = response.choices[0].message['content']
    print(f"LLM Response: {llm_response}")  # デバッグ用
    return llm_response

# AivisSpeech APIのエンドポイント設定
AIVIS_API_URL = "http://aivis:10101/audio_query"
AIVIS_SYNTH_URL = "http://aivis:10101/synthesis"

def replace_none_in_lengths(data):
    if isinstance(data, dict):
        for k, v in data.items():
            if k in ['consonant_length', 'vowel_length', 'pitch'] and v is None:
                data[k] = 0.0
            elif isinstance(v, (dict, list)):
                replace_none_in_lengths(v)
        return data
    elif isinstance(data, list):
        for item in data:
            replace_none_in_lengths(item)
        return data
    else:
        return data

async def text_to_speech_aivis(text: str, speaker_id: int = 1) -> str:
    synthesis_response = None  # 変数を初期化しておく
    try:
        # Step 1: Audio Queryの取得
        async with httpx.AsyncClient() as client:
            query_response = await client.post(
                f"{AIVIS_API_URL}?text={text}&speaker={speaker_id}"
            )
            query_response.raise_for_status()
            query_data = query_response.json()

            # Audio Queryのデバッグ用ログ
            print(f"Audio Query Response: {query_data}")  # デバッグ用

            # Noneの値をデフォルト値に置き換える
            replace_none_in_lengths(query_data)

            # Step 2: 音声合成 (Synthesis)
            synthesis_response = await client.post(
                f"{AIVIS_SYNTH_URL}?speaker={speaker_id}",
                json=query_data,
                headers={"Content-Type": "application/json"},
                timeout=60.0  # タイムアウトを60秒に設定
            )
            synthesis_response.raise_for_status()

            # 音声データを保存
            output_path = f"/app/output_{uuid.uuid4().hex}.wav"
            with open(output_path, "wb") as audio_file:
                audio_file.write(synthesis_response.content)

        print(f"Audio Path: {output_path}")  # デバッグ用
        return output_path

    except httpx.HTTPStatusError as e:
        # HTTPステータスエラーをキャッチして詳細をログに記録
        error_message = f"HTTP error occurred: {e.response.status_code} - {e.response.text}"  # デバッグ用
        print(error_message)  # デバッグ用
        traceback.print_exc()  # スタックトレースを出力
        raise HTTPException(status_code=500, detail=error_message)

    except Exception as e:
        # その他の例外をキャッチして詳細をログに記録
        error_message = f"Error during text-to-speech synthesis: {e}"  # デバッグ用
        print(error_message)  # デバッグ用
        traceback.print_exc()  # スタックトレースを出力
        if synthesis_response:
            print(f"Synthesis Response Content: {synthesis_response.text}")  # デバッグ用
        raise HTTPException(status_code=500, detail=error_message)

@app.post("/chat_with_voice/")
async def chat_with_voice(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    try:
        # 音声をテキストに変換
        transcribed_text = await transcribe_audio(file)

        # LLMにテキストを送り応答を取得（非同期実行）
        loop = asyncio.get_event_loop()
        llm_response = await loop.run_in_executor(None, get_llm_response, transcribed_text)

        # 音声データを生成する
        speaker = 888753760  # 正しいスピーカーIDに変更
        audio_path = await text_to_speech_aivis(llm_response, speaker)

        # 音声データをクライアントに送信するための準備
        def iterfile():
            try:
                with open(audio_path, mode="rb") as file_like:
                    yield from file_like
            except Exception as e:
                print(f"Error during file streaming: {e}")  # デバッグ用

        print(f"Returning audio file: {audio_path}")  # デバッグ用
        return StreamingResponse(iterfile(), media_type="audio/wav")

    except Exception as e:
        print(f"Error occurred: {e}")  # デバッグ用
        traceback.print_exc()  # スタックトレースを出力
        raise HTTPException(status_code=500, detail=str(e))
