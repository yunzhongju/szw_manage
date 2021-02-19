import * as qiniu from 'qiniu-js'

export default class UploadImageAdapter {
	constructor(vue, loader) {
		this.vm = vue
		this.loader = loader
		this.qiniuData = {
			config: {
				 useCdnDomain: true, 
				  region: qiniu.region.z2
			},
			token: "",
			putExtra: {
				fname: "",
				params: {},
				mimeType: ["image/png", "image/jpeg"]
			},
			imgURL: "https://image.sqfzzl.com" //这个是自己服务器的域名
		}
	}
	getQiniuToken() {
		return new Promise(resolve => {
			this.vm.$http({
				url: `/token/getUpToken`,
				method: "get",
				params: {
					type: 'image'
				}
			}).then(res => {
				if (res.status == 200) {
					console.log('编辑器请求的token',res);
					resolve(res.data.data)
				}
			});
		})

	}
	async upload() {
		const vm = this.vm
		const img = await this.loader.file
		const token = await this.getQiniuToken() //获取七牛云token
		this.qiniuData.token = token
		let img_path=this.qiniuData.imgURL
		let imgType = img.name.split(".").reverse()[0];
		let filename =
			`qiDairy/${new Date().getTime()}${Math.random()
          .toString(18)
          .substr(2)}.${imgType}`;

		let observable = qiniu.upload(
			img,
			filename,
			this.qiniuData.token,
			this.qiniuData.putExtra,
			this.qiniuData.config
		);
		this.observable = observable
		return new Promise((resolve, reject) => {
			let observer = {
				next(res) {

				},
				error(err) {

					reject(false);
					// vm.$Message('上传失败！');
				},
				complete(res) {
					let url =`${img_path}/${res.key}?imageView2/0/format/jpg/q/15|imageslim`;
					let response = {
						default: url
					}
					resolve(response);
				}
			};
			let subscription = observable.subscribe(observer); // 上传开始
		})
	}

	abort() {
		//可以书写删除服务器图片的逻辑
	}
}
