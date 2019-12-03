const serverAddress = 'http://localhost:5000'

export const httpService = async (url, requestOptions) => {
    requestOptions = requestOptions || {}
    try {
        const response = await fetch(`${serverAddress}/${url}`, requestOptions)
        const body = await response.json()
        if (!body.content) {
            throw body.message
        }
        return body.content
    } catch(err) {
        alert(`/${url}:\n ${err}`)
        throw err
    }
}