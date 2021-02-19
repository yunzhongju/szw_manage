<template>
	<div>
		<el-upload
			class="upload-demo"
			:action="domain"
			:on-remove="handleRemove"
			:file-list="fileList2"
			:before-upload="beforUpload"
			:data="qn"
			:limit="1"
			:on-success="handleSuccess"
			list-type="picture"
		>
			<el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
	</div>
</template>

<script>
import { getTokenAPI } from '../api/api.js';
import { bus } from '../utils/bus.js';
export default {
	data() {
		return {
			domain: 'http://upload-z2.qiniup.com',
			fileList: [],
			qn: {
				key: '',
				token: ''
			},
			qiniuaddr: 'https://image.sqfzzl.com/',
			img_url: ''
		};
	},
	methods: {
		handleSuccess(res, file, filelist) {
			this.img_url = this.qiniuaddr + res.key;
			// console.log('imgurl', this.img_url);
			bus.$emit('getImgUrl', this.img_url);
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		beforUpload(file) {
			var timestamp = new Date().getTime();
			this.qn.key = `${timestamp}/${file.name}`;
			console.log(0);
		},
	},
	created() {
		this.$http({
			url: '/token/getUpToken',
			method: 'get',
			params: {
				type: 'image'
			}
		}).then(res => {
			// console.log('请求数据', res);
			this.qn.token = res.data.data;
		});
	}
};
</script>

<style></style>
