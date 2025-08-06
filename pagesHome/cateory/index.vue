<template>
	<view class="content">
		<button class="mt-40" @click="getUserInfoClickEvent()">数据持久化（登录参考）</button>
		<text>{{userStore.getUserInfo.name}}</text>
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
	const userStore = useUserStore()
	const customRouter = inject('customRouter')
	onLoad(async () => {
		//console.log(getUploadApplyNonce('sdff'))
	})
	// 获取存储的用户信息值
	const getUserInfoClickEvent = () => {
		console.log(userStore.getUserInfo)
	}
	
	const spliceVideoClickEvent = ()=>{
		
		
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