/**
 * 验证小数点后两位及多个小数
 * money 金额
 */
	
export function isMoney(money) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
	if (reg.test(money)) {
		return true
	} else {
		return false
	}
}

/**
 * 验证手机号码
 */
export function checkPhone(phone) {
	var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
	if (reg.test(phone)) {
		return true
	} else {
		return false
	}
}


/**
 * 验证邮箱
 */
export function isEmailAvailable(emailInput) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if (!myreg.test(emailInput)) {
		return false;
	} else {
		return true;
	}
}



