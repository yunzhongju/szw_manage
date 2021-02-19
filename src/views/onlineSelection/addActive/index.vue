<template>
	<div>
		<!-- <Breadcrumb></Breadcrumb> -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">网络评选</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">活动编辑</a></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<el-card 
			shadow="always" 
			class="box-card" :body-style="{ padding: '0px', 'padding-top': '20px' }">
				<div class="step">
					<el-steps :active="active" align-center>
						<el-step title="基础设置"></el-step>
						<el-step title="投票项设置"></el-step>
						<el-step title="高级设置"></el-step>
					</el-steps>
				</div>

				<div class="step1" v-show="active==1">
					<div class="step1-from">
						<el-form ref="baseForm" :model="baseForm" label-width="100px" :rules="rule">
						  <el-form-item 
								label="活动标题" 
								prop="title">
						    <el-input v-model="baseForm.title" style="width: 400px;"></el-input>
						  </el-form-item>
							<el-form-item
								label="选择区域"
								prop="communityId">
								<el-cascader
									:props="props"
									clearable
									v-model="baseForm.communityId" 
									:options="areas"
									ref="myregon"
									placeholder="请选择区域"
									style="width: 400px;">
								</el-cascader>
							</el-form-item>
							<el-form-item 
								label="发布人姓名" 
								prop="createPerson" 
								label-width="100px">
							  <el-input 
									v-model="baseForm.createPerson" 
									disabled
									style="width: 400px;"></el-input>
							</el-form-item>
							<el-form-item
								label="虚拟浏览量" 
								prop="vmRead" 
								label-width="100px">
							  <el-input 
									v-model="baseForm.vmRead" 
									style="width: 400px;"></el-input>
							</el-form-item>
						  <el-form-item 
								label="活动封面" 
								prop="coverImg" 
								label-width="100px">
								<div class="preview">
									<ImgUp @getImageUrl="getImageUrl"></ImgUp>
									<span 
										v-if="baseForm.coverImg"><img 
										:src="baseForm.coverImg" 
										style="width: 365px;height: 124px;" alt=""></span>
								</div>
						  </el-form-item>
						  <el-form-item 
								label="活动时间" 
								prop="activeTime" 
								label-width="100px">
						     <el-date-picker
						          v-model="baseForm.activeTime"
						          type="datetimerange"
											 value-format="timestamp"
						          start-placeholder="开始日期"
						          end-placeholder="结束日期"
						          :default-time="['12:00:00']">
						        </el-date-picker>
						  </el-form-item>
							<el-form-item label="活动描述" prop="content" label-width="100px">
							  <CkEditor @input="getContent" height="180px" :text="baseForm.content"></CkEditor>
							</el-form-item>
							<el-form-item >
							  <span class="button">
									<el-button type="primary" @click="handleSaveBase('baseForm')">保存</el-button>
									<el-button type="primary" @click="handleClick(2)">下一步</el-button>
								</span>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="step2" v-show="active==2">
					<div class="step2-tab">
						<ul>
							<li 
								v-for="(item,index) in tabs" 
								:key="index" 
								:class="[isActive===index?'isActive':'']"
								@click="handleTabClick(index,item)">
								<span>投票项{{item.code}}</span>
								<i class="el-icon-close" @click="handleTabDel(item.id)"></i>
							</li>
							<li 
							  @click="handleTempItem"
								:class="[isAddItem?'isActiveNew':'']"
								v-if="isAddItem">
								<span>新投票项</span>
								<i class="el-icon-close" @click.stop="handleRemoveNewItem"></i>
							</li>
							<li><el-button 
								type="primary"
								style="width: 100%;height: 100%;border: 0;" 
								@click="handleClear" 
								size="small">新增</el-button></li>
							<li><el-button 
								type="primary"
								style="width: 100%;height: 100%;border: 0;"
								@click="handleTabAdd('itemForm')" 
								size="small">保存</el-button></li>
						</ul>
					</div>
					<div class="step2-from">
						<el-form ref="itemForm" :model="itemForm" label-width="80px" :rules="itemRule">
						  <el-form-item 
								label="名称" 
								prop="item_title">
						    <el-input v-model="itemForm.item_title" style="width: 400px;"></el-input>
						  </el-form-item>
							<el-form-item 
								label="编号" 
								prop="code">
							  <el-input v-model="itemForm.code" style="width: 400px;" disabled></el-input>
							</el-form-item>
						  <el-form-item 
								label="投票图片" 
								prop="item_coverImg">
								<div class="preview">
									<ImgUp @getImageUrl="getImageItemUrl"></ImgUp>
									<span v-if="itemForm.item_coverImg">
										<img :src="itemForm.item_coverImg" alt="">
									</span>
								</div>
						  </el-form-item>
							<el-form-item label="视频">
								<div>
									<UploadVideo @getVideoUrl="getVideoUrl"></UploadVideo>
								</div>
								<div class="show-video" v-show="itemForm.videoPath">
									<video class="show-video" :src="itemForm.videoPath" controls></video>
								</div>
							</el-form-item>
							<el-form-item 
								label="介绍" 
								prop="item_content">
							  <CkEditor 
									@input="getItemContent" 
									height="180px" 
									:text="itemForm.item_content"></CkEditor>
							</el-form-item>
							<el-form-item>
								<div style="display: flex;justify-content: center;">
									<span class="">
										<el-button type="primary" @click="handleClickUpPage(1)">上一步</el-button>
										<el-button type="primary" @click="handleHighSet">下一步</el-button>
									</span>
								</div>
							  
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="step3" v-show="active==3">
					<div class="step3-from">
						<el-form ref="highForm" :model="highForm" label-width="250px">
						  <el-form-item label="用户投票总次数">
						    <el-input v-model="highForm.totalTimes" style="width: 400px;"></el-input>
						  </el-form-item>
							<el-form-item label="用户每天投票次数">
							  <el-input v-model="highForm.dayTimes" style="width: 400px;"></el-input>
							</el-form-item>
						  <el-form-item label="允许单日同一投票项重复投">
								<el-radio v-model="highForm.dayRevote" :label="true">允许</el-radio>
								<el-radio v-model="highForm.dayRevote" :label="false">不允许</el-radio>
						  </el-form-item>
							<el-form-item label="投票文案设置">
							  <el-radio-group v-model="Copywritingadio">
							      <el-radio :label="1">投票</el-radio>R
							      <el-radio :label="2">点赞</el-radio>
							      <el-radio :label="3">支持</el-radio>
										<el-radio :label="4">助力</el-radio>
										<el-radio :label="5">打call</el-radio>
										<el-radio :label="6">自定义</el-radio>
							    </el-radio-group>
							</el-form-item>
							<el-form-item label="自定义文案设置">
							  <el-input 
								v-model="highForm.customize" 
								:disabled="isCustom"
								style="width: 400px;"
								></el-input>
							</el-form-item>
							<el-form-item>
								<div style="display: flex;justify-content: center;">
									<span class="">
										<el-button type="primary" @click="handleSetUp(2)">上一步</el-button>
										<el-button type="primary" @click="handleSubmit">提交</el-button>
									</span>
								</div>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import Breadcrumb from '../../../components/breadcrumb.vue';
