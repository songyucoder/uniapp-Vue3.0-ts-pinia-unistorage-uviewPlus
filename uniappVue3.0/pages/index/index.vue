<template>
	<view class="content">
	
		<view class="flex mt-40 bg-gray-200">
			<button @click="clickNavToEvent('/pagesHome/cateory/index')">数据持久化</button>
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
	import crypto from 'crypto-js';
	const customRouter = inject('customRouter')
    const splice_video = ref('')
	const splice_list = ref([]) // 分割数组
	const materialId_splice = ref(0) 
	onLoad(async () => {
		//console.log(getUploadApplyNonce('sdff'))

	})
	const clickNavToEvent = (url)=>{
		customRouter.navigateTo({
			url: url,
			query: {
				'id': 0
			}
		})
	}
	const uploadVideoClickEvent = () => {
		var self = this;
		uni.chooseVideo({
			sourceType: ['camera', 'album'],
			success: function(res) {
				uploadFile(res.tempFilePath)
			}
		});
	}
	
	
   
	

	const uploadFile = async (tempFilePath) => {
		const res = await getTokenEvent()
		console.log(res)
		if (!res) {
			uni.showToast({
				icon: 'none',
				title: '获取失败，请重新获取'
			})
		}
		uni.uploadFile({
			url: res.host, //仅为示例，非真实的接口地址
			filePath: tempFilePath,
			name: 'file',
			formData: {
				'key':res.dir + 'video' + '.mp4',
				'OSSAccessKeyId': res.accessid,
				'policy': res.policy,
				'signature': res.signature,
				'success_action_status': 200,
				'callback': res.base64CallbackBody
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				splice_video.value =  res.urlPrefix  + 'video' + '.mp4'
				
			}
		});


	}

	const my_md5 = (str) => {
		return crypto.MD5(str).toString()
	}
	const onclickBtnEvent = () => {
		customRouter.navigateTo({
			url: '/pagesHome/cateory/index',
			query: {
				'id': 0
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