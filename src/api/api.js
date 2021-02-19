import {
	get,
	post,
	del,
	rePost
} from '../utils/request'
import Url from './baseUrl.js'

// 更新客服信息
export function updateCsinformAPI(data) {
	return rePost('/web/csinform/updateCsinform', data)
}

// 登录
export function loginAPI(data) {
	return get(Url.LOGIN_URL, data)
}
export function addOrMoveListListAPI(data) {
	return rePost(Url.ADDORMOVELIVELIST, data)
}
//修改密码
export function resetPasswordAPI(data) {
	return rePost(Url.RESETPASSWORD, data)
}
// 加载菜单
export function menuAPI(data) {
	return get(Url.LOADPRIMARYMENU_URL, data)
}
//获取七牛云凭证
export function getTokenAPI(data) {
	return get(Url.GETUPTOKEN, data)
}
//获取行政区划
export function getAreasAPI(data) {
	return get(Url.GETAREAS, data)
}
//审核记录列表
export function getApproveRecordsAPI(data) {
	return get(Url.GETAPPROVERECORDS, data)
}

//专题管理
//专题列表获取
export function getTopicListAIP(data) {
	return get(Url.GETSPECIALTOPICLIST, data)
}
//删除专题
export function deleteTopicAPI(data) {
	return rePost(Url.DELETESPECIALTOPIC, data)
}
//新增/修改专题
export function saveTopicAPI(data) {
	return rePost(Url.SAVESPECIALTOPIC, data)
}


//栏目管理
//获取栏目列表
export function getChannelListAPI(data) {
	return get(Url.GETCHANNELLIST, data)
}
//删除栏目
export function deleteChannelAPI(data) {
	return rePost(Url.DELETECHANNEL, data)
}
//栏目详情
export function getChannelDetailAPI(data) {
	return get(Url.GETCHANNELDETAIL, data)
}
//新增栏目
export function saveChannelAPI(data) {
	return rePost(Url.SAVECHANNEL, data)
}


//标签管理
//标签列表
export function getTagsListAPI(data) {
	return get(Url.GETTAGSLIST, data)
}
//删除标签
export function deleteTagsAPI(data) {
	return rePost(Url.DELETETAG, data)
}
//新增或修改标签
export function saveTagAPI(data) {
	return rePost(Url.SAVETAG, data)
}


//新闻管理
// 获取新闻列表
export function getNewsListAPI(data) {
	return get(Url.GETNEWSLIST, data)
}
//删除新闻
export function deleteNewsByIdAPI(data) {
	return rePost(Url.DELETENEWSBYID, data)
}
// 获取新闻详情
export function getNewsDetailAPI(data) {
	return get(Url.GETNEWSDEDAIL, data)
}
// 新增or修改新闻
export function saveOrEditorNewAPI(data) {
	// return rePost(Url.SAVENEWS, data)
	return post(Url.SAVENEWS, data)
}
//审核新闻
export function approveNewsAPI(data) {
	return rePost(Url.APPROVENEWS, data)
}
//修改浏览量
export function modifyVmReadNumberAPI(data) {
	return rePost(Url.MODIFYVMREADNUMBER, data)
}
//移动新闻栏目
export function moveNewsChannelAPI(data) {
	return rePost(Url.MOVENEWSCHANNEL, data)
}
//复制新闻栏目
export function copyNewChannelAPI(data) {
	return rePost(Url.COPYNEWSTONEWCHANNEL, data)
}
//获取新闻统计
export function getNewsStatisticsAPI(data) {
	return get(Url.GETNEWSSTATISTICS, data)
}
//获取新闻点击排名
export function getNewsRankAPI(data) {
	return get(Url.GETNEWSRANK, data)
}



//视频管理
// 获取视频列表
export function getVideoListAPI(data) {
	return get(Url.GETVIDEOLIST, data)
}
// 获取视频详情
export function getVideoDetailAPI(data) {
	return get(Url.GETVIDEODETAIL, data)
}
//复制视频栏目
export function copyVideoChannelAPI(data) {
	return rePost(Url.COPYVIDEOTOVIDEOCHANNEL, data)
}
//移动视频栏目
export function moveVideoChannelAPI(data) {
	return rePost(Url.MOVEVIDEOCHANNEL, data)
}
//修改浏览量
export function modifyVideoVmReadNumberAPI(data) {
	return rePost(Url.MODIFYVIDEOVMREADNUMBER, data)
}
//审核视频
export function approveVideoAPI(data) {
	return rePost(Url.APPROVEVIDEO, data)
}
// 新增or修改视频
export function saveOrEditorVideoAPI(data) {
	return rePost(Url.SAVEVIDEO, data)
}
//删除视频
export function deleteVideoByIdAPI(data) {
	return rePost(Url.DELETEVIDEOBYID, data)
}
//获取视频统计
export function getVideoStatisticsAPI(data) {
	return get(Url.GETVIDEOSTATISTICS, data)
}
//获取视频点击排名
export function getVideoRankAPI(data) {
	return get(Url.GETVIDEORANK, data)
}

//小程序用户管理
//获取小程序用户列表
export function getWxUserListAPI(data) {
	return get(Url.GETWXUSERLIST, data)
}
//小程序用户加入或移出黑名单
export function addOrMoveBlackListAPI(data) {
	return rePost(Url.ADDORMOVEBLACKLIST, data)
}

