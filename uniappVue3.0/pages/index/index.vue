<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" @click="onclickBtnEvent">点击跳转</text>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, inject } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getUploadApplyNonce } from '@/api/index'
    const customRouter = inject('customRouter')
	
	onLoad(()=>{
		console.log(getUploadApplyNonce('sdff'))
		
	})
	
	
    const  onclickBtnEvent=()=>{
	customRouter.navigateTo({
	    url: '/pagesHome/cateory/index',
	    query: {
	        'id':0
	    }
	})
	
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
