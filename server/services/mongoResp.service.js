export const handleMongoResp = (data, status = 200) => {
    if (data.password) {
        delete data.password
    }
    if (data.tokens) {
        delete data.tokens
    }
    return { status, data }
}
