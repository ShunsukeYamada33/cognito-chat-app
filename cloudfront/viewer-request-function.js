function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var uri = request.uri;

    function getCookie(request, name) {
        if (!request.cookies || !request.cookies[name]) return null;
        return request.cookies[name].value;
    }

    // ---- 認証不要パス ----
    if (
        uri.endsWith("/login.html") ||
        uri.endsWith("/callback.html") ||
        uri.endsWith("/styles.css") ||
        uri.endsWith("/script.js") ||
        uri.startsWith("/assets/") ||
        uri.startsWith("/static/")
    ) {
        return request;
    }

    // 認証チェック
    var idToken = getCookie(request, "idToken");

    if (uri === "/" || uri.endsWith("index.html")) {

        // ★ クッキーがあればログイン済み
        if (idToken) {
            return request;
        }

        // Cognito の code は callback.html で処理する
        if (request.querystring.code) {
            return request;
        }

        // 未認証 → Cognito へ
        var login_url =
            'https://ap-northeast-1fpwxyhi1o.auth.ap-northeast-1.amazoncognito.com/login' +
            '?client_id=1vltl309a8prhlk9drhc0ofnff' +
            '&redirect_uri=https://d3hhstjr0rx2o4.cloudfront.net/login.html' +
            '&response_type=code&scope=openid+email+phone';

        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { location: { value: login_url } }
        };
    }

    return request;
}
