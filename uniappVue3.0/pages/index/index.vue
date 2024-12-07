<template>
	<view class="content">
	
		<view class="flex mt-40 bg-gray-200">
			<button @click="clickNetWorkEvent()">接口模拟</button>
			<button class="mt-40" @click="uploadVideoClickEvent()">数据持久化（登录参考）</button>
			<button class="mt-40" @click="clickNavToEvent()">模拟跳转</button>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		unref,
		inject
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getUploadApplyNonce
	} from '@/api/index'
	import {
			useUserStore
		} from '@/stores/modules/user'
	import { HEADER } from '@/config/config.js' // 请求数据header 配置项
	const userStore = useUserStore()
	const customRouter = inject('customRouter')
    const splice_video = ref('')
	const splice_list = ref([]) // 分割数组
	const materialId_splice = ref(0) 
	onLoad(async () => {
		//console.log(getUploadApplyNonce('sdff'))

	})
	// 模拟网路请求数据
	const clickNetWorkEvent = async()=>{
		const res = await getUploadApplyNonce({})
		if(res.code == 0){
			 console.log(res.data)
		}
	}
	const clickNavToEvent = (url)=>{
		customRouter.navigateTo({
			url: '/pagesHome/cateory/index',
			query: {
				'id': 0
			}
		})
	}
	// 数据持久化使用
	const uploadVideoClickEvent = () => {
		
		userStore.setUserInfo({
			name:'eee',
			phone:'10086'
		})
		userStore.setToken('258825811')
	    userStore.setisLogin(true)
		// 登录之后 必须要进行这个conf 文件的配置，注意这这个地方
		HEADER['Authorization'] = userStore.getToken
	
	}
	
	

</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>