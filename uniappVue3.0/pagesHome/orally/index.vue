<template>
	<view class="flex">
		<view class="flex mt-50 bg-gray-200 content">
			<video v-if="splice_video.length > 0" :src="splice_video" controls></video>
			<button @click="uploadVideoClickEvent">选择视频</button>
		</view>

		<view class="flex mt-50 ml-40 mr-40">
			<u-button type="primary" @click="spliceVideoClickEvent1">提交</u-button>
		</view>

		<view v-if="materialId_splice > 0" class="flex mt-50 ml-40 mr-40">
			<!-- https://api.zhaoli.com/v-w-c/gateway/ve/work/status -->
			<u-button type="primary" @click="spliceVideoClickEvent2">查询结果的数据</u-button>

			<video v-if="reslust_video.length > 0" :src="reslust_video" controls></video>

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
	const materialId_splice = ref(483187388)
	const reslust_video = ref('')

	const edit_parms = ref({
		needChineseOcclude: false,
		needTrim: false,
		needMask: 0,
		needRhythm: false,
		videoInpaintLang: 'zh'

	})

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

	const spliceVideoClickEvent1 = () => {
		
		
		
	}
	// 查询结果事件
	const spliceVideoClickEvent2 = () => {
		
		
		
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