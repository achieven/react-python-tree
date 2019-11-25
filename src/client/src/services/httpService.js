export function httpService (url, requestOptions) {
    requestOptions = requestOptions || {};
    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(responseBodyAsText => {
            const bodyAsJson = JSON.parse(responseBodyAsText);
            if (bodyAsJson.error) {
                throw bodyAsJson.content
            }
            return bodyAsJson.content;
        }).catch(err => {
            alert(`${url}:, ${err}`)
            throw err;
        })
}