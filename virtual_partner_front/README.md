# Virtual Partner Front

Live2Dモデルとインタラクティブに対話できるWebアプリケーションのフロントエンド部分です。

---

## 使用技術

### フロントエンド技術

- **React + TypeScript + Vite**: フロントエンドフレームワーク
- **TailwindCSS**: スタイリング
- **MUI**: アイコン画像
- **Jotai**: グローバル状態管理
- **React Router**: ルーティング
- **PixiJS**: キャンバスレンダリング
- **pixi-live2d-display**: Live2Dモデルの表示
- **pixi-live2d-display-lipsyncpatch**: リップシンク機能（未完成）
- **Firebase Authentication**: ユーザー認証
- **Firestore**: データベース
- **Firebase Storage**: ファイルストレージ
- **Storybook**: UIコンポーネントのドキュメンテーション
- **OpenAI API**: コメント生成
- **MediaRecorder**: 音声録音

---

## 主な機能

### 1. Live2D表示機能
- **Live2Dモデルの表示とアニメーション**  
  <img src="https://github.com/user-attachments/assets/afb508fb-5c54-4886-8e90-d74e7be68ba5" style="width: 25%; height: auto;" alt="スクリーンショット 2024-12-01 6 53 36">

- **モデルの切り替え機能**  
  <img src="https://github.com/user-attachments/assets/3d7bd3d5-77cf-4eed-8c4e-1a6e676e3acc" style="width: 25%; height: auto;" alt="スクリーンショット 2024-12-01 6 55 32">  
  <img src="https://github.com/user-attachments/assets/0cfc1dcc-0ba6-4f41-89af-8cef446e4505" style="width: 25%; height: auto;" alt="スクリーンショット 2024-12-01 6 55 49">

---

### 2. ニコニコ風コメント機能
- ランダムな位置とタイミングでコメントを表示
- OpenAI APIを活用したコメントの自動生成
- コメントの重複防止や位置調整  
  <img src="https://github.com/user-attachments/assets/efcee261-72ca-4a6a-9a61-5c285530276e" style="width: 50%; height: auto;" alt="スクリーンショット 2024-12-01 6 59 17">

---

### 3. 音声入力・AI応答機能
- マイクからの音声入力に基づきバックエンドと通信
- サーバー応答をモデルに反映し、音声再生
- テキスト入力からの対話もサポート

---

### 4. 思い出機能（会話ログ）
- 過去の会話履歴をチャット形式で表示
- キャラクターごとの会話履歴管理  
  <img src="https://github.com/user-attachments/assets/dc492e3a-d9bf-41eb-a509-e2e067b76cde" style="width: 50%; height: auto;" alt="スクリーンショット 2024-12-01 6 59 50">  
  <img src="https://github.com/user-attachments/assets/212d5836-6b9a-4088-8a0c-f6014506ef97" style="width: 50%; height: auto;" alt="スクリーンショット 2024-12-01 7 01 38">

---

### 5. ユーザー管理機能
- Firebase Authenticationによる認証
- ユーザープロフィールの作成・編集
- Firestoreを利用したデータ管理
- ユーザーアイコンのアップロード

---

### 6. ポモドーロタイマー機能
- 任意の時間でポモドーロを実施可能
- 簡易的なToDoリスト機能を提供
- タスクの追加・完了状態の管理  
  <img src="https://github.com/user-attachments/assets/d3390af0-77b1-46af-8fee-9910cea04d01" style="width: 50%; height: auto;" alt="スクリーンショット 2024-12-01 7 02 03">

---

### 7. その他機能
- 背景画像の選択
- レスポンシブデザイン対応
- Storybookによるコンポーネント開発環境の整備
- アプリ全体のアニメーション効果

---

## セットアップ

### 前提条件
- Node.js（最新バージョンを推奨）
- npm または yarn

### 手順

1. **パッケージのインストール**
   ```bash
   npm install
2. **環境変数の設定**
   ```bash
    VITE_API_KEY=
    VITE_AUTH_DOMAIN=
    VITE_PROJECT_ID=
    VITE_STORAGE_BUCKET=
    VITE_MESSAGING_SENDER_ID=
    VITE_APP_ID=
    VITE_OPENAI_API_KEY=
3. **開発サーバーの起動**
   ```bash
   npm run dev

## 注意点
- サービス設定: Firebase設定やOpenAI APIキーなど、必要なサービスのアカウント作成と設定を行ってください。    
- リソース配置: ResourcesディレクトリにLive2Dモデルや背景画像などのリソースを配置してください。
