<template>
	<div>
		<el-upload
		  class="upload-demo"
		  drag
		  :action="domain"
		  :data="qn"
		  :before-upload="beforUpload"
		  :on-success="handleSuccess"
		  :on-preview="handlePictureCardPreview"
			>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,且不超过500kb,像素为:{{adviceSize}}</div>
		</el-upload>
		<!-- <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="image_url" alt="" /></el-dialog> -->
	</div>
</template>

<script>
export default {
	props:{
		adviceSize:{
			type:String,
			default:()=>'750*370'
		}
	},
	data() {
		return {
			dialogVisible:false,
			domain: 'http://upload-z2.qiniup.com', //七牛云上传地址
			qn: {
				key: '',
				token: ''
			}, //七牛云参数
			qiniuaddr: 'https://image.sqfzzl.com/', //图片外接地址
			image_url: '' //预览图片url
		};
	},
	methods:{
		//上传之前
		beforUpload(file) {
			var timestamp = new Date().getTime();
			this.qn.key = `${timestamp}/${file.name}`;
			console.log('视频的name',this.qn.key);
		},
		//七牛云上传成功
		handleSuccess(res, file, filelist) {
			this.image_url = this.qiniuaddr + res.key;
			this.$emit('getImageUrl',this.image_url)
			this.dialogVisible=true
			console.log('image_url', this.image_url);
		},
		//视频预览
		handlePictureCardPreview(file) {
			this.dialogVisible=true
		},
		getToken(){
			this.$http({
				url: '/token/getUpToken',
				method: 'get',
				params: {
					type: 'image'
				}
			}).then(res => {
				console.log('请求数据image-token', res);
				this.qn.token = res.data.data;
			});
		},
	},
	created() {
		this.getToken()
	}
};
</script>

<style>
	.el-upload__tip{
		color: red;
	}
</style>
