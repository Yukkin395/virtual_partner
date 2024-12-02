# FastAPI/app/services/llm.py

import openai
import os
from fastapi import HTTPException
import traceback
from app.config import OPENAI_API_KEY, INITIAL_PROMPTS

def get_llm_response(user_text: str, chara_id: int) -> str:
    """
    ユーザーのテキストに基づいてLLM（GPTモデル）からの応答を取得する関数。
    """
    try:
        # OpenAIのAPIキーを設定
        openai.api_key = OPENAI_API_KEY
        if not openai.api_key:
            raise ValueError("OPENAI_API_KEY is not set")

        # OpenAI APIを使って応答を取得
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": INITIAL_PROMPTS[chara_id]},
                {"role": "user", "content": user_text},
            ]
        )
        llm_response = response.choices[0].message['content']
        print(f"LLM Response: {llm_response}")  # デバッグ用
        return llm_response

    except Exception as e:
        error_message = f"Error getting LLM response: {e}"
        print(error_message)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=error_message)
