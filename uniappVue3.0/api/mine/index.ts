import request from '@/utils/request'


// 微信登录
export const postLoginWXApi = (data:any)=>{
	return request({
	    url: `/api/login/wx`,
	    method: 'POST',
	    data,
	    loading: true
	})
}

// 退出登录 loginOutApi
export const loginOutApi = (data:any)=>{
	return request({
	    url: `/api/logout`,
	    method: 'POST',
	    data,
	    loading: true
	})
}

// 完善信息 -
export const postUserInfoUpdateApi=(data:any)=>{
    return request({
        url: `/api/user/update`,
        method: 'PUT',
        data
    })
}

// 获取个人信息---
export const postUserInfoApi=(data:any)=>{
    return request({
        url: `/api/login/me`,
        method: 'POST',
        data
    })
}
