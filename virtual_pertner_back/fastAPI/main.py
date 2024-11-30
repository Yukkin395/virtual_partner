import time
from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, Form
from fastapi.responses import FileResponse, JSONResponse
import whisper
import asyncio
import os
import uuid
import openai
from fastapi.middleware.cors import CORSMiddleware
import httpx
import traceback

app = FastAPI()

origins = [
    "http://localhost:5173",
    # TODO: 本番環境のオリジンをここに追加
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 本番環境では特定のオリジンを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisperモデルのロード（アプリ起動時に一度だけロード）
model = whisper.load_model("tiny")  # "tiny", "base", "small", "medium", "large" から選択

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

initial_prompt={
    0:"あなたは、14歳の癒し系妹「桃瀬ひより」です。ひよりは園芸部に所属していて、趣味の家庭菜園で育てたお野菜やお花をお兄ちゃん（ユーザー）に見せるのが大好きです。あなたはいつも明るくて優しく、ほんわかした癒し系の性格をしています。一人称は「ひより」で、お兄ちゃんと話すときは、柔らかく親しみやすい言葉遣いを使います。特に、「お兄ちゃん」と呼ぶことで、親しみと信頼を込めて接しています。話し方はのんびりしていて穏やかですが、植物の話になるとちょっぴり熱が入ります。お兄ちゃんを喜ばせるために、今日の家庭菜園の成果や、学校での出来事を元気いっぱいに話してください。日常の小さな幸せを分かち合い、お兄ちゃんを癒してあげることを心がけてください。返信に絵文字は含めないでください。あまり長い返答をしないでください",
    1:"あなたは、魔法のある現代の世界に住む18歳の魔法使い「虹色まお」です。あなたは負けず嫌いで天然、お調子者で落ち着きがない性格をしています。うさぎや楽しいこと、魔法を試すことが好きで、怖いものや説明書を読むのが嫌いです。あなたの世界では、魔法で生活を豊かにすることが日常的で、あなた自身も絵を描く魔法を使いこなすために練習中です。ペン型の杖とインクを使って、空中に絵を描いて魔法を発動しますが、失敗してインクが飛び散ってしまうこともしばしば。話し方は明るく、親しみやすく、少しおっちょこちょいな一面を見せます。自分の将来の目標は、いつか大物になりたいという夢を叶えることです。ユーザーに対してもフレンドリーに接し、あなたらしい元気な性格で会話を楽しんでください。返信に絵文字は含めないでください。あまり長い返答をしないでください。",
    2:"あなたは、礼儀正しく知的な執事「名執 尽（なとり じん）」です。紺色の整えられたショートヘアにメガネをかけ、ダークパープルの燕尾服風スーツを纏った、優雅で洗練された姿をしています。白い手袋を常に身につけ、背筋を伸ばした堂々とした姿勢が特徴です。あなたは、どんな状況でも冷静で穏やかな態度を保ち、常に紳士的に振る舞います。話し方は落ち着いていて丁寧ですが、時折ユーモアを交え、相手を和ませることも得意です。また、あなたの優雅さと高い知性を反映させるために、選ぶ言葉は洗練されています。会話では、あなたの紳士的な魅力と知的さを十分に発揮しながら、優しく誠実な対応を心がけてください。返信に絵文字は含めないでください。あまり長い返答をしないでください。"
    }

# GPTモデルにテキスト送信 & 返信受信
def get_llm_response(user_text: str, chara_id: int) -> str:
    # OpenAIのAPIキーを設定（環境変数から取得）
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    # OpenAI APIを使って応答を取得
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": initial_prompt[chara_id]},
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
    synthesis_response = None
    try:
        # Step 1: Audio Queryの取得
        async with httpx.AsyncClient() as client:
            query_response = await client.post(
                f"{AIVIS_API_URL}?text={text}&speaker={speaker_id}"
            )
            query_response.raise_for_status()
            query_data = query_response.json()

            # Audio Queryのデバッグ用ログ
            print(f"Audio Query Response: {query_data}")

            # Noneの値をデフォルト値に置き換える
            replace_none_in_lengths(query_data)

            # Step 2: 音声合成 (Synthesis)
            synthesis_response = await client.post(
                f"{AIVIS_SYNTH_URL}?speaker={speaker_id}",
                json=query_data,
                headers={"Content-Type": "application/json"},
                timeout=60.0  # タイムアウトを必要に応じて調整
            )
            synthesis_response.raise_for_status()

            # 音声データを一時ファイルとして保存
            audio_filename = f"output_{uuid.uuid4().hex}.wav"
            audio_path = os.path.join("/app/audio_files", audio_filename)  # サブディレクトリに保存
            os.makedirs(os.path.dirname(audio_path), exist_ok=True)  # ディレクトリがなければ作成

            with open(audio_path, "wb") as audio_file:
                audio_file.write(synthesis_response.content)

        print(f"Audio Path: {audio_path}")  # デバッグ用
        return audio_filename  # パスではなくファイル名を返す

    except httpx.HTTPStatusError as e:
        error_message = f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
        print(error_message)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=error_message)

    except Exception as e:
        error_message = f"Error during text-to-speech synthesis: {e}"
        print(error_message)
        traceback.print_exc()
        if synthesis_response:
            print(f"Synthesis Response Content: {synthesis_response.text}")
        raise HTTPException(status_code=500, detail=error_message)

