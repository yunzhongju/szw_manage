import axios from 'axios'
import {
	Message
} from 'element-ui';
import VueRouter from 'vue-router'

// 默认超时设置
axios.defaults.timeout = 10000;
if(process.env.NODE_ENV==='development'){
	// 相对路径设置
	axios.defaults.baseURL = '/api';
}else{
	axios.defaults.baseURL = '';
}

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['accept'] = 'application/json'
//http request 拦截器
axios.interceptors.request.use(
	config => {
		// 获取token
		// const token = localStorage.getItem('token');
		// 设置参数格式
		if (!config.headers['Content-Type']) {
			config.headers = {
				'Content-Type': 'application/json',
			};
		}
		// 添加token到headers
		// if (token) {
		// 	config.headers.token = token
		// }
		// 鉴权参数设置
		if (config.method === 'get') {
			// get请求下 参数在params中，其他请求在data中
			config.params = config.params || {};
			let json = JSON.parse(JSON.stringify(config.params));
			//一些参数处理
		} else {
			config.data = config.data || {};
			//一些参数处理
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

//http response 拦截器
// axios.interceptors.response.use(
// 	response => {
// 		//一些统一code的返回处理
// 		if (response.data.code === 1) {
// 			// 登录验证
// 			//做了个示例跳转项目中登录，并记录下相对路径
// 			router.push({
// 				name: '/home', //从哪个页面跳转
// 			})
// 		}
// 		return response;
// 	},
// 	error => {
// 		return Promise.reject(error)
// 	}
// );


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params:params
		})
			.then(response => {
				// console.log(response.data);
				if (response.data.status === 1) {
					//返回成功处理  这里传的啥 后续调用的时候 res就是啥
					resolve(response.data.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
					// Message(response.data.msg)
				} else {
					//错误处理
					Message(response.data.msg)
				}
			})
			.catch(err => {
				reject(err);
				let message = '请求失败！请检查网络';
				//错误返回
				if (err.response) message = err.response.data.message;
				Message(message)
			})
	})
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				if (response) {
					resolve(response.data);
				} else {
					// Message(response.data.msg)
				}
			}, err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.response) message = err.response.data.message;
				Message(message)
			})
	})
}


export function del(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, data)
			.then(response => {
				if (response.data.code === 200) {
					resolve(response.data);
				} else {
					// Message(response.data.msg)
				}
			}, err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.response) message = err.response.data.message;
				Message(message)
			})
	})
}
//可以拼接的post
export function rePost(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			method: 'post',
			params: params,
			// data: params,
			// headers:{
			// 	'content-type': 'application/x-www-form-urlencggoded;charset=UTF-8'
			// }
		}).then(res => {
			// console.log('repost',res);
				if (res.status ==200) {
					resolve(res.data)
				} else {
					Message(res.data.msg)
				}
			},
			err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.res) message = err.res.data.message;
				Message(message)
			})
	})
}
