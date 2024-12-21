import { HEADER, baseUrl } from '@/config/config.js'
import { useUserStore } from '@/stores/modules/user'

const request = (config) => {
    config.url = baseUrl.base_http + config.url
    HEADER.Authorization =  useUserStore().getisLogin == true ? useUserStore().getToken : 'visitor'
    config.header = HEADER
    let promise = new Promise(function (resolve, reject) {
        if (!Reflect.has(config, 'loading') || config.loading) {
            uni.showLoading()
        }
        uni.request(config)
            .then((responses) => {
                if (!Reflect.has(config, 'loading') || config.loading) {
                    uni.hideLoading()
                }
                uni.stopPullDownRefresh()
                // const userStore = useUserStore() 
                // const isLogin = userStore.isLogin
                let errorMessage = '网络请求出错'
                // 异常
                if (responses.statusCode == 200) {
                    // 当http目前数据异常返回的格式，暂定
                    let response = responses.data
                    if (response.code == 0) {
                        // 数据请求成功
                        resolve(response)
                    } else if (response.code == -1) {
                        // 自定义数据请求成功
                        resolve(response)
                    } else if (response.code == 401) {
                        if (isLogin) {
                            errorMessage = '您的登陆已过期'
                        } else {
                            errorMessage = '请先登录'
                        }
                        uni.showToast({
                            title: errorMessage,
                            icon: 'none',
                            duration: 2000
                        })
                        reject()
                    } else {
                        console.log('Unexpected response code: ' + response.message)
                        uni.showToast({
                            title: response.message,
                            duration: 2000,
                            icon: 'error'
                        })
                    }
                    reject()
                } else if (responses.code == 1) {
                    uni.showToast({
                        title: responses.message,
                        icon: 'error',
                        duration: 1000
                    })

                    reject()
                } else if (responses.statusCode == 401) {
                    uni.showToast({
                        title: '请重新登录',
                        icon: 'none'
                    })

                    reject()
                } else if (responses.statusCode == 422) {
                    uni.showToast({
                        title: responses.data.status_code + responses.data.message,
                        icon: 'none'
                    })

                    reject()
                } else if (responses.statusCode == 500) {
                    if (isLogin) {
                        errorMessage = '您的登陆已过期'
                    } else {
                        console.log('error ==>', responses)
                        errorMessage = '请先登录!'
                    }
                    uni.showToast({
                        title: errorMessage,
                        duration: 2000,
                        icon: 'none'
                    })
                  //  userStore.logout(true)
                    reject()
                } else {
                    console.log('error ==>', responses.data)
                    uni.showToast({
                        title: responses.data.message,
                        duration: 2000,
                        icon: 'none'
                    })
                    reject()
                }
            })
            .catch((error) => {
                uni.hideLoading()
                uni.stopPullDownRefresh()
                uni.showToast({
                    title: '请求接口失败',
                    icon: 'error'
                })
                console.log(error)
                reject(error)
            })
    })
    return promise
}
export default request
