import { ref } from 'vue'
export function useBarHeight() {
    const CustomBar = ref('')
    const StatusBar = ref('')
    const e = uni.getSystemInfoSync()
    // #ifndef MP
    StatusBar.value = e.statusBarHeight
    if (e.platform == 'android') {
        CustomBar.value = e.statusBarHeight + 50
    } else {
        CustomBar.value = e.statusBarHeight + 45
    }
    console.log(e.platform)
    // #endif

    // #ifdef MP-WEIXIN || MP-QQ
    StatusBar.value = e.statusBarHeight
    let capsule = uni.getMenuButtonBoundingClientRect()
    if (capsule) {
        // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
        CustomBar.value = capsule.bottom + capsule.top - e.statusBarHeight
    } else {
        CustomBar.value = 70
    }

    // #endif

    // #ifdef MP-ALIPAY
    StatusBar.value = e.statusBarHeight
    CustomBar.value = e.statusBarHeight + e.titleBarHeight
    // #endif
    return {
        CustomBar,
        StatusBar
    }
}
