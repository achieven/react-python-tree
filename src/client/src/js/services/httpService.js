const serverAddress = 'http://localhost:5000'

export const httpService = async (url, requestOptions) => {
    requestOptions = requestOptions || {}
    try {
        const response = await fetch(`${serverAddress}/${url}`, requestOptions)
        const responseBodyAsText = await response.text()
        const bodyAsJson = JSON.parse(responseBodyAsText)
        if (bodyAsJson.error) {
            throw bodyAsJson.content
        }
        return bodyAsJson.content
    } catch(err) {
        alert(`/${url}:\n ${err}`)
        throw err
    }


}