# 一時ファイルを一定時間後に削除する関数
def delete_file(path: str):
    try:
        time.sleep(60)  # 60秒後に削除
        if os.path.exists(path):
            os.remove(path)
            print(f"Deleted temporary file: {path}")
    except Exception as e:
        print(f"Error deleting file {path}: {e}")

@app.post("/chat_with_voice/")
async def chat_with_voice(
    file: UploadFile = File(None), 
    text: str = Form(None), 
    chara_id: int = Form(..., description="Character ID (0, 1, 2)", example=0),
    background_tasks: BackgroundTasks = None
):
    if not file and not text:
        raise HTTPException(status_code=400, detail="Either 'file' or 'text' must be provided.")
    if file and text:
        raise HTTPException(status_code=400, detail="Provide either 'file' or 'text', not both.")

    try:
        if file:
            if not file.content_type.startswith("audio/"):
                raise HTTPException(status_code=400, detail="Invalid file type")
            # 音声をテキストに変換
            transcribed_text = await transcribe_audio(file)
        else:
            transcribed_text = text

        # LLMにテキストを送り応答を取得（非同期実行）
        loop = asyncio.get_event_loop()
        llm_response = await loop.run_in_executor(None, get_llm_response, transcribed_text, chara_id)

        # 音声データを生成し、ファイル名を取得
        speaker_id_mapping = {0: 888753763, 1: 888753762, 2: 888753765}  # スピーカーIDを設定
        speaker = speaker_id_mapping.get(chara_id, 888753760) # デフォルトは 888753760
        audio_filename = await text_to_speech_aivis(llm_response, speaker)
        audio_url = f"/download/{audio_filename}"

        # 一時ファイルの削除をスケジュール
        audio_path = os.path.join("/app/audio_files", audio_filename)
        if background_tasks is not None:
            background_tasks.add_task(delete_file, audio_path)

        # レスポンスを作成
        response_data = {
            "input_text": transcribed_text,
            "llm_response": llm_response,
            "audio_url": audio_url
        }

        print(f"Returning JSON response with audio URL and text.")  # デバッグ用
        return JSONResponse(content=response_data)

    except Exception as e:
        print(f"Error occurred: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{audio_filename}")
async def download_audio(audio_filename: str):
    # ファイル名を検証してディレクトリトラバーサルを防止
    if ".." in audio_filename or "/" in audio_filename or "\\" in audio_filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    audio_path = os.path.join("/app/audio_files", audio_filename)
    if os.path.exists(audio_path):
        return FileResponse(audio_path, media_type="audio/wav")
    else:
        raise HTTPException(status_code=404, detail="File not found")
