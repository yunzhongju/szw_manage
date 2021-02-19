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
			<div class="el-upload__text">
				<em>点击上传视频</em>
			</div>
			<div class="el-upload__tip" slot="tip">视频大小不超过500M</div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<div class="show-video">
				<video :src="video_url" controls autoplay style="width: 507px; height: 363px;"></video>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible:false,
			domain: 'http://upload-z2.qiniup.com', //七牛云上传地址
			qn: {
				key: '',
				token: ''
			}, //七牛云参数
			qiniuaddr: 'https://video.sqfzzl.com/', //图片外接地址
			video_url: '' //预览图片url
		};
	},
	methods:{
		//上传之前
		beforUpload(file) {
			var timestamp = new Date().getTime();
			console.log(file)
			this.qn.key = `${timestamp}.mp4`;
			console.log('视频的name',this.qn.key);
		},
		//七牛云上传成功
		handleSuccess(res, file, filelist) {
			console.log(res);
			this.video_url = this.qiniuaddr + res.key;
			this.$emit('getVideoUrl',this.video_url)
			this.dialogVisible=true
			console.log('video_url', this.video_url);
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
					type: 'video'
				}
			}).then(res => {
				console.log('请求数据video-token', res);
				this.qn.token = res.data.data;
			});
		},
	},
	created() {
		this.getToken()
	}
};
</script>

<style scoped lang="less">
	.show-video{
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
