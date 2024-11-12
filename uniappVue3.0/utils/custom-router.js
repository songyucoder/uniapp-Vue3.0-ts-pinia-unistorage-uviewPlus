export default {
    navigateTo({ url, query = {} }) {
        const queryStr = Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join('&')
        queryStr && queryStr && (url += '?' + queryStr)
        uni.navigateTo({ url })
    },
    redirectTo({ url, query = {} }) {
        const queryStr = Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join('&')
        queryStr && queryStr && (url += '?' + queryStr)
        uni.redirectTo({ url })
    }
}