//加入或移除推荐位
export function addOrMoveRecommend(data) {
	return rePost(Url.ADDORMOVERECOMMEND, data)
}

//组织机构管理
//获取组织列表
export function getOrganizationsAPI(data) {
	return get(Url.GETORGANIZATIONS, data)
}
//获取组织详情
export function getOrgDetailByIdAPI(data) {
	return get(Url.GETORGDETAILBYID, data)
}
//审核机构
export function approveOrgAPI(data) {
	return rePost(Url.APPROVEORG, data)
}
//删除组织
export function deleteOrgByIdAPI(data) {
	return rePost(Url.DELETEORGBYID, data)
}
//新增或修改组织信息
export function saveOrganizationAPI(data) {
	return rePost(Url.SAVEORGANIZATION, data)
}

//广告接口
//获取banner列表
export function getBannerListAPI(data) {
	return get(Url.GETBANNERLIST, data)
}
//删除banner
export function deleteBannerByIdAPI(data) {
	return rePost(Url.DELETEBANNERBYID, data)
}
//修改or编辑banner
export function saveOrEditBannerAPI(data) {
	return rePost(Url.SAVEBANNER, data)
}


//活动管理
//获取活动列表
export function getActiveListAPI(data) {
	return get(Url.GETACTIVELIST, data)
}
//获取当前活动投票情况
export function getJoinerRecordsAPI(data) {
	return get(Url.GETJIONERRECORDS, data)
}
//新增或修改投票活动
export function saveActivityAPI(data) {
	return rePost(Url.SAVEACTIVITY, data)
}
//新增或修改投票项
export function saveVoteItemAPI(data) {
	return rePost(Url.SAVEVOTEITEM, data)
}
//删除投票选
export function deleteItemByIdAPI(data) {
	return rePost(Url.DELETEITEMBYID, data)
}
//活动高级设置
export function saveVoteSetAPI(data) {
	return rePost(Url.SAVEVOTESET, data)
}
//获取活动详情
export function getActiveDetailByIdAPI(data) {
	return get(Url.GETACTIVITYDETAILBYID, data)
}
//删除投票活动
export function deleteActivityByIdAPI(data) {
	return rePost(Url.DELETEACTIVITYBYID, data)
}
//审核活动
export function approveActivityAPI(data) {
	return rePost(Url.APPROVEACTIVITY, data)
}
//设置引流公众号
export function updateQrcodeAPI(data) {
	return rePost(Url.UPDATEQRCODE, data)
}
//获取引流公众号详情
export function getQrcodeAPI(data) {
	return get(Url.GETQRCODE, data)
}
//清空引流公众号
export function clearQrcodeAPI(data) {
	return rePost('/web/vote/clearQrcode', data)
}
//pc端搜索投票项
export function getItemSearchResultAPI(data) {
	return get('/web/vote/getItemSearchResult', data)
}

//评论管理
//获取评论列表
export function getCommentsListAPI(data) {
	return get(Url.GETCOMMENTLIST, data)
}
//屏蔽评论
export function shieldCommentsAPI(data) {
	return rePost(Url.SHIELDCOMMENTS, data)
}
//恢复评论
export function resumeCommentsAPI(data) {
	return rePost(Url.RESUMECOMMENT, data)
}


//社区之声管理
//获取社区之声列表
export function getCommunityVoiceListAPI(data) {
	return get(Url.GETCOMMUNITYVOICELIST, data)
}
//获取社区之声详情	
export function getCommunityVoiceDetailAPI(data) {
	return get(Url.GETCOMMUNITYVOICEDETAIL, data)
}
//删除社区之声
export function deleteCommunityVoiceAPI(data) {
	return rePost(Url.DELETECOMMUNITYVOICE, data)
}
//审核社区之声
export function approveCommunityVoiceAPI(data) {
	return rePost(Url.APPROVECOMMUNITYVOICE, data)
}

//社区维护
//资料审核
export function getSqManagerListAPI(data) {
	return get(Url.GETSQMANAGERLIST, data)
}
//审核
export function approveSqManagerAPI(data) {
	return rePost(Url.APPROVESQMANAGER, data)
}

//社区账号
export function getSqAccountListAPI(data) {
	return get(Url.GETSQACCOUNTLIST, data)
}
//启/停用账号
export function accountCanUsedAPI(data) {
	return rePost(Url.ACCOUNTCANUSED, data)
}
//社区列表
export function getDistrictListAPI(data) {
	return get(Url.GETDISTRICT, data)
}
//获取当前区划详情
export function getAreaDetailByIdAPI(data) {
	return get(Url.GETAREADETAILBYID, data)
}
//添加社区
export function saveCommunityAPI(data) {
	return rePost(Url.SAVECOMMUNITY, data)
}
//删除当前区划及其所有下级区划
export function deleteAreasAPI(data) {
	return rePost(Url.DELETEAREAS, data)
}

//获取直播间推流地址
export function getPushUrlAPI(data) {
	return get(Url.GETPUSHURL, data)
}
//根据roomId删除视频
export function deleteRoomByIdAPI(data) {
	return rePost(Url.DELETEROOMBYID, data)
}
//获取直播视频房间列表
export function getRoomListAPI(data) {
	return get(Url.GETROOMLIST, data)
}