import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




export default new VueRouter({
	mode: 'hash',
	routes: [{
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
			redirect: '/home/index',
			component: () => import('../views/Home.vue'),
			children: [{
					path: '/home/index',
					name: 'index',
					component: () => import('../views/homeManager/Index.vue'), //首页内容
				},
				{
					path: '/home/test',
					name: 'test',
					component: () => import('../views/test.vue'), //test内容
				},

				//1.用户管理
				{
					path: '/home/usermanage',
					name: 'usermanage',
					component: () => import('../views/userManager/UserManage.vue'), //小程序用户
				},
				//1.直播管理
				{
					path: '/home/livemanage',
					name: 'livemanage',
					component: () => import('../views/liveManager/LiveManager.vue'), //直播管9理
				},
				//2.内容管理
				{
					path: '/home/newsmanage',
					name: 'newsmanage',
					component: () => import('../views/contentManager/NewsManage.vue') //新闻管理
				},
				{
					path: '/home/topicmanage',
					name: 'topicmanage',
					component: () => import('../views/contentManager/TopicManage.vue') //专题维护
				},
				{
					path: '/home/videomanage',
					name: 'videomanage',
					component: () => import('../views/contentManager/VideoManage.vue') //视频管理
				},
				{
					path: '/home/colummanage',
					name: 'colummanage',
					component: () => import('../views/contentManager/ColumnManage.vue') //栏目管理
				},
				{
					path: '/home/labelmanage',
					name: 'labelmanage',
					component: () => import('../views/contentManager/LabelManage.vue') //标签维护
				},
				{
					path: '/home/communityvoice',
					name: 'communityvoice',
					component: () => import('../views/contentManager/CommunityVoice.vue') //社区之声
				},
				{
					path: '/home/commentmanage',
					name: 'commentmanage',
					component: () => import('../views/contentManager/CommentManage.vue') //评论管理
				},
				{
					path: '/home/mnewseditor',
					name: 'mnewseditor',
					component: () => import('../views/contentManager/MNewsEditor.vue') //新闻编辑(管理员)
				},
				{
					path: '/home/newseditor',
					name: 'newseditor',
					component: () => import('../views/NewsEditor.vue') //新闻编辑
				},
				{
					path: '/home/videoeditor',
					name: 'mnewseditor',
					component: () => import('../views/contentManager/VodeoEditor.vue') //视频编辑(管理员)
				},

				//3.社区维护
				{
					path: '/home/communityManage',
					name: 'CommunityManage',
					component: () => import('../views/communityMaintenanceManager/CommunityManage.vue') //资料审核
				},
				{
					path: '/home/commaccount',
					name: 'commaccount',
					component: () => import('../views/communityMaintenanceManager/CommAccount.vue') //社区账号
				},
				{
					path: '/home/communityList',
					name: 'communityList',
					component: () => import('../views/communityMaintenanceManager/CommunityList.vue') //社区列表
				},
				{
					path: '/home/createcomm',
					name: 'createcomm',
					component: () => import('../views/communityMaintenanceManager/CreateComm.vue') //新建社区
				},

				// 4.机构管理
				{
					path: '/home/commmanager',
					name: 'CommManager',
					component: () => import('../views/mechanismManager/CommManager.vue') //组织机构
				},
				{
					path: '/home/create_organization',
					name: 'create_organization',
					component: () => import('../views/mechanismManager/CreateOrganization.vue') //创建组织机构
				},

				// 5.推荐管理
				{
					path: '/home/bannermanage',
					name: 'bannermanage',
					component: () => import('../views/recommendManager/BannerManage.vue') //推荐维护
				},

				//6.网络评选
				{
					path: '/home/onlineselection/index',
					name: 'onlineselection/index',
					component: () => import('../views/onlineSelection/index.vue') //网络评选
				},
				{
					path: '/home/onlineselection/activelist',
					name: 'onlineselection/activelist',
					component: () => import('../views/onlineSelection/activeList.vue') //网络评选活动列表
				},
				{
					path: '/home/onlineselection/activedetail',
					name: 'onlineselection/activedetail',
					component: () => import('../views/onlineSelection/activeDetail.vue') //活动详情
				},
				{
					path: '/home/onlineselection/addactive',
					name: 'onlineselection/addactive',
					component: () => import('../views/onlineSelection/addActive/index.vue') //网络评选/创建活动
				},
			]

		}
	]
})
