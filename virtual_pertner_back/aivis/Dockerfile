# aivis/Dockerfile

# ベースイメージとしてUbuntuを使用
FROM ubuntu:22.04

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    wget \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /app

# AivisSpeech Engineをダウンロードして展開
RUN wget https://github.com/VOICEVOX/aivis_project/releases/download/v1.0/aivis-engine.tar.gz -O aivis-engine.tar.gz && \
    tar -xvf aivis-engine.tar.gz && \
    rm aivis-engine.tar.gz

# 音声モデルをコピー
COPY Models /app/Models

# ポートを公開
EXPOSE 10101

# AivisSpeech Engineを起動するコマンド
CMD ["./aivis-engine", "--host", "0.0.0.0", "--port", "10101"]
