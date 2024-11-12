/**
 * @description 权限token函数
 */
const authorizationKey = 'token'

export function getAuthorization() {
    return uni.getStorageSync(authorizationKey)
}

export function setAuthorization(authorization) {
    return uni.setStorageSync(authorizationKey, authorization)
}

export function removeAuthorization(authorization) {
    return uni.removeStorageSync(authorizationKey)
}
