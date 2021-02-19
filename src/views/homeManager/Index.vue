<template>
  <div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<HomeItem title="文章统计" :tags="tags" @getTag="getTag1">
				<HomeItemCard :list="newlist"></HomeItemCard>
			</HomeItem>
			<HomeItem title="文章点击排名" :tags="tags" @getTag="getTag2">
				<HomeNewsCard :data="sortList"></HomeNewsCard>
			</HomeItem>
			<HomeItem title="视频统计" :tags="tags" @getTag="getTag3">
				<HomeItemCard :list="newlist1" radius="50px"></HomeItemCard>
			</HomeItem>
			<HomeItem title="视频点击排名" :tags="tags" @getTag="getTag4">
				<HomeNewsCard :data="sortList1"></HomeNewsCard>
			</HomeItem>
			<HomeItem title="社区封面">
				<div style="padding: 20px 0;">
					<img src="../../assets/images/bgimg.jpg" alt="" style="width: 650px; height: 300px;">
				</div>
			</HomeItem>
		</div>
	</div>
</template>

<script>
	import HomeItem from './components/homeItem.vue'
	import HomeItemCard from './components/homeItemCard.vue'
	import HomeNewsCard from './components/homeNewsCard.vue'
	import {bus} from '../../utils/bus.js'
	import {getNewsStatisticsAPI,
					getNewsRankAPI,
					getVideoStatisticsAPI,
					getVideoRankAPI
					} from '../../api/api.js'
export default {
	components:{
		HomeItem,
		HomeItemCard,
		HomeNewsCard
	},
	data(){
		return {
			userInfo:'',
			tags:[{title:'今日',value:'today'},{title:'本周',value:'week'},{title:'本月',value:'month'}],
			list:[],
			list1:[],
			sortList:[],
			sortList1:[]
		}
	},
	methods:{
		getTag1(val){
			console.log(val);
			this.getNewsStatstics(val,this.userInfo.role,this.userInfo.orgid)
		},
		getTag2(val){
			console.log(val);
			this.getNewsRank(val,this.userInfo.role,this.userInfo.orgid)
		},
		getTag3(val){
			console.log(val);
			this.getVideoStatstics(val,this.userInfo.role,this.userInfo.orgid)
		},
		getTag4(val){
			console.log(val);
			this.getVideoRank(val,this.userInfo.role,this.userInfo.orgid)
		},
		getNewsStatstics(cycle,role,community){
			let params={
				cycle:cycle,
				role:role,
				community:community
			}
			getNewsStatisticsAPI(params).then(res=>{
				console.log('统计数据',res);
				this.list=res
			})
		},
		getNewsRank(cycle,role,community){
			let params={
				cycle:cycle,
				role:role,
				community:community,
				pageSize:'10',
				pageNumber:'1'
			}
			getNewsRankAPI(params).then(res=>{
				console.log('点击排名',res);
				this.sortList=res.list
			})
		},
		getVideoStatstics(cycle,role,community){
			let params={
				cycle:cycle,
				role:role,
				community:community
			}
			getVideoStatisticsAPI(params).then(res=>{
				console.log('统计视频数据',res);
				this.list1=res
			})
		},
		getVideoRank(cycle,role,community){
			let params={
				cycle:cycle,
				role:role,
				community:community,
				pageSize:'10',
				pageNumber:'1'
			}
			getVideoRankAPI(params).then(res=>{
				console.log('点击排名',res);
				this.sortList1=res.list
			})
		},
	},
	created() {
		this.userInfo =bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
		this.getNewsStatstics('today',this.userInfo.role,this.userInfo.orgid)
		this.getNewsRank('today',this.userInfo.role,this.userInfo.orgid)
		this.getVideoStatstics('today',this.userInfo.role,this.userInfo.orgid)
	},
	computed:{
		newlist(){
			let arr=[]
			this.list.forEach((item,index)=>{
				if(index===0){
					item.color='#67abee',
					item.icon='el-icon-view',
					item.name='总浏览量'
					arr.push(item)
				}else if(index===1){
					item.color='#00b3a0',
					item.icon='el-icon-thumb',
					item.name='总点赞量'
					arr.push(item)
				}else if(index===2){
					item.color='#f44505',
					item.icon='el-icon-chat-dot-round',
					item.name='总评论量'
					arr.push(item)
				}else{
					item.color='#088580',
					item.icon='el-icon-share',
					item.name='总转发量'
					arr.push(item)
				}
			})
			console.log(arr);
			return arr
		},
		newlist1(){
			let arr=[]
			this.list1.forEach((item,index)=>{
				if(index===0){
					item.color='#67abee',
					item.icon='el-icon-view',
					item.name='总浏览量'
					arr.push(item)
				}else if(index===1){
					item.color='#00b3a0',
					item.icon='el-icon-thumb',
					item.name='总点赞量'
					arr.push(item)
				}else if(index===2){
					item.color='#f44505',
					item.icon='el-icon-chat-dot-round',
					item.name='总评论量'
					arr.push(item)
				}else{
					item.color='#088580',
					item.icon='el-icon-share',
					item.name='总转发量'
					arr.push(item)
				}
			})
			console.log(arr);
			return arr
		},
	}
};
</script>

<style lang="less" scoped>
.content{
	margin-top: 40px;
	background-color:#f0f0f2;
	padding: 10px 10px;
}

</style>