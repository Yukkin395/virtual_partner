# FastAPI/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat_router
from app.config import origins

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # 許可するオリジンのリスト
    allow_credentials=True,           # クレデンシャル（クッキーなど）の許可
    allow_methods=["*"],              # 許可するHTTPメソッド
    allow_headers=["*"],              # 許可するHTTPヘッダー
)

app.include_router(chat_router)