import ImgUp from './imgUp.vue'
import CkEditor from '../../../components/ckeditor/ckeditor.vue'
import UploadVideo from '../../../components/uploadVideo.vue'
import {saveActivityAPI,
				saveVoteItemAPI,
				getAreasAPI,
				saveVoteSetAPI,
				deleteItemByIdAPI,
				getActiveDetailByIdAPI} from '../../../api/api.js'
export default {
	components: {
		Breadcrumb,
		ImgUp,
		CkEditor,
		UploadVideo
	},
	data() {
		return {
			tempItem:{
				title:'',
				img:'',
				content:''
			},
			isAddItem:false,
			currentActivityItem:null,
			isOk1:false,
			isSave:true,
			currentActivity:'',
			currentActiveId:'',
			isCustom:true,
			isAllowadio:0, //是否允许
			Copywritingadio:0,
			isActive:0,
			active: 1,
			tabs:[],
			baseForm:{
				id:'',
				title:'',
				coverImg:'',
				activeTime:[],
				content:'',
				createPerson:'',
				personid:'',
				communityId :["510000", "510100"],
				vmRead:0
			},
			itemForm:{
				id:'',
				code:'',
				activityId:'',
				item_title:'',
				item_coverImg:'',
				item_content:'',
				videoPath:""
			},
			highForm:{
				id:'',
				activityId:'',
				totalTimes:'',
				dayTimes:'',
				dayRevote:'',
				voteButton:'',
				customize:''
			},
			rule:{
				title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
				coverImg:[{ required: true, message: '请上传图片', trigger: 'blur' }],
				activeTime:[{ required: true, message: '请选择时间', trigger: 'blur' }],
				content:[{ required: true, message: '请输入描述', trigger: 'blur' }],
				createPerson:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
				communityId:[{ required: true, message: '请选择区域', trigger: 'blur' }],
				vmRead:[{ required: true, message: '请输入虚拟浏览量', trigger: 'blur' }],
				
			},
			itemRule:{
				item_title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
				item_coverImg :[{ required: true, message: '请上传图片', trigger: 'blur' }],
				item_content:[{ required: true, message: '请输入描述', trigger: 'blur' }],
			},
			props: {
				 checkStrictly: true,
				 lazy: true,
				 lazyLoad: this.lazyLoad
			},
			region:[]
		};
	},
	methods: {
		getVideoUrl(url){
			this.itemForm.videoPath=url
		},
		//加载方法
		lazyLoad(node, resolve) {
			setTimeout(() => {
				this.getProvence(node, resolve)
			}, 1000)
		},
		getProvence(node, resolve){
			console.log('节点',node);
			// 510000
			// node.data.value
			getAreasAPI({parentId:node.data?node.data.value:''}).then(res=>{
				 const nodes = res.map(item=>({
					 value: item.orgid, // 
					 label: item.orgname,
					 leaf: node.level >= 5 // 5层级
				 }))
				 resolve(nodes)
			})
		},
		handleRemoveNewItem(){
			this.isSave=true
			this.isAddItem=false
			this.itemForm.item_title=''
			this.itemForm.item_coverImg=''
			this.itemForm.item_content=''
		},
		handleTempItem(){
			this.isSave=false
			this.itemForm.item_title=this.tempItem.title
			this.itemForm.item_coverImg=this.tempItem.img
			this.itemForm.item_content=this.tempItem.content
			this.itemForm.code=''
			this.itemForm.videoPath=''
		},
		handleSetUp(id){
			this.active=id
		},
		handleHighSet(){
			if(this.isSave){
				this.active=3
			}else{
				this.$message({
					type:'warning',
					message:'请先保存'
				})
			}
		
			// this.handleTabAdd()
		},
		//获取图片
		getImageUrl(url){
			this.baseForm.coverImg=url
		},
		getImageItemUrl(url){
			this.itemForm.item_coverImg=url
		},
		//获取内容
		getContent(val){
			console.log(val);
			this.baseForm.content=val
		},
		getItemContent(val){
			this.itemForm.item_content=val
		},
		handleSubmit(){
			this.highForm.voteButton=this.Copywritingadio
			console.log('high form',this.highForm);
			let p={
				id:this.highForm.id?this.highForm.id:'',
				activityId :this.currentActiveId ,
				totalTimes:this.highForm.totalTimes,
				dayTimes:this.highForm.dayTimes,
				dayRevote:this.highForm.dayRevote,
				voteButton:this.highForm.voteButton,
				customize:this.highForm.customize
			}
			saveVoteSetAPI(p).then(res=>{
				console.log(res);
				if(res.status==1){
					this.$message({
						message:res.msg,
						type:'success'
					})
					this.$router.push('/home/onlineselection/activelist')
				}
			})
		},
		handleClickUpPage(id){
			this.active=id
		},
		handleSaveBase(formName){
			// console.log(this.$refs);
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let id=this.baseForm.id?this.baseForm.id:''
					let title=this.baseForm.title
					let coverImg=this.baseForm.coverImg
					let startTime=(this.baseForm.activeTime[0])/1000
					let endTime=(this.baseForm.activeTime[1])/1000
					let content=this.baseForm.content
					let createPerson=this.baseForm.createPerson
					let personid =this.baseForm.personid 
					let communityId =this.baseForm.communityId[this.baseForm.communityId.length-1]
					let vmRead=this.baseForm.vmRead
					this.saveActivity(id,title,coverImg,startTime,endTime,content,createPerson,personid,communityId,vmRead)
				} else {
					this.$message({
						message:'请填写信息',
						type:'warning'
					})
					return false;
				}
			});
		},
		handleClick(aid) {
			if(!this.isOk1){
				this.$message({
					message:'请完成基础设置',
					type:'warning'
				})
				return false
			}
			this.active=aid
			// console.log(this.baseForm);
			
			// this.getActiveDetailById(this.currentActiveId)
		},
		//添加投票
		handleTabAdd(formName){
			this.isAddItem=false
			this.$refs[formName].validate((valid)=>{
				if(valid){
					let id=''
					let activityId=this.currentActiveId
					let title=this.itemForm.item_title
					let coverImg=this.itemForm.item_coverImg
					let content =this.itemForm.item_content
					let videoPath =this.itemForm.videoPath
					if(this.currentActivityItem){
						id=this.currentActivityItem.id
						this.saveVoteItem(id,activityId,title,coverImg,content,videoPath)
					}else{
						this.saveVoteItem(id,activityId,title,coverImg,content,videoPath)
						this.isSave=true
						this.isAddItem=false
						this.itemForm.item_title=''
						this.itemForm.item_coverImg=''
						this.itemForm.item_content=''
						this.itemForm.videoPath=''
					}
				}
			})
		},
		handleClear(){
			this.isAddItem=true
			this.isSave=false
			this.currentActivityItem=null
			this.itemForm.item_title=''
			this.itemForm.item_coverImg=''
			this.itemForm.item_content=''
			this.itemForm.code=''
			this.itemForm.videoPath=''
			
			this.tempItem.title=this.itemForm.item_title
			this.tempItem.img=this.itemForm.item_coverImg
			this.tempItem.content=this.itemForm.item_content
		},
		//删除投票
		handleTabDel(id){
			deleteItemByIdAPI({id:id}).then(res=>{
				console.log('删除投票项',res);
				if(res.status==1){
					this.$message({
						type:'success',
						message:res.msg
					})
					this.getActiveDetailById(this.currentActiveId)
				}
				
			})
		},
		//切换tab
		handleTabClick(index,item){
			this.isSave=true
			// console.log(index,'dsadsadasad');
			this.isActive=index
			this.currentActivityItem=item
			// this.itemForm.code=index+1
			this.tabs.forEach(each=>{
				if(item.id==each.id){
					this.itemForm.item_title=each.title
					this.itemForm.item_coverImg=each.coverImg
					this.itemForm.item_content=each.content
					this.itemForm.code=each.code
					this.itemForm.videoPath=each.videoPath
				}
			})
		},
		saveActivity(id,title,coverImg,startTime,endTime,content,createPerson,personid,communityId,vmRead ){
			let params={
				id:id,
				title:title,
				coverImg:coverImg,
				startTime:startTime,
				endTime:endTime,
				content:content,
				createPerson:createPerson,
				personid:personid ,
				communityId:communityId,
				vmRead:vmRead
			}
			
			saveActivityAPI(params).then(res=>{
				console.log('保存结果',res);
				if(res.status==1){
					this.$message({
						message:res.msg,
						type:'success'
					})
					this.currentActiveId=res.data
					// this.getActiveDetailById(res.data)
					this.isOk1=true
				}else{
					this.getActiveDetailById(this.currentActiveId)
				}
			})
		},
		saveVoteItem(id,activityId,title,coverImg,content,videoPath){
			let p={
				id:id,
				activityId:activityId,
				title:title,
				coverImg:coverImg,
				content:content,
				videoPath:videoPath
			}
			saveVoteItemAPI(p).then(res=>{
				console.log('保存结果',res);
				if(res.status==1){
					this.$message({
						message:res.msg,
						type:'success'
					})
					this.getActiveDetailById(this.currentActiveId)
				}
			})
		},
		getActiveDetailById(id){
			getActiveDetailByIdAPI({id:id}).then(res=>{
				console.log('test',res);
					this.currentActivity=res
					this.tabs=res.items==''?[]:res.items
					if(this.$route.query.id){
						this.tabs=res.items==''?[]:res.items
						this.baseForm.id=this.currentActiveId
						this.baseForm.title=res.title
						this.baseForm.coverImg=res.coverImg
						this.baseForm.activeTime.push((res.startTime)*1000)
						this.baseForm.activeTime.push((res.endTime)*1000)
						this.baseForm.createPerson=res.createPerson
						this.baseForm.content=res.content
						this.baseForm.communityId=res.areaPath
						this.baseForm.personid=res.personid
						this.baseForm.vmRead=res.vmRead
						
						if(this.tabs){
							this.itemForm.id=this.tabs[0].id
							this.itemForm.code=this.tabs[0].code
							this.itemForm.activityId=this.tabs[0].activityId
							this.itemForm.item_title=this.tabs[0].title
							this.itemForm.item_coverImg=this.tabs[0].coverImg
							this.itemForm.item_content=this.tabs[0].content
							this.itemForm.videoPath=this.tabs[0].videoPath
						}
						
						this.highForm.id=res.sets.id
						this.highForm.activityId=res.sets.activityId
						this.highForm.totalTimes=res.sets.totalTimes
						this.highForm.dayTimes=res.sets.dayTimes
						this.highForm.dayRevote=res.sets.dayRevote
						this.Copywritingadio=res.sets.voteButton
						this.highForm.customize=res.sets.customize
					}
			})
		},
	},
	computed:{
		areas(){
			let newAreas=[]
			this.region.forEach((item,index)=>{
				let p={
					value:item.orgid,
					label:item.orgname,
				}
				newAreas.push(p)
			})
			return newAreas
		}
	},
	watch:{
		Copywritingadio(val){
			this.isCustom=this.Copywritingadio==6?false:true
		}
	},
	created() {
		let userinfo=JSON.parse(localStorage.getItem('userInfo'))
		this.baseForm.createPerson=userinfo.personname
		this.baseForm.personid=userinfo.personid
		this.currentActiveId=this.$route.query.id
		if(this.currentActiveId){
			this.isOk1=true
			this.getActiveDetailById(this.currentActiveId)
		}
	}
}
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
	// background-color: #f0f0f2;
	// padding-bottom: 0;
}
.box-card{
	// max-height: 800px;
	min-height: 700px;
	overflow-y: auto;
	padding: 10px 10px;
	// min-height: 600px;
}
.step {
	border-bottom: 1px solid gainsboro;
}
.step1{
	display: flex;
	// justify-content: center;
	width: 100%;
}
.step2{
	padding: 20px 20px;
}
.step1-from{
	padding-top: 20px;
	padding-left: 20px;

}
.step2-tab{
	margin-bottom: 30px;
	ul{
		display: flex;
		border-bottom: 1px solid gainsboro;
		flex-wrap: wrap;
		li{
			width: 135px;
			margin: 10px 0 0;
			height: 42px;
			border-radius: 4px;
			color: rgba(16, 16, 16, 1);
			font-size: 14px;
			text-align: center;
			font-family: Microsoft Yahei;
			border: 1px solid rgba(187, 187, 187, 1);
			line-height: 42px;
			i:hover{
				margin-left: 5px;
				font-size: 24px;
				cursor: pointer;
			}
		}
		li:last-child{
			cursor: pointer;
		}
		li:hover{
			color: #ffffff;
			background-color:rgba(103, 171, 238, 1) ;
		}
	}
}
.preview{
	display: flex;
	span{
		margin-left: 50px;
		// width: 360px;
		// height: 180px;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
.isActive{
	color: #ffffff !important;
	border: 1px solid rgba(1, 129, 255, 1) !important;
	background-color:rgba(103, 171, 238, 1) ;
}
.isActiveNew{
	color: black !important;
	background-color:rgba(247, 137, 137, 1.0) ;
}
.step3-from{
	padding-top: 30px;
}
.button{
	// width: 500px;
	// display: flex;
	// justify-content: space-around;
	margin-left:45%;
}
.show-video{
	height: 300px;
	width: 400px;
}
</style>
