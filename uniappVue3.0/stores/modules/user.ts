import { defineStore } from 'pinia'
import { store } from '../index'
import { loginOutApi } from '@/api/mine/index'

interface UserState {
	userInfo : {}
	tokenKey : string
	token : string
	isLogin: boolean
}

export const useUserStore = defineStore('user', {
	state: () : UserState => {
		return {
			userInfo: undefined,
			tokenKey: 'Authorization',
			token: '',
			isLogin: false
		}
	},
	getters: {
		getTokenKey() : string {
			return this.tokenKey
		},
		getToken() : string {
			return this.token
		},
		getisLogin() : boolean {
			return  this.isLogin
		},
		getUserInfo() : any | undefined {
			return this.userInfo
		}
	},
	actions: {
		setTokenKey(tokenKey : string) {
			this.tokenKey = tokenKey
		},
		setToken(token : string) {
			this.token = token
		},
		setisLogin(isLogin : boolean) {
			this.isLogin = isLogin
		},
		setUserInfo(userInfo : any) {
			this.userInfo = userInfo
		},
		logoutConfirm() {
			uni.showModal({
				title: '温馨提示',
				content: '你确定进行推出登录',
				success: async function (res) {
					if (res.confirm) {
					const res = await loginOutApi({})	
					if(res.code == 0){
						 this.reset()
				      	}	
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		},
		reset() {
			this.setToken('')
			this.setUserInfo(undefined)
			this.setisLogin(false)

		},
		logout() {
			this.reset()
		},
		setLoginInfo(loginInfo : any | undefined) {
			this.loginInfo = loginInfo
		}
	},
	persist: true
})

export const useUserStoreWithOut = () => {
	return useUserStore(store)
}