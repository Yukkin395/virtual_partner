# ベースイメージの指定（Python 3.10を使用）
FROM python:3.10-slim

# 環境変数の設定
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PATH /usr/local/bin:${PATH}

# 必要なシステムパッケージのインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# pipのアップグレード（オプション）
RUN pip install --upgrade pip

# 作業ディレクトリの設定
WORKDIR /app

# 必要なPythonライブラリをインストール
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのコードをコピー
COPY . /app

# ポートを公開
EXPOSE 8000

# FastAPIサーバーを起動
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
