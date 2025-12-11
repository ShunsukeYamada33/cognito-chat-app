/*************************************************
 * ① idToken を Cookie または localStorage から取得
 *************************************************/
function getIdToken() {
    // 1) Cookie にあるか？
    const cookieMatch = document.cookie.match(/(?:^|;\s*)idToken=([^;]+)/);
    if (cookieMatch) {
        return cookieMatch[1];
    }

    // 2) localStorage にあるか？
    const ls = localStorage.getItem("id_token");
    if (ls) return ls;

    return null;
}

const ID_TOKEN = getIdToken();


/*************************************************
 * ② チャット UI
 *************************************************/
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);

    const msgText = document.createElement("div");
    msgText.classList.add("message-text");
    msgText.innerText = text;

    msgDiv.appendChild(msgText);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/*************************************************
 * ③ API 呼び出し
 *************************************************/
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // ユーザーのメッセージを表示
    addMessage(text, "user");
    userInput.value = "";

    // 未ログイン
    if (!ID_TOKEN) {
        addMessage("エラー：ログインしていません。", "bot");
        return;
    }

    try {
        console.log(JSON.stringify({message: text}));
        const response = await fetch("https://bblfrud3i7.execute-api.ap-northeast-1.amazonaws.com/prod/chat", {
            method: "POST", headers: {
                "Content-Type": "application/json", "Authorization": ID_TOKEN
            }, body: JSON.stringify({message: text})
        });

        if (response.status === 401) {
            window.location.href = "/login.html";
        }

        const raw = await response.text();

        const outer = JSON.parse(raw);   // statusCode, headers, body を持つ
        const inner = JSON.parse(outer.body); // body の中の JSON をパース

        if (inner.reply) {
            addMessage(inner.reply, "bot");
        } else {
            addMessage("AI 応答が取得できませんでした。", "bot");
        }

    } catch (err) {
        console.error(err);
        addMessage("ネットワークエラーが発生しました。", "bot");
    }
}


/*************************************************
 * ④ イベント登録
 *************************************************/
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});