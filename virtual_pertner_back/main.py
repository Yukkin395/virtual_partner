from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
import whisper
import asyncio
import os
import uuid
import openai
from pydantic import BaseModel
import io
from gtts import gTTS
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    # todo ここに本番環境のオリジンを入れる
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisperモデルのロード（アプリ起動時に一度だけロード、再利用できる）
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


# gptモデルとにテキスト送信 & 返信受信
async def get_llm_response(user_text: str) -> str:

    # OpenAI APIを使って応答を取得
    response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",  # または "gpt-4" を使用
        messages=[
            {"role": "system", "content": "あなたは私の可愛い彼女です"},
            {"role": "user", "content": user_text},
        ]
    )
    llm_response = response.choices[0].message['content']
    return llm_response


@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    try:
        # 音声をテキストに変換する関数を呼び出す
        transcribed_text = await transcribe_audio(file)
        return JSONResponse(content={"text": transcribed_text})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
