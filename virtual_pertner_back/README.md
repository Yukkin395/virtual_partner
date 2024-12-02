
# Vertual_Partner バックエンド


## 使用技術

- **プログラミング言語**: Python 3.10
- **フレームワーク**: FastAPI
- **ライブラリ**:
  - `whisper`: 音声認識
  - `openai`: GPT-4 API連携
  - `httpx`: 非同期HTTPリクエスト
  - `python-dotenv`: 環境変数管理
- **コンテナ化**:
  - Docker
  - Docker Compose
- **サーバー**: Uvicorn（ASGIサーバー）
- **CORSミドルウェア**: FastAPIのCORS設定
- **音声合成**: AivisSpeech API


## APIエンドポイント

### 1. チャットと音声生成エンドポイント

- **URL**: `/chat_with_voice/`
- **メソッド**: `POST`
- **パラメータ**:
  - `file` (オプション): 音声ファイル（`audio/*` タイプ）
  - `text` (オプション): テキスト入力
  - `chara_id` (必須): キャラクターID（`0`, `1`, `2` のいずれか）
- **レスポンス**:
  - `input_text`: 入力されたテキスト
  - `llm_response`: GPT-4からの応答テキスト
  - `audio_url`: 生成された音声ファイルのダウンロードURL

### 2. 音声ファイルダウンロードエンドポイント

- **URL**: `/download/{audio_filename}`
- **メソッド**: `GET`
- **パラメータ**:
  - `audio_filename`: ダウンロードする音声ファイルの名前
- **レスポンス**:
  - 音声ファイル (`audio/wav` タイプ)

## セットアップ

### 1. 必要条件

- **Docker**: インストール済みであること
- **Docker Compose**: インストール済みであること

### 2. 環境変数の設定

プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の環境変数を設定します。

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Dockerコンテナのビルドと起動

プロジェクトのルートディレクトリで以下のコマンドを実行します。

```bash
docker-compose up --build
```


### 4. コンテナの確認

コンテナが正常に起動しているか確認します。

```bash
docker-compose ps
```

## 使用方法

### 1. FastAPIのドキュメントにアクセス

ブラウザで以下のURLにアクセスして、Swagger UIを利用してAPIをテストできます。

```
http://localhost:8000/docs
```

### 2. エンドポイントの利用

#### チャットと音声生成

1. **`/chat_with_voice/` エンドポイントを選択**
2. **必要なパラメータを入力**
   - `file` または `text` のいずれかを提供（両方は不可）
   - `chara_id` を選択（`0`, `1`, `2`）
3. **リクエストを送信**
4. **レスポンスとして返される `audio_url` を使用して音声を再生またはダウンロード**

#### 音声ファイルのダウンロード

1. **レスポンスで得られた `audio_url` にアクセス**
   - 例: `http://localhost:8000/download/output_abcdef123456.wav`
2. **ブラウザで直接アクセスして音声ファイルをダウンロード**

#



