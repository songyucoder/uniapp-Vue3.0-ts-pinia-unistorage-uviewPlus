<template>
	<view class="content">
		
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
	import crypto from 'crypto-js';
	const customRouter = inject('customRouter')
    const splice_video = ref('')
	const splice_list = ref([]) // 分割数组
	const materialId_splice = ref(0) 
	onLoad(async () => {
		//console.log(getUploadApplyNonce('sdff'))

	})
	const uploadVideoClickEvent = () => {
		
		var self = this;
		uni.chooseVideo({
			sourceType: ['camera', 'album'],
			success: function(res) {
				uploadFile(res.tempFilePath)
			}
		});
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