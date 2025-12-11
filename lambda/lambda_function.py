import json
import boto3

# モデル 最安値のやつ
model_id = "amazon.nova-micro-v1:0"

def lambda_handler(event, context):
    # フロントからのメッセージを取得
    raw_body = event.get("body", {})

    # dict ならそのまま、文字列なら loads
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        body = json.loads(raw_body)

    user_message = body.get("message", "")
    conversation = [
        {
            "role": "user",
            "content": [{"text": user_message + "\n短く1文で答えてください。"}],
        }
    ]

    # Bedrock Runtime クライアント
    client = boto3.client("bedrock-runtime", region_name="us-east-1")

    response = client.converse(
        modelId=model_id,
        messages=conversation,
        inferenceConfig={"maxTokens": 64, "temperature": 0.5, "topP": 0.9},
    )

    # 結果を取得
    result = response["output"]["message"]["content"][0]["text"]

    # API Gateway に返す形式
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"reply": result})
    }
