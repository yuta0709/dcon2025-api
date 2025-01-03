# DCON2025-api

## 概要

文字起こしから介護記録の情報を抽出して記録するサービスのバックエンド

## エンドポイント

Swaggerで見れるようにしたかったけど時間が足りなかったので、Notionの方をご参照ください

## セットアップ

1. 依存関係をインストール

   ```bash
   npm install
   ```

1. \.envをコピー

   ```bash
     cp db/.env.example db/.env
     cp .env.example .env
   ```

1. プロジェクトルートの.envに、OpenAIのAPIキーを設定
1. データベースを起動

   ```bash
     docker compose up -d
   ```

1. マイグレーション

   ```bash
   npx prisma migrate dev
   ```

1. シード

   ```bash
   npm run seed
   ```

1. サーバーの起動

   ```bash
   npm run start
   ```

## データベースの中身を確認したい時

```bash
npx prisma studio
```
