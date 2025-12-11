# cognito-chat-app

## プロジェクト概要

Cognito 認証つきチャットアプリ

CloudFront + S3

API Gateway + Lambda + Bedrock

## 機能

ユーザーが Cognito Hosted UI でログイン

CloudFront Functions が未認証ユーザーをリダイレクト

認証済みユーザーのみ index.html へアクセス可能

チャットメッセージを API Gateway 経由で Lambda へ送信

Lambda が Bedrock の Nova micro に問い合わせて返答する

## 全体アーキテクチャ図

architecture/architecture-diagram.png を掲載

## デプロイ方法（簡易）

S3 に /frontend の内容をアップロード

CloudFront Function を紐づけ

Lambda をデプロイ

API Gateway の統合

Cognito ユーザープール作成

Hosted UI の Redirect URI 設定

## セキュリティポイント

Cognito ID Token を Authorization に付与

CloudFront Functions によるセキュアルート保護

クライアント側 ID Token の安全な取り扱い

## 更新履歴
* 2025/12/11: [README.md を更新]