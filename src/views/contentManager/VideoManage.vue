<template>
	<div class="news-manage">
		<div class="top">
			<Breadcrumb></Breadcrumb>
		</div>

		<div class="content">
			<el-card shadow="always" class="box-card">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="发布" name="first">
						<div class="serach">
							<el-button 
								@click="showTree = !showTree" 
								type="primary"
								size="small"
								style="margin-left: 16px;">
							  筛选
							</el-button>
							<div>
								<el-button 
									type="primary" 
									icon="el-icon-plus" 
									size="small" 
									@click="addVideo">添加视频</el-button>
							</div>
							<ul>
								<li><el-input 
									v-model="inputSerach" 
									placeholder="搜索关键词" 
									autosize 
									size="small"
									clearable></el-input></li>
								<li><el-button 
									type="primary" 
									icon="el-icon-search"
									size="small"
									@click="handleSerach">搜索</el-button></li>
							</ul>
						</div>
						<div class="middle">
							<div style="margin-top: 20px;" class="middle-left">
								<el-collapse-transition>
									<div v-show="showTree">
										<div class="transition-box">
											<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
										</div>
									</div>
								</el-collapse-transition>
							</div>
							<div class="right">
								<!-- 数据列表 -->
								<el-table 
								:data="tableData" 
								 style="width: 100%" 
								:row-class-name="tableRowClassName" 
								 v-loading="loading"
								 max-height="580">
									<el-table-column prop="head" label="封面" width="180" align="center">
										<template slot-scope="scope">
											<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.imagePath"></el-avatar></div>
											<!-- <img style="width: 122px; height: 93px;" :src="scope.row.imagePath" alt /> -->
										</template>
									</el-table-column>
									<el-table-column 
										prop="info" 
										label="标题" 
										align="center">
										<template slot-scope="scope">
											<p>{{scope.row.title}}</p>
										</template>
									</el-table-column>
									<el-table-column 
										prop="date" 
										align="center"
										label="所属区域" >
										<template slot-scope="scope">
											<p>{{scope.row.area?scope.row.area:'无'}}</p>
										</template>
									</el-table-column>
									<el-table-column 
										prop="date" 
										align="center"
										label="交互信息">
										<template slot-scope="scope">
											<ul>
												<li>浏览量:{{scope.row.readNumber}}</li>
												<li>真实浏览量:{{scope.row.readNumber}}</li>
												<li>点赞量:{{scope.row.praiseNumber}}</li>
												<li>评论量:{{scope.row.commentNumber}}</li>
												<li>分享量:{{scope.row.shareNumber}}</li>
											</ul>
										</template>
									</el-table-column>
									<el-table-column 
										prop="phone" 
										align="center"
										label="发布信息">
										<template slot-scope="scope">
											<ul>
												<li>发布时间:{{scope.row.addTime |timeFormate}}</li>
												<li>发布人:{{scope.row.personname}}</li>
											</ul>
										</template>
									</el-table-column>
									<el-table-column 
										prop="phone" 
										align="center"
										label="来源">
										<template slot-scope="scope">
											<span>{{scope.row.source}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="option" label="操作" fixed="right" width="180">
										<template slot-scope="scope">
											<ul class="options">
												<li @click="handleDel(scope.row.id)">
													<i class="el-icon-delete"></i>
													<span>删除</span>
												</li>
											
												<li @click="handleEdi(scope.row.id)">
													<i class="el-icon-edit"></i>
													<span>详情</span>
												</li>
												<li @click="handlePreView">
													<i class="el-icon-view"></i>
													<span>预览</span>
												</li>
												<li @click="handleMove(scope.row.id,scope.row.channelId)">
													<i class="el-icon-edit-outline"></i>
													<span>复制</span>
												</li>
												<li @click="handleUpd(scope.row.id)">
													<i class="el-icon-rank"></i>
													<span>移动</span>
												</li>
												<li @click="handlePageView(scope.row.id)">
													<i class="el-icon-document"></i>
													<span>改数</span>
												</li>
											</ul>
										</template>
									</el-table-column>
								</el-table>
								<Footer @currentPage="getCurrentPage" :total="pageSize"></Footer>
							</div>
						</div>
					
					</el-tab-pane>
					<el-tab-pane label="审核" name="second">
						<ul class="comm-top">
							<li>
								<el-radio v-model="tabradio" label="0" @change="handleRadio">待审核</el-radio>
								<el-radio v-model="tabradio" label="1" @change="handleRadio">已通过</el-radio>
								<el-radio v-model="tabradio" label="2" @change="handleRadio">未通过</el-radio>
							</li>
							<li><SerachK @input="handleSerachaudit"></SerachK></li>
						</ul>
						<!-- 数据列表 -->
						<el-table
						:data="tableData"
						 style="width: 100%" 
						:row-class-name="tableRowClassName" 
						 v-loading="loading"
						 max-height="580">
							<el-table-column prop="head" label="封面" width="180" align="center">
								<template slot-scope="scope">
										<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.imagePath"></el-avatar></div>
									<!-- <img style="width: 122px; height: 93px;" :src="scope.row.imagePath" alt /> -->
								</template>
							</el-table-column>
							<el-table-column 
								prop="info" 
								label="标题" 
								align="center">
								<template slot-scope="scope">
									<p>{{scope.row.title}}</p>
								</template>
							</el-table-column>
							<el-table-column 
								prop="date" 
								align="center"
								label="所属区域" >
								<template slot-scope="scope">
									<p>{{scope.row.area?scope.row.area:'无'}}</p>
								</template>
							</el-table-column>
							<el-table-column 
								prop="date" 
								align="center"
								label="交互信息">
								<template slot-scope="scope">
									<ul>
										<li>浏览量:{{scope.row.readNumber}}</li>
										<li>真实浏览量:{{scope.row.readNumber}}</li>
										<li>点赞量:{{scope.row.praiseNumber}}</li>
										<li>评论量:{{scope.row.commentNumber}}</li>
										<li>分享量:{{scope.row.shareNumber}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column 
								prop="phone" 
								align="center"
								label="发布信息">
								<template slot-scope="scope">
									<ul>
										<li>发布时间:{{scope.row.addTime |timeFormate}}</li>
										<li>发布人:{{scope.row.personname}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column 
								prop="phone" 
								align="center"
								label="来源">
								<template slot-scope="scope">
									<span>{{scope.row.source}}</span>
								</template>
							</el-table-column>
							<el-table-column 
								prop="option" 
								label="操作">
								<template slot-scope="scope">
									<ul class=" other-opt">
										<li v-if="userInfo.role=='szw_admin'&&tabradio=='0'" @click="handleReview(scope.row.id)">
											<i class=""></i>
											<span>审核</span>
										</li>
										<li @click="handleEdi(scope.row.id)" v-if="tabradio=='0' || tabradio=='2'">
											<i class=""></i>
											<span>编辑</span>
										</li>
										<li v-if="tabradio!='0'" @click="handleRecodr(scope.row.id)">
											<i class=""></i>
											<span>审核记录</span>
										</li>
										<li v-if="userInfo.role=='szw_admin'&&tabradio=='1'" @click="handleReview(scope.row.id)">
											<i class=""></i>
											<span>重新审核</span>
										</li>
									</ul>
								</template>
							</el-table-column>
						</el-table>
						<Footer @currentPage="getApprovCurrentPage" :total="pageSize"></Footer>
					</el-tab-pane>
				</el-tabs>
				
			</el-card>
		</div>
		
		<!-- 修改浏览量对话框 -->
		<el-dialog title="修改浏览量" :visible.sync="showPageView" width="20%" center :before-close="handleClose">
			<el-form :model="pageViewsForm" :rules="rules" ref="ruleForm">
				<el-form-item prop="pageViews"><el-input v-model="pageViewsForm.pageViews" placeholder="请输入浏览量"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showPageView = false">取 消</el-button>
				<el-button type="primary" @click="onReadNumberSubmit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 复制对话框 -->
		<el-dialog title="请选择栏目" :visible.sync="ismove" width="20%" center :before-close="handleClose">
			<div class="move">
				<el-tree :data="data" :props="defaultProps" @node-click="onNodeClick" highlight-current></el-tree>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ismove = false">取 消</el-button>
				<el-button type="primary" @click="onSureMove">确 定</el-button>
			</span>
		</el-dialog>
		
		<!-- //移动对话框 -->
		<el-dialog
		  title="请选择栏目"
		  :visible.sync="isCopy"
		  width="30%"
			center
		  :before-close="handleClose">
		  <div class="move">
				<el-tree :data="data" :props="defaultProps" @node-click="onNodeClick" highlight-current></el-tree>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isCopy = false">取 消</el-button>
		    <el-button type="primary" @click="moveSubmit">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 审核对话框 -->
		<el-dialog title="审核" :visible.sync="reviewVisible" width="30%" :before-close="handleClose" center>
			<div class="audit">
				<div class="head">
					<span>评审结果</span>
					<el-radio v-model="radio" label="2">未通过</el-radio>
					<el-radio v-model="radio" label="1">通过</el-radio>
				</div>
				<div class="reason">
					<span>未通过原因</span>
					<el-input type="textarea" :rows="2" placeholder="请输入未通过原因" v-model="textarea"></el-input>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="reviewVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit">确 定</el-button>
			</span>
		</el-dialog>
		
		<!-- 审核记录对话框 -->
		<el-dialog
		  title="审核记录"
		  :visible.sync="recodringVisible"
		  width="40%"
			center
		  :before-close="handleClose">
		  <div>
				<el-table :data="approveList">
					<el-table-column property="approveTime" label="日期" width="150">
						<template slot-scope="scope">
							<p>{{scope.row.approveTime |timeFormate}}</p>
						</template>
					</el-table-column>
					<el-table-column property="approvePerson" label="审核人"></el-table-column>
					<el-table-column property="approveStatus" label="状态"></el-table-column>
					<el-table-column property="approveDesc" label="原因"></el-table-column>
				</el-table>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="recodringVisible = false">取 消</el-button>
		    <el-button type="primary" @click="recodringVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import SerachL from '../../components/serachL.vue';
import SerachK from '../../components/serachK.vue';
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue'
import {getVideoListAPI,
				getTopicListAIP,
				getVideoDetailAPI,
				approveVideoAPI,
				modifyVideoVmReadNumberAPI,
				getChannelListAPI,
				deleteVideoByIdAPI,
				copyVideoChannelAPI,
				getApproveRecordsAPI,
				moveVideoChannelAPI} 
from '../../api/api.js'
import {bus} from '../../utils/bus.js'
export default {
	data() {
		return {
			currentNewsChannelId:'',
			userInfo:'', //用户信息
			channelType:"2",
			isCopy:false,
			tabradio:'0',
			isdelete:false, //是否删除
			currentNewsId:'', //当前新闻id
			checkList: [], //移动多选
			topicList:[],
			pageSize:0,
			recodringVisible:false, //审核记录对话框
			reviewVisible:false, //审核对话框
			textarea:'', //未通过原因
			showTree: false, //是否展示筛选树
			pageViewsForm: { pageViews: '' }, //修改浏览量
			rules: { pageViews: [{ required: true, message: '请输入浏览量', trigger: 'blur' }] }, //校验规则
			showPageView: false, //是否显示修改浏览量对话框
			inputSerach:'', //搜索内容
			activeName: 'first', 
			ismove: false, //移动对话框
			tableData: [], //新闻数据
			radio: '0',
			moveRadio: '1',
			loading: true,
			data: [], //栏目树
			defaultProps: {
				children: 'children',
				label: 'label'
				},
			currentColumnId:"2",
			moveChannelId:'',
			approveList:[] //审核记录列表
		};
		
	},
	methods: {
		//添加新闻
		addVideo(){
			bus.$emit('getVideoCurrentInfo','')
			this.$router.push('/home/videoeditor')
		},
		//移动栏目提交
		moveSubmit(){
			let p={
				id:this.currentNewsId,
				channelId:this.moveChannelId
			}
			moveVideoChannelAPI(p).then(res=>{
				console.log('移动ok',res);
				this.getVideoList('','2',1,10,1)
				this.isCopy=false
			})
		},
		handleSerachaudit(text){
			this.getVideoList(text,'',this.tabradio,10,1)
		},
		//获取新闻列表
		getVideoList(searchContent,channelId,audit ,pageSize,pageNumber){
			let p={
				memberId:this.userInfo.personid,
				searchContent:searchContent,
				channelId:channelId,
				audit:audit,
				recommend:'',
				pageSize:pageSize,
				pageNumber:pageNumber
			}
			getVideoListAPI(p).then(res=>{
				this.tableData=res.list
				this.pageSize=res.pageSize*res.totalPage
				this.loading=false
				console.log('视频列表',res);
			})
		},
		//确定复制
		onSureMove(){
			if(this.currentColumnId==this.moveChannelId){
				this.$message('不能与原来栏目相同！')
				return
			}
			let p={
				id:this.currentNewsId,
				channelId:this.moveChannelId
			}
			copyNewChannelAPI(p).then(res=>{
				console.log('copy ok',res);
				this.ismove=false
			})
		},
		//审核记录
		handleRecodr(id){
			this.recodringVisible=true
			let p={
				contentId:id,
				pageSize:'10',
				pageNumber:'1',
				type:'sp'
			}
			getApproveRecordsAPI(p).then(res=>{
				console.log('审核记录',res);
				this.approveList=res.list.reverse()
				
			})
			console.log('recodring');
		},
		//提交审核
		handleSubmit(){
			let p={
				id:this.currentNewsId,
				audit:this.radio,
				audit_desc:this.textarea,
				approvePerson:this.userInfo.personname
			}
			console.log(p);
			approveVideoAPI(p).then(res=>{
				console.log('审核结果',res);
				if(res.status==1){
					this.getVideoList('','',this.tabradio,10,1)
					this.reviewVisible=false
				}
			})
		},
		//审核单选
		handleRadio(label){
			console.log(label);
			this.getVideoList('','',label,10,1)
		},
		// 审核
		handleReview(id){
			this.reviewVisible=true
			this.currentNewsId=id
			console.log(id);
		},
		// 点击树节点
		 handleNodeClick(data) {
			 let id=data.value
			 this.currentColumnId=id 
			 this.getVideoList('',id,1,10,1)
			// console.log(data);
		},
		onNodeClick(node){
			console.log(node);
			this.moveChannelId=node.value
		},
		//搜索
		handleSerach(){
			console.log(this.inputSerach);
			let text=this.inputSerach
			this.getVideoList(text,'',1,10,1)
		},
		//获取下一页
		getCurrentPage(val){
			console.log(val);
			let index=val
			this.loading=true
			this.getVideoList('',this.currentColumnId,'1',10,index)
		},
		//获取下一页
		getApprovCurrentPage(val){
			console.log(val);
			let index=val
			this.loading=true
			this.getVideoList('','',this.tabradio,10,index)
		},
		// 预览
		handlePreView() {
			console.log('preview');
		},
		// 移动
		handleMove(id,cid) {
			this.ismove = true;
			this.currentNewsId=id
			this.currentNewsChannelId=cid
		},
		
	  getTopicList(){
			 let p={
			 	pageSize:'20',
			 	pageNumber:'1'
			 }
			 getTopicListAIP(p).then(res=>{
			 	console.log(res);
			 	this.checkList=res.list
			 })
		 },
		// 关闭对话框
		handleClose(done) {
			done();
		},
		// 修改浏览量
		handlePageView(id) {
			this.currentNewsId=id
			this.showPageView = true;
		},
		onReadNumberSubmit(){
			let p={
				id:this.currentNewsId,
				readNumber:this.pageViewsForm.pageViews
			}
			modifyVideoVmReadNumberAPI(p).then(res=>{
				if(res.status==1){
					console.log('修改浏览量结果',res);
					this.getVideoList('','2','1',10,1)
					this.showPageView=false
				}
			})
		},
		// 切换tab
		handleClick(tab, event) {
			console.log(tab);
			if(tab.index=='0'){
				this.getVideoList('','',1,10,1)
			}else{
				this.tabradio="0"
				this.getVideoList('','',this.tabradio,10,1)
			}
		},
		tableRowClassName() {
			console.log('tablerow');
		},
		// 删除操作
		handleDel(id) {
			console.log(id);
			// this.currentNewsId=id
			// this.isdelete=true
			let params={
				id:id
			}
			this.$confirm('确定删除该视频, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteVideoByIdAPI(params).then(res => {
						if (res.status == 1) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getVideoList('',this.currentColumnId,1,10,1)
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		// 编辑操作
		handleEdi(id) {
			console.log("视频id",id);
			let p={id:id}
			getVideoDetailAPI(p).then(res=>{
				console.log('视频详情',res);
				bus.$emit('getVideoCurrentInfo',res)
				this.$router.push('/home/videoeditor')
			})
		},
		// 修改浏览量
		handleUpd(id) {
			this.isCopy=true
			this.currentNewsId=id
		},
		// 屏蔽
		onShield() {
			console.log('shield');
		},
		// 详情
		onGetInfo() {
			console.log('info');
		},
		getChannelList(){
			getChannelListAPI().then(res=>{
				console.log('栏目列表',res);
				// this.data=res
			})
		},
		getChannelList(channelId){
			getChannelListAPI({channelType:channelId}).then(res=>{
				this.data=res.children
				console.log(res,'dsdsd');
			})
		},
	},
	created() {
		this.userInfo = bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
		this.getVideoList('','',1,10,1)
		// this.getTopicList()
		this.getChannelList('2')
	},
	computed:{
		handleChannle(){
			let list=this.data
			let newList=[]
			list.forEach(item=>{
				let p={
					label:item.name,
					value:item.channelid,
					children:[]
				}
				item.subChannel.forEach(each=>{
					let p2={
						label:each.name,
						value:each.channelid,
						children:[]
					}
					p.children.push(p2)
				})
				newList.push(p)
			})
			return newList
		}
	},
	components: {
		SerachL,
		SerachK,
		Footer,
		Breadcrumb
	},
	filters: {
		timeFormate(time) {
			let timer = new Date(time*1000);
			let y = timer.getFullYear();
			let m = timer.getMonth() + 1 < 10 ? '0' + (timer.getMonth() + 1) : timer.getMonth() + 1;
			let d = timer.getDate() > 10 ? timer.getDate() : '0' + timer.getDate();
			let h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
			let mint = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
			return y + '-' + m + '-' + d + ' ' + h + ':' + mint;
		}
	},
};
</script>

<style lang="less" scoped>
.content {
	// border: 10px solid #f0f0f2;
	margin-top: 40px;
	// padding-left: 20px;
}
// 操作
.options {
	color: rgba(0, 105, 242, 0.88);
	font-size: 16px;
	text-align: left;
	width: 180px;
	display: flex;
	flex-wrap: wrap;
	li {
		width: 60px;
		margin: 5px 5px;
		cursor: pointer;
	}
}

.comm-top {
	display: flex;
	justify-content: space-between;
}

.other-opt {
	color: rgba(0, 105, 242, 0.88);
	font-size: 16px;
	width: 110px !important;
	li{
		width:80px !important;
		margin: 5px 5px;
		cursor: pointer;
	}
	
}
// 移动对话框
.move {
	display: flex;
	justify-content: center;
	.move-group{
		display: flex;
		flex-direction: column;
	}
	
	li {
		margin: 5px 0;
	}
}
// 搜索
.serach {
	display: flex;
	justify-content: space-between;
	ul {
		display: flex;
		li {
			margin-right: 50px;
		}
		li:nth-child(1) {
			width: 404px;
		}
	}
	div {
		flex: 1;
		margin-left: 20px;
	}
}
.middle{
	display: flex;
	.middle-left{
		overflow-x: auto;
	}
	.right{
		flex: 1;
		overflow-x: auto;
	}
}
.transition-box {
	margin-bottom: 10px;
	// width: 158px;
	border-radius: 4px;
	// background-color: #409EFF;
	text-align: center;
	color: #fff;
	padding: 30px 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
.box-card{
	// overflow-x: scroll !important;
	max-height: 750px;
}
.audit {
	.head {
		span {
			margin-right: 15px;
			padding-left: 10px;
		}
	}
	.reason {
		display: flex;
		margin-top: 20px;
		span {
			width: 100px;
		}
	}
}
//审核记录
.recording{
	li{
		margin-top: 13px;
	}
}
</style>
