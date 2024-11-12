import { ref } from 'vue'

const orderListParam = ref({
    pageIndex: 1,
    pageSize: 10
})
const status = ref('loading')
const totalList = ref([])
const dataList = ref([])
const isLoading = ref(false)
export async function useFindDataList(callback, param = {}, isInit = false) {

    if (isInit) {
        orderListParam.value = {
            pageIndex: 1,
            pageSize: 10
        }
        status.value = 'loading'
        totalList.value = []
    }
    if (status.value === 'nomore' || isLoading.value) {
        return {
            pageStatus: status.value,
            pageTotalList: totalList.value,
            pageDataList: []
        }
    }
    const query = {
        ...param,
        ...orderListParam.value
    }
    isLoading.value = true
    try {
        const { data } = await callback(query)
        const { total = 0, list = [] } = data
        totalList.value = totalList.value.concat(list)
        dataList.value = list
        if (totalList.value.length === total) {
            status.value = 'nomore'
        } else {
            orderListParam.value.pageIndex++
        }
        isLoading.value = false

        return {
            pageStatus: status.value,
            pageTotalList: totalList.value,
            pageDataList: dataList.value
        }
    } catch (error) {
        isLoading.value = false
        return {
            pageStatus: 'nomore',
            pageTotalList: totalList.value,
            pageDataList: []
        }
    }
}
