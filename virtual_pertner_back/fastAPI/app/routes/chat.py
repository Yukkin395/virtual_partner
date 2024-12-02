# FastAPI/app/routes/chat.py

import os
import time
import asyncio
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Form
from fastapi.responses import FileResponse, JSONResponse
from app.services.transcribe import transcribe_audio
from app.services.llm import get_llm_response
from app.services.tts import text_to_speech_aivis
from app.config import SPEAKER_ID_MAPPING
import traceback

router = APIRouter()

def delete_file(path: str):
    """
    一時ファイルを削除する関数。
    """
    try:
        time.sleep(60)  # 60秒後に削除
        if os.path.exists(path):
            os.remove(path)
            print(f"Deleted temporary file: {path}")
    except Exception as e:
        print(f"Error deleting file {path}: {e}")

@router.post("/chat_with_voice/")
async def chat_with_voice(
    file: UploadFile = File(None), 
    text: str = Form(None), 
    chara_id: int = Form(..., description="Character ID (0, 1, 2)", example=0),
    background_tasks: BackgroundTasks = None
):
    """
    音声またはテキストを受け取り、LLMからの応答を音声に変換して返すエンドポイント。
    """
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
        llm_response = await asyncio.get_event_loop().run_in_executor(
            None, get_llm_response, transcribed_text, chara_id
        )

        # 音声データを生成し、ファイル名を取得
        speaker = SPEAKER_ID_MAPPING.get(chara_id, 888753760)  # デフォルトは 888753760
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
        print(f"Error occurred: {e}")  # デバッグ用
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{audio_filename}")
async def download_audio(audio_filename: str):
    """
    生成された音声ファイルをダウンロードするエンドポイント。
    """
    # ファイル名を検証してディレクトリトラバーサルを防止
    if ".." in audio_filename or "/" in audio_filename or "\\" in audio_filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    audio_path = os.path.join("/app/audio_files", audio_filename)
    if os.path.exists(audio_path):
        return FileResponse(audio_path, media_type="audio/wav")
    else:
        raise HTTPException(status_code=404, detail="File not found")
