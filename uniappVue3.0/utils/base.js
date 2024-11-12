// 时间戳处理
const timeFormat = (time, mode) => {
    console.log(time, mode)
    var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    if (mode == 'YYYY-MM-DD hh:mm:ss') {
        return Y + M + D + h + m + s
    } else if (mode == 'YYYY-MM-DD') {
        return Y + M + D
    }
}
// 将秒的整数转化成时分秒
const tranTimeHM = (time)=> {
            // 转换为式分秒
            let h = parseInt(time / 60 / 60 % 24)
            h = h < 10 ? '' + h : h
            let m = parseInt(time / 60 % 60)
             m = m < 10 ? '' + m : m
            let s = parseInt(time % 60)
             s = s < 10 ? '' + s : s
            // 作为返回值返回
			let hStr = ''
			let mStr = ''
			let sStr = ''
			if(h != '0'){
				hStr = h + '时'
			}
			if(m != '0'){
				mStr = m + '分'
			}
			if(s != '0'){
				sStr = s + '秒'
			}
            return hStr + mStr + sStr
    }

const pictureSaving = (data, basis) => {
    // #ifdef H5
    var oA = document.createElement('a')
    oA.download = '' // 设置下载的文件名，默认是'下载'
    oA.href = data
    document.body.appendChild(oA)
    oA.click()
    oA.remove() // 下载之后把创建的元素删除
    uni.showToast({
        title: '保存成功', //标题
        duration: 2000 //显示时间
    })
    // #endif
    // #ifndef H5
    if (basis) {
        uni.saveImageToPhotosAlbum({
            filePath: data,
            success: function () {
                uni.showToast({
                    title: '图片保存成功',
                    icon: 'none'
                })
                bitmap.clear()
            }
        })
    } else {
        let base64 = data
        const bitmap = new plus.nativeObj.Bitmap('base64')
        bitmap.loadBase64Data(
            base64,
            function () {
                const url = '_doc/' + new Date().getTime() + '.png'
                console.log('saveHeadImgFile', url)
                bitmap.save(
                    url,
                    {
                        overwrite: true // 是否覆盖
                        // quality: 'quality'  // 图片清晰度
                    },
                    (i) => {
                        uni.saveImageToPhotosAlbum({
                            filePath: url,
                            success: function () {
                                uni.showToast({
                                    title: '图片保存成功',
                                    icon: 'none'
                                })
                                bitmap.clear()
                            }
                        })
                    },
                    (e) => {
                        uni.showToast({
                            title: '图片保存失败',
                            icon: 'none'
                        })
                        bitmap.clear()
                    }
                )
            },
            (e) => {
                uni.showToast({
                    title: '图片保存失败',
                    icon: 'none'
                })
                bitmap.clear()
            }
        )
    }

    //  #endif
}
const toZhDigit = (digit) => {
    digit = typeof digit === 'number' ? String(digit) : digit
    const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const unit = ['千', '百', '十', '']
    const quot = [
        '万',
        '亿',
        '兆',
        '京',
        '垓',
        '秭',
        '穰',
        '沟',
        '涧',
        '正',
        '载',
        '极',
        '恒河沙',
        '阿僧祗',
        '那由他',
        '不可思议',
        '无量',
        '大数'
    ]
    let breakLen = Math.ceil(digit.length / 4)
    let notBreakSegment = digit.length % 4 || 4
    let segment
    let zeroFlag = [],
        allZeroFlag = []
    let result = ''

    while (breakLen > 0) {
        if (!result) {
            // 第一次执行
            segment = digit.slice(0, notBreakSegment)
            let segmentLen = segment.length
            for (let i = 0; i < segmentLen; i++) {
                if (segment[i] != 0) {
                    if (zeroFlag.length > 0) {
                        result += '零' + zh[segment[i]] + unit[4 - segmentLen + i]
                        // 判断是否需要加上 quot 单位
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2]
                        }
                        zeroFlag.length = 0
                    } else {
                        result += zh[segment[i]] + unit[4 - segmentLen + i]
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2]
                        }
                    }
                } else {
                    // 处理为 0 的情形
                    if (segmentLen == 1) {
                        result += zh[segment[i]]
                        break
                    }
                    zeroFlag.push(segment[i])
                    continue
                }
            }
        } else {
            segment = digit.slice(notBreakSegment, notBreakSegment + 4)
            notBreakSegment += 4

            for (let j = 0; j < segment.length; j++) {
                if (segment[j] != 0) {
                    if (zeroFlag.length > 0) {
                        // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
                        if (j === 0) {
                            result += quot[breakLen - 1] + zh[segment[j]] + unit[j]
                        } else {
                            result += '零' + zh[segment[j]] + unit[j]
                        }
                        zeroFlag.length = 0
                    } else {
                        result += zh[segment[j]] + unit[j]
                    }
                    // 判断是否需要加上 quot 单位
                    if (j === segment.length - 1 && breakLen > 1) {
                        result += quot[breakLen - 2]
                    }
                } else {
                    // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
                    if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
                        result += quot[breakLen - 1]
                        zeroFlag.length = 0
                        zeroFlag.push(segment[j])
                    } else if (allZeroFlag.length > 0) {
                        // 执行到最后
                        if (breakLen == 1) {
                            result += ''
                        } else {
                            zeroFlag.length = 0
                        }
                    } else {
                        zeroFlag.push(segment[j])
                    }

                    if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
                        // 如果执行到末尾
                        if (breakLen === 1) {
                            allZeroFlag.length = 0
                            zeroFlag.length = 0
                            result += quot[breakLen - 1]
                        } else {
                            allZeroFlag.push(segment[j])
                        }
                    }
                    continue
                }
            }

            --breakLen
        }

        return result
    }
}

export { timeFormat, pictureSaving, toZhDigit, tranTimeHM }
