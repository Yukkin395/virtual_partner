# Virtual Partner Front

Live2Dモデルとインタラクティブに対話できるWebアプリケーションのフロントエンド部分

## 使用技術

### フロントエンド
- React + TypeScript + Vite
- TailwindCSS - スタイリング
- Jotai - 状態管理
- PixiJS - キャンバスレンダリング 
- pixi-live2d-display - Live2Dモデルの表示
- firebase authentication - ユーザー認証
- firestore - DB
- storybook - UI確認・検証

### 主な機能

#### 1. Live2D表示機能
- Live2Dモデルの表示・アニメーション
- リップシンク(音声に合わせた口の動き)
- モデル切り替え機能

#### 2. ポモドーロタイマー機能
- 作業時間(25分)・休憩時間(5分)の管理
- タスク管理機能
- プログレスバーによる進捗表示
- ブラウザ通知機能

#### 3. ニコニコ風コメント機能
- ランダムな位置と時間でコメント表示
- アニメーション効果

#### 4. その他
- 背景切り替え機能
- レスポンシブデザイン
- アクセシビリティ対応

## セットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build