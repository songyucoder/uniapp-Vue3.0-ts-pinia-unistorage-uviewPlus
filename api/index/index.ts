import request from '@/utils/request'


export const getUploadApplyNonce = (data:any)=>{
	return request({
	    url: `/v-w-c/gateway/ve/file/upload/policy/apply`,
	    method: 'POST',
	    data,
	    loading: true
	})
}
