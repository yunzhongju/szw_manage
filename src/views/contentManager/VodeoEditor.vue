
<template>
	<div class="newseditor">
		<div class="top">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">视频编辑</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <Breadcrumb></Breadcrumb> -->
		</div>
		<div class="content">
			<el-card class="box-card">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  	<el-form-item label="视频封面" prop="img_path">
			  		<div v-if="isAudit=='0'">
			  			<el-upload
			  			  class="upload-demo"
			  				:action="domain"
			  				:data="qn"
			  			  drag
			  				:before-upload="beforUpload"
			  				:on-success="handleSuccess"
			  				:on-preview="handlePictureCardPreview"
			  			  >
			  			  <i class="el-icon-upload"></i>
			  			  <div class="el-upload__text"><em>点击上传封面视频</em></div>
			  			  <!-- <div class="el-upload__tip" slot="tip">建议图片尺寸：720px×405px ，图片大小不超过15M</div> -->
			  			</el-upload>
			  		</div>
			  		<el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
			  		<div class="isShowNewsImg">
			  			<img :src="ruleForm.img_path" alt="" style="width: 360px; height: 200px;">
			  		</div>
			  	</el-form-item>
			  	<el-form-item label="所属区域" prop="region" >
			  		<el-cascader 
			  		:props="props"
			  		v-model="ruleForm.region" 
			  		:options="areas"
			  		
			  		:placeholder="videoCurrentInfo.area?videoCurrentInfo.area:'请选择区域'"
			  		style="width: 544px;">
			  		</el-cascader>
			  	</el-form-item>
			  	<el-form-item label="文章标题" prop="title"><el-input  v-model="ruleForm.title" style="width: 544px;" placeholder="必填内容"></el-input>
			  	</el-form-item>
			  
			  	<el-form-item label="栏目" prop="column">
			  	 <el-input 
			  	 v-model="ruleForm.column" 
			  	 style="width: 544px;" 
			  	 
			  	 @focus="isShowTree=true"
			  	 placeholder="必填内容"></el-input>
			  	 <el-tree 
			  	 v-show="isShowTree"
			  	 :data="channelList"  
			  	 @node-click="handleNodeClick"></el-tree>
			  	</el-form-item>
			  	<el-form-item label="专题" prop="topic">
			  	<el-select 
			  	v-model="ruleForm.topic"
			  	multiple placeholder="请选择专题/最多三项" 
			  	@blur="handleTopic"
			  	
			  	value-key="label"
			  	style="width: 542px;">
			  	    <el-option
			  	      v-for="item in topicList"
			  	      :key="item.id"
			  	      :label="item.title"
			  	      :value="item.id">
			  	    </el-option>
			  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="标签" prop="tags">
			  	<el-select 
			  	v-model="ruleForm.tags" 
			  	multiple placeholder="请选择标签" 
			  	value-key="label"
			  	
			  	style="width: 542px;">
			  	    <el-option
			  	      v-for="item in tagList"
			  	      :key="item.id"
			  	      :label="item.title"
			  	      :value="item.id">
			  	    </el-option>
			  	</el-select>
			  	</el-form-item>
			  	<el-form-item 
					label="文章来源" 
					prop="source">
						<el-input  
						v-model="ruleForm.source" 
						style="width: 544px;" 
						placeholder="">
						</el-input>
					</el-form-item>
			  	<el-form-item 
					label="虚拟浏览量" 
					prop="pageviews">
					<el-input  
					v-model="ruleForm.pageviews" 
					style="width: 544px;" 
					placeholder="">
					</el-input></el-form-item>
			  	<el-form-item label="真实浏览量"><el-input style="width: 544px;" placeholder="只读" v-model="realReadNumber" disabled></el-input></el-form-item>
			  	<el-form-item label="视频详情" prop="filePath">
			  		<div v-if="isAudit=='0'">
			  			<UploadVideo @getVideoUrl="getVideoUrl"></UploadVideo>
			  		</div>
			  		<div class="show-video" v-show="ruleForm.filePath!=''">
			  			<video :src="ruleForm.filePath" controls></video>
			  		</div>
			  	</el-form-item>
					<el-form-item
					label="视频链接" 
					prop="">
					<el-input  
					v-model="ruleForm.filePath" 
					style="width: 544px;" 
					placeholder="视频链接">
					</el-input></el-form-item>
			  	<el-form-item>
			  		<el-button type="primary" @click="submitForm('ruleForm')" :disabled="isAudit=='1'">发布</el-button>
			  		<el-button @click="resetForm('ruleForm')" >取消</el-button>
			  	</el-form-item>
			  </el-form>
			</el-card>
			
		</div>
	</div>
</template>

<script>
import Breadcrumb from '../../components/breadcrumb.vue'
import UploadVideo from '../../components/uploadVideo.vue'
import {getAreasAPI,
				saveOrEditorVideoAPI,
				getTopicListAIP,
				getTagsListAPI,
				getChannelListAPI}
 from '../../api/api.js'
