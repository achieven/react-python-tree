const serverAddress = 'http://localhost:5000';

export function httpService (url, requestOptions) {
    requestOptions = requestOptions || {};
    return fetch(`${serverAddress}/${url}`, requestOptions)
        .then(response => response.text())
        .then(responseBodyAsText => {
            const bodyAsJson = JSON.parse(responseBodyAsText);
            if (bodyAsJson.error) {
                throw bodyAsJson.content
            }
            return bodyAsJson.content;
        }).catch(err => {
            alert(`/${url}:\n ${err}`)
            throw err;
        })
}