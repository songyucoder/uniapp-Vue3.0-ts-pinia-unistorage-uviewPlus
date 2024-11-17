<template>
	<view class="flex">
		<view class="flex mt-40 bg-gray-200 content">
			<video v-if="splice_video.length > 0" :src="splice_video" controls></video>
			<button @click="uploadVideoClickEvent">选择视频</button>
		</view>
		 <view class="flex">
		 	<uni-section class="mt-20" title="参数配置" sub-title="短剧二创"></uni-section>
		 	<view class="u-flex ml-20 u-flex-items-center">
		 		<text class="mr-30">视频去文字:</text>
				<u-switch v-model="edit_parms.needChineseOcclude"></u-switch>
				<text class="ml-20 text-26">(支持的有：zh、en、ja、ko、ar)</text>
		 	</view>
			
			<view class="u-flex u-flex-column ml-20 mt-20">
				<view class="u-flex">
					<text class="mr-30">视频去重:</text>
					<u-switch v-model="edit_parms.needTrim"></u-switch>
				</view>
				<view class="mt-10">
					<text>特效去重(选择)</text>
					<view class="flex">
						<u-input v-model="edit_parms.needMask" ></u-input>
						<text>备注:0 关闭 1扫光 2泛光开幕 3下降开幕 4书单模式 5溶图模式 6：横版视频分三屏显示7：好物模式
8：影视模式
9：短剧模式
10：探店模式</text>
					</view>
				</view>
				
				<view class="u-flex mt-30">
					<text class="mr-30">智能配乐:</text>
					<u-switch v-model="edit_parms.needRhythm"></u-switch>
				</view>
				
			</view>
			
			
		 </view>
		
		 <view class="flex mt-50 ml-40 mr-40">
		 	<u-button type="primary" @click="spliceVideoClickEvent1">二次编辑</u-button>
		 </view>
		 
		 <view v-if="materialId_splice > 0" class="flex mt-50 ml-40 mr-40">
		   <!-- https://api.zhaoli.com/v-w-c/gateway/ve/work/status -->
		 	<u-button type="primary" @click="spliceVideoClickEvent2">查询结果的数据</u-button>
		 	
		 	<video v-if="reslust_video.length > 0"  :src="reslust_video" controls></video>
		 	
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
	const reslust_video = ref('')
	
	const edit_parms = ref({
		needChineseOcclude:false,
		needTrim: false,
		needMask:0,
		needRhythm: false,
		videoInpaintLang:'zh'
		
	})
	
	onLoad(async () => {
		//console.log(getUploadApplyNonce('sdff'))
		
		materialId_splice.value = uni.getStorageSync('reslust_video3')
		

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
	
	const spliceVideoClickEvent1 = ()=>{
		if(unref(splice_video).length == 0){
			uni.showToast({
				icon:'none',
				title:'视频未解析到'
			})
			return
		}
		let parms = edit_parms
		parms.urls = [unref(splice_video)]
		uni.request({
			url: 'https://api.zhaoli.com/v-w-c/gateway/ve/work/free',
			method: 'POST',
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
				materialId_splice.value = res.data.body.dataList[0].id
				// 483187388
				uni.setStorageSync('reslust_video3', materialId_splice.value);
				
			}
		})
	}
	// 查询结果事件
	  const spliceVideoClickEvent2 = ()=>{
		   if (unref(materialId_splice).length == 0) {
		   	uni.showToast({
		   		icon: 'none',
		   		title: '视频未解析到'
		   	})
		   	return
		   }
		   const parms = {
		   	idWorks: [materialId_splice.value]
		   }
		   uni.request({
		   	url: 'https://api.zhaoli.com/v-w-c/gateway/ve/work/status',
		   	method: 'POST',
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
		   		reslust_video.value = res.data.body.content[0].url
		   		console.log(reslust_video.value)
		   	}
		   })
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