import {bus} from '../../utils/bus.js'
export default {
	components: {
		UploadVideo,
		Breadcrumb
	},
	data() {
		return {
			isAudit:'0',
			realReadNumber:'', //真实浏览量
			channelList:[], //栏目list
			topicList:[], //专题list
			tagList:[], //标签list
			isShowTree:false,
			userinfo:'', //用户信息
			videoCurrentInfo:'', //当前视频详情
			region:[], //行政区划
			domain: 'http://upload-z2.qiniup.com', //七牛云上传图片地址
			qn: {
				key: '',
				token: ''
			}, //七牛云参数
			qiniuaddr: 'https://image.sqfzzl.com/', //图片外接地址
			img_url: '', //预览图片url
			dialogImageUrl: '', 
			dialogVisible: false, //预览对话框
			disabled: false, //只读
			//提交表单
			ruleForm: { 
				img_path:'',
				region:[],
				title: '',
				column: '',
				topic:'',
				tags:'',
				source: '',
				pageviews:0,
				filePath: ''
			},
			// 表单规则
			rules: {
				img_path: [{ required: true, message: '请上传视频封面', trigger: 'blur' }],
				region: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
				title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
				column: [{ required: true, message: '请选择栏目', trigger: 'blur' }],
				topic:[{ required: true, message: '请选择专题', trigger: 'blur' }],
				source:[{ required: true, message: '请输入来源', trigger: 'blur' }],
				filePath:[{ required: true, message: '请上传视频', trigger: 'blur' }],
				pageviews:[{ required: true, message: '请上传视频', trigger: 'blur' }],
			},
			//行政区划动态加载
			 props: {
				 checkStrictly: true,
				 lazy: true,
				 lazyLoad: this.lazyLoad
			},
		 options: [],
		 channelId:'', //栏目id
		 communityId:'' ,//区域id
		};
	},
	methods: {
		//获取视频链接
		getVideoUrl(url){
			console.log('视频url',url);
			this.ruleForm.filePath=url
		},
		//栏目选取节点
		handleNodeClick(node){
			this.ruleForm.column=node.label
			this.channelId=node.value
			this.isShowTree=false
			console.log(node);
		},
		//七牛云上传成功
		handleSuccess(res, file, filelist) {
			this.img_url = this.qiniuaddr + res.key;
			this.dialogImageUrl=this.img_url
			this.ruleForm.img_path=this.img_url
			this.dialogVisible=true
			console.log('imgurl', this.img_url);
		},
		//上传之前
		beforUpload(file) {
			var timestamp = new Date().getTime();
			this.qn.key = `${timestamp}/${file.name}`;
			console.log('图片的name',this.qn.key);
		},
		//提交表单
		submitForm(formName) {
			console.log('add news form:',this.ruleForm);
			let region=this.ruleForm.region
			let p={
				id:this.videoCurrentInfo?this.videoCurrentInfo.id:'',
				specialTopicId:this.ruleForm.topic?this.handleTags(this.ruleForm.topic):'',
				channelId:this.videoCurrentInfo?this.videoCurrentInfo.channelId:this.channelId,
				title:this.ruleForm.title,
				imagePath:this.ruleForm.img_path,
				source:this.ruleForm.source,
				filePath:this.ruleForm.filePath,
				memberId :this.videoCurrentInfo?this.videoCurrentInfo.memberId:this.userinfo.personid,
				communityId :region.length!=0?region[region.length-1]:this.communityId,
				readNumber:this.ruleForm.pageviews,
				tags:this.handleTags(this.ruleForm.tags),
			}
			console.log('提交的参数',p);
			// saveOrEditorVideoAPI(p).then(res=>{
			// 	console.log('添加视频结果',res);
			// })
			// console.log(this.$refs[formName]);
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log(this.ruleForm);
					saveOrEditorVideoAPI(p).then(res=>{
						console.log('添加视频结果',res);
						this.$message({
						          message: '添加视频成功',
						          type: 'success'
						        });
						this.$router.push('/home/videomanage')
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
			bus.newsCurrentInfo=''
			this.$router.push('/home/videomanage')
		},
		handleTopic(){
			let topiclist=this.ruleForm.topic
			if(topiclist.length>3){
				this.$message('专题最多不超过3个')
				return 
			}
			
		},
		//图片预览
		handlePictureCardPreview(file) {
			this.dialogImageUrl = this.img_url;
			this.dialogVisible = true;
		},
		// 获取编辑器内容
		getContent(event) {
			this.ruleForm.content=event;
			console.log(event);
		},
		//获取token
		getToken(){
			this.$http({
				url: '/token/getUpToken',
				method: 'get',
				params: {
					type: 'image'
				}
			}).then(res => {
				// console.log('请求数据token', res);
				this.qn.token = res.data.data;
			});
		},
		//获取行政区划
		getAreas(pid=''){
			let p={parentId:pid}
			getAreasAPI(p).then(res=>{
				this.region=res
				console.log('行政区划',res);
			})
		},
		//加载方法
		lazyLoad(node, resolve) {
			setTimeout(() => {
				this.getProvence(node, resolve)
			}, 1000)
		},
		//获取行政区划
		getProvence(node, resolve){
			console.log('节点',node);
			getAreasAPI({parentId:node.data?node.data.value:''}).then(res=>{
				 const nodes = res.map(item=>({
					 value: item.orgid, // 
					 label: item.orgname,
					 leaf: node.level >= 5 // 5层级
				 }))
				 resolve(nodes)
			})
		},
		// 获取当前视频详情
		getCurrentVideoInfo(){
			if(bus.videoCurrentInfo){
				this.videoCurrentInfo=bus.videoCurrentInfo
				this.ruleForm.img_path=this.videoCurrentInfo.imagePath
				this.ruleForm.title=this.videoCurrentInfo.title
				this.ruleForm.region=this.videoCurrentInfo.areaPath
				this.ruleForm.column=this.videoCurrentInfo.channelInfo.name
				this.ruleForm.topic=this.handleNewsInfo(this.videoCurrentInfo.topicsInfo)
				this.ruleForm.source=this.videoCurrentInfo.source
				this.ruleForm.pageviews=this.videoCurrentInfo.readNumber
				this.ruleForm.filePath=this.videoCurrentInfo.filePath
				this.ruleForm.tags=this.videoCurrentInfo.tagsInfo?this.handleNewsInfo(this.videoCurrentInfo.tagsInfo):''
				this.realReadNumber=this.videoCurrentInfo.realReadNumber
				this.communityId=this.videoCurrentInfo.community
				this.isAudit=this.videoCurrentInfo==''?'0':this.videoCurrentInfo.audit
			}
		},
		//处理tags
		handleTags(list){
			let s=list
			if(list==null){
				return ''
			}else{
				s=list[0]
			}
			let symbel=';'
			for(let i =1;i<list.length;i++){
				if(list[i].id){
					s+=symbel+list[i].id
				}else{
					s+=symbel+list[i]
				}
			}
			return s
		},
		//处理当前新闻的tags and topic
		handleNewsInfo(list){
			let arr=[]
			if(list!=null){
				list.forEach(item=>{
					if(item!=null){
						arr.push(item.id)
					}
				})
				return arr
			}else{
				return arr
			}
			return arr
		},
		//获取栏目列表
		getChannelList(channelType){
			let p={
				channelType:channelType
			}
			getChannelListAPI(p).then(res=>{
				console.log('channelList',res);
				this.channelList=res.children
			})
		},
		getTopicList(){
			let p={
				pageSize:20,
				pageNumber:1
			}
			getTopicListAIP(p).then(res=>{
				console.log('topicList',res);
				this.topicList=res.list
			})
		},
		getTagList(){
			let p={
				type:2,
				pageSize:20,
				pageNumber:1
			}
			getTagsListAPI(p).then(res=>{
				console.log('taglist',res);
				this.tagList=res.list
			})
		}
	},
	
	created() {
		this.userinfo = bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
		// console.log('userInfo0',this.userinfo);
		// console.log('userInfo1',bus.userInfo);
		// console.log('userInfo2',JSON.parse(localStorage.getItem('userInfo')));
		// this.getAreas()
		this.getToken()
		this.getCurrentVideoInfo()
		this.getChannelList('2')
		this.getTopicList()
		this.getTagList()
	},
	destroyed() {
		this.ruleForm={ 
				img_path:'',
				region:'',
				title: '',
				column: '',
				topic:'',
				tags:'',
				source: '',
				pageviews:'',
				content: ''
			}
			this.videoCurrentInfo=''
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
	}
};
</script>

<style lang="less" scoped>
.newseditor {
	.content {
		margin-top: 40px;
		padding-right: 100px;
		// 表单
		.form {
			.form-upload {
				margin-left: 10px;
				margin-top: 30px;
			}
			p {
				color: rgba(16, 16, 16, 1);
				font-size: 14px;
				text-align: left;
				span {
					margin-right: 42px;
				}
			}
		}
		.head {
			display: flex;
			justify-content: space-between;
			padding-right: 80px;
			ul {
				display: flex;
				li {
					margin-left: 5px;
				}
			}
		}
	}
}

// 加红*
.addRedStar:before {
	content: '*';
	color: red;
	font-size: 18px;
}
.isShowNewsImg{
	position: relative;
	width: 554px;
	i{
		position: absolute;
		top: -30px;
		right: 0;
		height: 30px;
		width: 30px;
		color: red;
		border-radius: 50%;
		background-color: lightgray;
		font-size: 24px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}
}
.show-video{
	// padding: 10px 10px;
	video{
		width: 360px;
		height: 180px;
	}
}
</style>
