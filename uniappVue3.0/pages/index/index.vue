<template>
	<view class="content">
		<view class="text-area">
			<text class="title" @click="onclickBtnEvent">点击跳转</text>
		</view>

		<view class="flex mt-40 bg-gray-200">
			<button @click="clickNavToEvent('/pagesHome/cateory/index')">视频分割</button>
			<button @click="clickNavToEvent('/pagesHome/videoEidt/index')">视频编辑</button>
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
	
	const spliceVideoClickEvent = ()=>{
		if(unref(splice_video).length == 0){
			uni.showToast({
				icon:'none',
				title:'视频解析到'
			})
			return
		}
		const parms = {
				urls:[splice_video.value]
			}
		uni.request({
			url:'https://api.zhaoli.com/v-w-c/gateway/ve/video/parse',
			method:'POST',
			header: {
				'Content-type': 'application/json',
				'AppKey': "0862fdf760964e34a27ab9855eae7c72",
				'AppSign': my_md5(my_md5(JSON.stringify(parms)) +
					"92ab5a6ea72d49518ae625cf0c758817"),
			},
			data: parms,
			success: (res) => {
				uni.hideLoading()
				console.log(res.data)
				materialId_splice.value = res.data.body.dataList[0].materialId
				console.log(materialId_splice.value )
			}
		})
		
	}
   const spliceVideoResCallEvent = ()=>{
	   uni.showLoading({
	   	title:'正在查询中。。。。',
	   })
	   const parms = {
	   		id:unref(materialId_splice)
	   	}
	   uni.request({
	   	url:'https://api.zhaoli.com/v-w-c/gateway/ve/video/parse/query',
	   	method:'POST',
	   	header: {
	   		'Content-type': 'application/json',
	   		'AppKey': "0862fdf760964e34a27ab9855eae7c72",
	   		'AppSign': my_md5(my_md5(JSON.stringify(parms)) +
	   			"92ab5a6ea72d49518ae625cf0c758817"),
	   	},
	   	data: parms,
	   	success: (res) => {
	   		uni.hideLoading()
			if(res.data.code == 1000){
				splice_list.value = []
				splice_list.value = res.data.body
			}else{
				uni.showToast({
					icon:'none',
					title:res.data.msg
				})
			}
	   		
	   		
	   	}
	   })
	   
	   
   }
	const getTokenEvent = () => {
		const parms = {
			nonce: new Date().getTime(),
			materialFileType: 'video'
		}
		return new Promise(function(resolve, reject) {
			uni.request({
				url: 'https://api.zhaoli.com/v-w-c/gateway/ve/file/upload/policy/apply',
				header: {
					'Content-type': 'application/json',
					'AppKey': "0862fdf760964e34a27ab9855eae7c72",
					'AppSign': my_md5(my_md5(JSON.stringify(parms)) +
						"92ab5a6ea72d49518ae625cf0c758817"),
				},
				method: 'POST',
				data: parms,
				success: (res) => {
					if (res.data.code == 1000) {
						resolve(res.data.body)
					} else {
						reject()
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				},
				fail: (error) => {
					reject()
					uni.showToast({
						icon: 'none',
						title: JSON.toString(error)
					})
				}
			})
		})
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