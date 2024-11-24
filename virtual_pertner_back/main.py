import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import whisper
import asyncio
import os
import uuid
import openai
from fastapi.middleware.cors import CORSMiddleware
from gtts import gTTS

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
    finally:
        # 一時ファイルを削除
        os.remove(file_path)

    return transcribed_text


# gptモデルにテキスト送信 & 返信受信
def get_llm_response(user_text: str) -> str:
    # OpenAIのAPIキーを設定（環境変数から取得）
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    # OpenAI APIを使って応答を取得
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは私の可愛い彼女です。敬語ではなくて砕けた言葉で話してね。"},
            {"role": "user", "content": user_text},
        ]
    )
    llm_response = response.choices[0].message['content']
    return llm_response


@app.post("/chat/")
async def chat(file: UploadFile = File(...)):
    start_time = time.perf_counter() #----------------デバッグ用 処理開始時刻を記録------------------#

    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    try:
        # 音声をテキストに変換する関数を呼び出す
        transcribed_text = await transcribe_audio(file)

        # LLMにテキストを送り、応答を取得する関数を非同期的に実行
        loop = asyncio.get_event_loop()
        llm_response = await loop.run_in_executor(None, get_llm_response, transcribed_text)

        end_time = time.perf_counter()  #----------------デバッグ用 処理終了時刻を記録------------------#
        processing_time = end_time - start_time #----------------デバッグ用 処理時間を計算------------------#


        # クライアントに音声認識の結果とLLMの応答を返す
        return JSONResponse(content={"text": transcribed_text, "response": llm_response, "time": processing_time})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
