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