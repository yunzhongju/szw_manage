<template>
	<div class="login" style="height: 969px;">
		<div class="left" style="height: 840px;">
			<h2>社区发展治理</h2>
			<div class="form">
				<el-form :model="loginForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="username">
						<el-input placeholder="请输入账号" v-model="loginForm.username" clearable style="width: 425px;" prefix-icon="el-icon-user-solid"></el-input>
					</el-form-item>
					<el-form-item prop="password" v-if="choose">
						<el-input placeholder="请输入密码" clearable style="width: 425px;" v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
					</el-form-item>
				</el-form>
				<ul class="remerbpwd">
					<li><el-button name="login" type="primary" @click="login" style="width: 425px; height: 50px;">登录</el-button></li>
				</ul>
			</div>
		</div>

		<div class="right">
			<div class="showImg"><img src="../assets/images/login_img.jpg" alt /></div>
			<div class="desc">
				<h3>新时代文明中心</h3>
				<p>xxxxxxxxxxxxxxxxxxxxxxx</p>
				<p>xxxxxxxxxxxxx</p>
				<i class="el-icon-more"></i>
			</div>
		</div>
	</div>
</template>

<script>
import { set, get } from '../utils/local.js';
export default {
	data() {
		return {
			loginForm: {
				username: '',
				password: '',
				code: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'change'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'change'
					}
				],
				checkcode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}
				]
			},
			checked: true,
			disabled: false,
			choose: true,
			show: true,
			count: '',
			timer: null
		};
	},
	methods: {
		// 登录
		login() {
			// console.log(this.user)
		},
		handleChoose() {
			this.choose = !this.choose;
		},
		// 获取验证码
		getCode() {
			// console.log('ms');
			this.disabled = true;
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.show = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			}
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 1);

	.right {
		position: relative;
		width: 660px;
		height: 840px;
		border-radius: 0px 20px 20px 0px;
		background-color: green;

		.showImg {
			height: 575px;
			width: 100%;

			img {
				width: 100%;
				height: 100%;
				border-radius: 0px 20px 20px 0px;
			}
		}

		.desc {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: rgba(58, 98, 215, 1);
			color: rgba(255, 255, 255, 1);
			height: 225px;
			padding-top: 40px;

			h3 {
				font-size: 28px;
				margin-bottom: 20px;
			}

			p {
				font-size: 16px;
				margin-top: 8px;
			}

			i {
				position: absolute;
				bottom: 40px;
				left: 305px;
				font-size: 40px;
			}
		}
	}

	.left {
		width: 660px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		h2 {
			position: absolute;
			color: rgba(58, 98, 215, 1);
			font-size: 48px;
			left: 73px;
			top: 161px;
		}

		.switch {
			position: absolute;
			top: 320px;
			left: 412px;
			color: rgba(11, 124, 234, 1);
			font-size: 16px;
			cursor: pointer;
		}

		.form {
			position: absolute;
			left: 73px;
			top: 350px;
			width: 425px;
			height: 200px;

			.checkCode {
				display: flex;
				justify-content: space-between;
			}

			.forget {
				display: flex;
				justify-content: space-between;
				color: rgba(58, 98, 215, 1);
				font-size: 14px;
				margin-top: 10px;

				span {
					cursor: pointer;
				}
			}

			.goregist {
				margin-top: 15px;
				text-align: left;

				span {
					color: rgba(58, 98, 215, 1);
					font-size: 14px;
					cursor: pointer;
				}
			}

			.el-button–primary {
				background-color: rgba(58, 98, 215, 1);
			}

			.repwd {
				position: absolute;
				top: 115px;
				left: 0;
			}

			.form-item {
				margin-bottom: 30px;
			}

			bottom {
				width: 425px;
				height: 60px;
				line-height: 23px;
				border-radius: 3px;
				background-color: rgba(58, 98, 215, 1);
				color: rgba(255, 255, 255, 1);
				font-size: 16px;
				text-align: center;
				border: 1px solid rgba(58, 98, 215, 1);
			}
		}
	}
}

.remerbpwd {
	display: flex;
	flex-direction: column;
	position: relative;
	margin-top: 50px;

	li:nth-child(1) {
		position: absolute;
		left: 0;
		top: -30px;
	}
}
</style>
