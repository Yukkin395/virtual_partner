# Virtual Partner

## API エンドポイント

### `POST /chat/`
音声ファイルを送信し、以下を取得するAPIです:
- 音声をテキストに変換した結果
- LLM（大規模言語モデル）からの応答
- 処理にかかった時間

---

### **エンドポイント概要**

- **URL**: `/chat/`
- **メソッド**: `POST`
- **リクエストヘッダー**:
  - `Content-Type`: `multipart/form-data`
  - `Accept`: `application/json`
- **リクエストボディ**:
  - `file`: 音声ファイル（形式例: `audio/m4a`）
