# FastAPI/app/services/transcribe.py

from app.utils.helpers import timeit
import os
import uuid
import whisper
import asyncio
from fastapi import UploadFile
import traceback

# Whisperモデルのロード（"tiny", "base", "small", "medium", "large" から選択）
model = whisper.load_model("tiny")

@timeit
async def transcribe_audio(file: UploadFile) -> str:
    """
    アップロードされた音声ファイルをテキストに変換する関数。
    """
    # ユニークなファイル名を生成
    filename = f"temp_audio_{uuid.uuid4().hex}"
    file_path = os.path.join("/app", filename)

    # ファイルを保存
    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)

    try:
        # Whisperを使って音声をテキストに変換
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, model.transcribe, file_path)
        transcribed_text = result["text"]
        print(f"Transcribed text: {transcribed_text}")  # デバッグ用
    except Exception as e:
        print(f"Error during transcription: {e}")  # デバッグ用
        traceback.print_exc()
        raise e
    finally:
        # 一時ファイルを削除
        os.remove(file_path)

    return transcribed_text
