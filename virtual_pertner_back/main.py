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

app = FastAPI()

# Whisperモデルのロード（アプリ起動時に一度だけロード）
model = whisper.load_model("base")  # "tiny", "base", "small", "medium", "large" の中から選択

@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    try:
        # ユニークなファイル名を生成
        filename = f"temp_audio_{uuid.uuid4().hex}"
        file_path = os.path.join("/app", filename)
        
        # アップロードされたファイルを一時ファイルとして保存
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)
        
        # Whisperを使って音声をテキストに変換
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, model.transcribe, file_path)
        
        # 一時ファイルを削除
        os.remove(file_path)
        
        return JSONResponse(content={"text": result["text"]})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
