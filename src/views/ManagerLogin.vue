<template>
	<div class="mlogin" style="height: 969px;">
		<div class="setform">
			<h1>社区发展治理后台管理</h1>
			<div class="form-content">
				<el-form ref="form" :model="form" :rules="rules">
					<el-form-item prop="username" label-width="auto">
						<el-input placeholder="请输入账号" v-model="form.username" clearable style="width: 425px;" prefix-icon="el-icon-user-solid"></el-input>
					</el-form-item>
					<el-form-item prop="password" label-width="auto">
						<el-input placeholder="请输入密码" clearable style="width: 425px;" v-model="form.password" show-password prefix-icon="el-icon-lock"></el-input>
					</el-form-item>
					<el-button type="primary" style="width: 300px;" @click="submitForm('form')">登录</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { checkUsername } from '../utils/index.js';
export default {
	data() {
		// 校验用户名
		var checkUsername = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请输入用户名'));
			} else {
				if (this.form.username !== '') {
					this.$refs.form.validataField('username');
				}
				callback();
			}
		};
		return {
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						validator: checkUsername,
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log('success');
				} else {
					console.log('error');
					return;
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.mlogin {
	background-image: url(../assets/images/bgimg.jpg);
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	.setform {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10%;
		justify-content: space-around;
		padding: 20px 10px;
		height: 400px;
		width: 500px;
		background-color: #000;
		border-radius: 10px;
		opacity: 0.75;
		box-shadow: 5px 5px 5px #000;
		h1 {
			color: #409eff;
			font-size: 30px;
		}
	}
}
</style>
