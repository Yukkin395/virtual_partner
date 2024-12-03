#FastAPI/app/services/tts.py

import os
import uuid
import httpx
from fastapi import HTTPException
import traceback
from app.config import AIVIS_API_URL, AIVIS_SYNTH_URL
from app.utils.helpers import replace_none_in_lengths,timeit

@timeit
async def text_to_speech_aivis(text: str, speaker_id: int = 1) -> str:
    """
    テキストを音声に変換し、生成された音声ファイル名を返す関数。
    """
    synthesis_response = None
    try:
        print(f"Starting text-to-speech for text: {text}")  # デバッグ用

        async with httpx.AsyncClient() as client:
            # Step 1: Audio Queryの取得
            query_response = await client.post(
                f"{AIVIS_API_URL}?text={text}&speaker={speaker_id}"
            )
            query_response.raise_for_status()
            query_data = query_response.json()
            print(f"Audio Query Response: {query_data}")  # デバッグ用

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
        return audio_filename  # ファイル名を返す

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
            try:
                print(f"Synthesis Response Content: {synthesis_response.text}")
            except Exception as inner_e:
                print(f"Error reading synthesis response content: {inner_e}")
        raise HTTPException(status_code=500, detail=error_message)
