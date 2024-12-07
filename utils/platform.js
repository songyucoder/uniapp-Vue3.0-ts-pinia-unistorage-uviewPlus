const device = uni.getSystemInfoSync()

const os = device.platform

let name = ''
let platform = ''

const isWxBrowser = () => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

// #ifdef H5
if (isWxBrowser()) {
    name = 'WechatOfficialAccount'
    platform = 'mp'
} else {
    name = 'H5'
    platform = 'wap'
}
// #endif

// #ifdef APP-PLUS
name = 'App'
platform = 'app'
// #endif

// #ifdef MP-WEIXIN
name = 'WechatMiniProgram'
platform = 'mini'
// #endif

const uPlatform = {
    name,
    device,
    os,
    platform
}
export default uPlatform
