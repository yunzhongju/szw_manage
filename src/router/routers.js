import Vue from 'vue'
import {
	router
} from './index'

// 默认路由
export let initMenu = [{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue') //登录
	},
	{
		path: '/mlogin',
		name: 'mlogin',
		component: () => import('../views/MLogin.vue') //管理员登录
	},
	{
		path: '/home',
		redirect: '/home/usermanage',
		component: () => import('../views/Home.vue'), //首页内容
		children: [{
				path: '/home/index',
				name: 'index',
				component: () => import('../views/Index.vue'), //首页内容
			},
			{
				path: '/home/test',
				name: 'test',
				component: () => import('../views/test.vue'), //test内容
			},
			{
				path: '/home/usermanage',
				name: 'usermanage',
				component: () => import('../views/UserManage.vue'), //小程序用户管理
			},
			{
				path: '/home/communityManage',
				name: 'CommunityManage',
				component: () => import('../views/CommunityManage.vue') //社区用户管理
			},
			{
				path: '/home/commmanager',
				name: 'CommManager',
				component: () => import('../views/CommManager.vue') //社区用户列表
			},
			{
				path: '/home/bannermanage',
				name: 'bannermanage',
				component: () => import('../views/BannerManage.vue') //推荐位管理
			},
			{
				path: '/home/newsmanage',
				name: 'newsmanage',
				component: () => import('../views/NewsManage.vue') //新闻管理
			},
			{
				path: '/home/topicmanage',
				name: 'topicmanage',
				component: () => import('../views/TopicManage.vue') //专题管理
			},
			{
				path: '/home/commentmanage',
				name: 'commentmanage',
				component: () => import('../views/CommentManage.vue') //评论管理
			},
			{
				path: '/home/newseditor',
				name: 'newseditor',
				component: () => import('../views/NewsEditor.vue') //新闻编辑
			},
			{
				path: '/home/mnewseditor',
				name: 'mnewseditor',
				component: () => import('../views/MNewsEditor.vue') //新闻编辑(管理员)
			},
			{
				path: '/home/videoeditor',
				name: 'videoeditor',
				component: () => import('../views/contentManage/VideoEditor.vue') //视频编辑(管理员)
			},
	
			{
				path: '/home/createcomm',
				name: 'createcomm',
				component: () => import('../views/CreateComm.vue') //新建社区
			},
			{
				path: '/home/commaccount',
				name: 'commaccount',
				component: () => import('../views/CommAccount.vue') //社区账号
			},
			{
				path: '/home/colummanage',
				name: 'colummanage',
				component: () => import('../views/ColumnManage.vue') //栏目管理
			},
		]

	}
]


export let menu = {
	"小程序用户管理": {
		path: '/usermanage',
		redirect: '',
		component: () => import('../views/UserManage.vue'),
		children:[
			
		]
	},
	
}
