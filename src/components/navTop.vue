<template>
	<el-header>
		<div class="container">
			<ul class="h-left">
				<li><img src="../assets/images/wifi.svg" alt="" /></li>
				<li></li>
				<li class="logo"><img src="../assets/images/logo.svg" alt="" /></li>
				<li @click="$router.push('/home')"><span>社区发展治理平台</span></li>
				<!-- <li @click="$router.push('/home')"><span>新时代文明实践</span></li> -->
				<li>
					<span>{{ timer }}</span>
				</li>
			</ul>
			<ul class="h-right">
				<li 
					v-if="userInfo.role=='szw_admin'">
						<i class="el-icon-phone-outline isize" @click="dialogVisiblePhone = true">客服电话</i>
				</li>
				<li><i class="el-icon-user-solid isize" @click="dialogVisible = true">修改密码</i></li>
				<li @click="$router.push('/login')"><i class="el-icon-eleme isize">退出</i></li>
			</ul>
		</div>
		<!-- //修改密码 -->
		<el-dialog 
			title="修改密码" 
			:visible.sync="dialogVisible" 
			width="30%" 
			:before-close="handleClose" 
			center 
			:modal="false">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="密码" prop="oldpass"><el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input></el-form-item>
				<el-form-item label="新密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input></el-form-item>
				<el-form-item label="确认新密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</span>
		</el-dialog>
		
		
		
		<el-dialog
		  title="客服电话"
			center
		  :visible.sync="dialogVisiblePhone"
		  width="30%"
			:modal="false"
		  :before-close="handleClose">
		  <div>
				<el-form 
					:model="numberValidateForm" 
					ref="numberValidateForm" 
					label-width="100px" 
					class="demo-ruleForm">
				  <el-form-item
				    label="电话"
				    prop="phone"
				    :rules="[
				      { required: true, message: '电话不能为空'},
				      { type: 'number', message: '电话必须为数字值'}
				    ]"
				  >
				    <el-input 
							type="phone" 
							v-model.number="numberValidateForm.phone" 
							autocomplete="off"></el-input>
				  </el-form-item>
				</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisiblePhone = false">取 消</el-button>
		    <el-button type="primary" @click="submitFormPhone('numberValidateForm')">更 新</el-button>
		  </span>
		</el-dialog>
	</el-header>
</template>

<script>
import { getTime } from '../utils/tools.js';
import {resetPasswordAPI,updateCsinformAPI} from '../api/api.js'
import {bus} from '../utils/bus.js'
export default {
	data() {
		var validatePass1 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.oldpass !== '') {
					this.$refs.ruleForm.validateField('oldPass');
				}
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			msg: 'hell0',
			dialogVisiblePhone:false,
			timer: getTime(),
			 numberValidateForm: {
			          phone: ''
			        },
			dialogVisible: false,
			ruleForm: {
				pass: '',
				checkPass: '',
				oldpass: ''
			},
			rules: {
				pass: [{ validator: validatePass, trigger: 'blur' }],
				checkPass: [{ validator: validatePass2, trigger: 'blur' }],
				oldpass: [{ validator: validatePass1, trigger: 'blur' }]
			},
			userInfo:''
		};
	},
	created() {
		this.userInfo = bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
	},
	methods: {
		submitFormPhone(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						updateCsinformAPI(this.numberValidateForm).then(res=>{
							this.$message({
								type:'success',
								message:'更新成功'
							})
							this.dialogVisiblePhone=false
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let p={
						personid:this.userInfo.personid,
						newPassword:this.ruleForm.checkPass
					}
					resetPasswordAPI(p).then(res=>{
						console.log(res);
						this.dialogVisible = false;
						this.$router.push('/login');
						this.$message('修改成功')
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		handleClose(done) {
			done()
		}
	},
};
</script>

<style lang="less" scoped>
.isize {
	font-size: 18px !important;
}
.el-header {
	background-color: #409eef;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 59px;
	.container {
		color: #fff;
		display: flex;
		justify-content: space-between;
		.h-left {
			cursor: pointer;
			display: flex;
			align-items: center;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			font-size: 20px;
			text-align: left;
			font-family: SourceHanSansSC-bold;
			li:nth-child(1) {
				position: absolute;
				left: 55px;
				top: 1px;
				transform: rotate(-40deg);
			}
			li:nth-child(2) {
				position: absolute;
				left: 55px;
				top: 38px;
				border: 1px solid #fff;
				border-radius: 50% 50%;
				height: 5px;
				width: 5px;
			}
			li:nth-child(4){
				margin-left: 17px;
			}
			li:nth-child(5) {
				position: absolute;
				top: 10px;
				left: 322px;
				margin-left: 40px;
				font-weight: 500;
				opacity: 0.9;
				color: rgba(255, 255, 255, 1);
				font-size: 14px;
			}
			.logo {
				height: 26px;
				width: 36px;
				padding-bottom: 20px;
				margin-left: 34px;
				z-index: 11;
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
		.h-right {
			display: flex;
			align-items: center;
			opacity: 0.9;
			color: rgba(255, 255, 255, 1);
			font-size: 14px;
			.el-divider--vertical {
				height: 28px;
			}
			li {
				cursor: pointer;
				i {
					margin: 0 20px;
					margin-top: 20px;
					font-size: 24px;
				}
			}
			// li:nth-child(1):after{
			// 	position: absolute;
			// 	top: 15px;
			// 	right: 258px;
			// 	content: "";
			// 	background-color: red;
			// 	height: 10px;
			// 	width: 10px;
			// 	border-radius: 50%;
			// }
			.label {
				font-size: 14px;
				margin: 0 20px;
			}
		}
	}
}

// .addRedY:after{
// 	content: '◈';
// 	 color: red;
// 	 font-size: 18px;
// 	}

.item {
  // margin-top: 10px;
}

</style>
