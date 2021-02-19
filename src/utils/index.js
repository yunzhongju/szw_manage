/* 密码验证函数 */
export const regUtils = () => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/ //密码至少包含 数字和英文，长度6-12


/* 手机号验证函数 */
export const regPhoneNum = () => {
	return /^1[3456789]\d{9}$/
}


// 校验用户名
export const chechUsername = (rule, value, callback) => {
	if (value == '') {
		callback(new Error('用户名不能为空！'))
	} else {
		if (this.form.username !== '') {
			this.$refs.ruleForm.validataField('username');
		}
		callback();
	}
};
