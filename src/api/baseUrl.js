export default {
	LOGIN_URL: `/user/doLogin`, //用户登录
	RESETPASSWORD: '/user/resetPassword', //密码修改
	LOADPRIMARYMENU_URL: '/menu/loadPrimaryMenu', //加载菜单
	GETUPTOKEN: '/token/getUpToken', //获取七牛云上传凭证

	GETSPECIALTOPICLIST: '/web/specialTopic/getSpecialTopicList', //获取专题列表
	DELETESPECIALTOPIC: '/web/specialTopic/deleteSpecialTopic', //删除专题
	SAVESPECIALTOPIC: '/web/specialTopic/saveSpecialTopic', //新增/修改专题

	GETCHANNELLIST: '/web/channel/getChannelList', //获取栏目列表
	DELETECHANNEL: '/web/channel/deleteChannel', //删除栏目
	GETCHANNELDETAIL: '/web/channel/getChannelDetail', //栏目详情
	SAVECHANNEL: '/web/channel/saveChannel', //新增或修改栏目

	GETTAGSLIST: '/web/tags/getTagsList', //标签列表
	DELETETAG: '/web/tags/deleteTag', //删除标签
	SAVETAG: '/web/tags/saveTag', //新增或修改标签

	GETNEWSLIST: '/web/news/getNewsList', //获取新闻列表
	DELETENEWSBYID: '/web/news/deleteNewsById', //删除新闻
	GETNEWSDEDAIL: '/web/news/getNewsDetailById', //获取新闻详情
	SAVENEWS: '/web/news/saveNews', //新增或修改新闻
	MODIFYVMREADNUMBER: '/web/news/modifyVmReadNumber', //修改浏览量
	APPROVENEWS: '/web/news/approveNews', //审核新闻
	MOVENEWSCHANNEL: '/web/news/moveNewsChannel', //移动新闻栏目
	COPYNEWSTONEWCHANNEL: '/web/news/copyNewsToNewChannel', //复制新闻栏目
	GETAREAS: '/common/getAreas', //获取行政区划
	GETAPPROVERECORDS: '/web/approve/getApproveRecords', //审核记录
	GETNEWSSTATISTICS: '/web/news/getNewsStatistics', //获取新闻统计
	GETNEWSRANK: '/web/news/getNewsRank', //获取新闻点击排名


	GETVIDEOLIST: '/web/Video/getVideoList', //获取视频列表
	APPROVEVIDEO: '/web/Video/approveVideo', //审核视频
	GETVIDEODETAIL: '/web/Video/getVideoDetailById', //视频详情
	SAVEVIDEO: '/web/Video/saveVideo', //保存/修改视频
	MODIFYVIDEOVMREADNUMBER: '/web/Video/modifyVmReadNumber', //修改视频浏览量
	COPYVIDEOTOVIDEOCHANNEL: '/web/Video/copyVideoToNewChannel', // 复制到视频栏目
	MOVEVIDEOCHANNEL: '/web/Video/moveVideoChannel', //移动视频栏目
	DELETEVIDEOBYID: '/web/video/deleteVideoById', //删除视频
	GETVIDEOSTATISTICS: '/web/Video/getVideoStatistics', //获取视频统计
	GETVIDEORANK: '/web/Video/getVideoRank', //获取视频点击排名

	GETWXUSERLIST: '/web/user/getWxUserList', //获取微信小程序用户列表哦
	ADDORMOVEBLACKLIST: '/web/user/addOrMoveBlackList', //小程序用户加入或移出黑名单
	ADDORMOVELIVELIST: '/web/user/addOrMoveLiveList', //主播授权/取消授权（管理员授权）
	ADDORMOVERECOMMEND: '/web/recommend/addOrMoveRecommend', //加入或移出推荐位

	//组织机构接口
	GETORGANIZATIONS: '/web/org/getOrganizations', //获取组织列表
	GETORGDETAILBYID: '/web/org/getOrgDetailById', //获取组织详细
	SAVEORGANIZATION: '/web/org/saveOrg', //新增或修改组织信息
	DELETEORGBYID: '/web/org/deleteOrgById', //删除组织
	APPROVEORG: '/web/org/approveOrg', //审核组织

	//广告接口
	GETBANNERLIST: '/web/banner/getBannerList', //获取广告图列表
	DELETEBANNERBYID: '/web/banner/deleteBannerById', //删除广告图
	SAVEBANNER: '/web/banner/saveBanner', //新增或修改广告图

	//活动接口
	GETACTIVELIST: '/web/vote/getActivities', //获取活动列表
	SAVEACTIVITY: '/web/vote/saveActivity', //新增或修改投票活动
	SAVEVOTEITEM: '/web/vote/saveVoteItem', //新增或修改投票项
	DELETEITEMBYID: '/web/vote/deleteItemById', //删除投票项
	SAVEVOTESET: '/web/vote/saveVoteSet', //新增或修改投票高级设置
	GETACTIVITYDETAILBYID: '/web/vote/getActivityDetailById', //获取投票活动详细
	DELETEACTIVITYBYID: '/web/vote/deleteActivityById', //删除投票活动
	APPROVEACTIVITY: '/web/vote/approveActivity', //审核投票活动
	GETJIONERRECORDS:'/web/vote/getJoinerRecords',//获取当前活动投票情况
	UPDATEQRCODE:'/web/vote/updateQrcode',//设置引流公众号
	GETQRCODE:'/web/vote/getQrcode',//获取引流公众号详情


	//评论管理
	GETCOMMENTLIST: '/web/comment/getCommentList', //获取评论列表
	RESUMECOMMENT: '/web/comment/resumeComments', //恢复评论
	SHIELDCOMMENTS: '/web/comment/shieldComments', //屏蔽评论


	//社区之声管理
	GETCOMMUNITYVOICELIST: '/web/voice/getCommunityVoiceList', //获取社区之声列表
	GETCOMMUNITYVOICEDETAIL: '/web/voice/getCommunityVoiceDetail', //获取社区之声详情	
	DELETECOMMUNITYVOICE: '/web/voice/deleteCommunityVoice', //删除社区之声
	APPROVECOMMUNITYVOICE: '/web/voice/approveCommunityVoice', //审核社区之声


	//资料审核
	GETSQMANAGERLIST: '/web/sqmanager/getSqManagerList', //获取社区负责人申请列表
	APPROVESQMANAGER: '/web/sqmanager/approveSqManager', //审核社区负责人

	//社区账号
	GETSQACCOUNTLIST: '/web/sqmanager/getSqAccountList', //获取负责人账号列表
	ACCOUNTCANUSED: '/web/sqmanager/accountCanUsed', //停/启用账号

	//社区列表
	GETDISTRICT: '/web/community/getDistrict', //获取社区列表
	SAVECOMMUNITY: '/web/community/saveCommunity', //新增或修改社区
	DELETEAREAS:'/web/community/deleteAreas',//删除当前区划及其所有下级区划
	GETAREADETAILBYID:'/web/community/getAreaDetailById',//获取当前区划详情
	
	//直播管理
	GETROOMLIST: '/web/liveManage/getRoomList', //获取直播视频房间列表
	DELETEROOMBYID: '/web/liveManage/deleteRoomById', //根据roomId删除视频
	GETPUSHURL: '/web/liveManage/getPushUrl', //获取直播间推流地址
}
