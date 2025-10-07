let apiKey = checkCookies()

/**
 * Return the api key, if not set, prompt the user
 * @returns api key string
 */
function getAPIKey() {
    if (!apiKey) {
        showKeyPopup()
    }
    return apiKey;
}

/**
 * Show the passwork popup
 */
function showKeyPopup() {
    const inp = window.prompt("API wachtwoord")
    if (inp && inp != "") {
        apiKey = inp
        const tmrw = new Date()
        tmrw.setTime(tmrw.getTime() + 86400000)
        document.cookie = `api-key=${apiKey}; expires=${tmrw.toUTCString()}; path=/`;
    }
}

/**
 * Try to extract key from cookies
 */
function checkCookies() {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=")
        if (cookie.length == 2) {
            if (cookie[0] == "api-key") {
                return cookie[1];
            }
        }
    }
    return null;
}