const baseUrl = {
    //
    base_http: import.meta.env.VITE_BASE_API,
    image_url: import.meta.env.VITE_BASE_IMG_URL
}
const HEADER = {
    'content-type': 'application/json',
    //#ifdef H5
    'Form-type':
        navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ? 'wechat' : 'h5',
    //#endif
    //#ifdef MP
    'Form-type': 'routine',
    //#endif
    //#ifdef APP-PLUS
    'Form-type': 'app',
    //#endif
    Authorization: ''
}
export { baseUrl, HEADER }
