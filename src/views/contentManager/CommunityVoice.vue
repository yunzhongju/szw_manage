<template>
	<div>
		<div>
			<Breadcrumb></Breadcrumb>
			<div class="content">
				<el-card shadow="always" class="box-card">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<ul class="comm-top">
								<li>
									<el-radio-group v-model="value" @change="handleChange">
										<el-radio :label="1">通过</el-radio>
										<el-radio :label="2">未通过</el-radio>
										<el-radio :label="0">待审核</el-radio>
									</el-radio-group>
									<!-- <el-select v-model="value" placeholder="请选择" @change="handleChange">
										<el-option 
										v-for="item in options" 
										:key="item.value" 
										:label="item.label" 
										:value="item.value"></el-option>
									</el-select> -->
								</li>
								<li>
									<el-row>
									  <el-col :span="24"><div class="grid-content bg-purple-dark" style="display: flex;justify-content: flex-end;">
											 <el-input 
												v-model="searchValue" 
												placeholder="请输入标题" 
												clearable
												size="small"
												style="width: 200px;margin-right: 30px;"></el-input>
											 <el-button 
												type="primary" 
												size="small"
												icon="el-icon-search" 
												@click="handleSearch">搜索</el-button>
										</div></el-col>
									</el-row>
									<!-- <SerachK @input="handleSearch"></SerachK> -->
									</li>
							</ul>
						</div></el-col>
					</el-row>
					<el-row class="margtop20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<!-- 数据列表 -->
							<el-table 
							:data="tableData" 
							style="width: 100%" 
							height="580"
							border
							:row-class-name="tableRowClassName" 
							v-loading="loading">
							<el-table-column prop="title" label="标题" align="center">
							</el-table-column>
								<el-table-column prop="info" label="基本信息" width="300" align="center">
									<template slot-scope="scope">
										<p style="margin-bottom: 10px;">{{scope.row.content}}</p>
										<span>{{scope.row.channelName}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="date" align="center" label="交互信息">
									<template slot-scope="scope">
										<ul>
											<li>浏览量:{{scope.row.readNumber}}</li>
											<li>点赞量:{{scope.row.praiseNumber}}</li>
											<li>评论量:{{scope.row.commentNumber}}</li>
											<li>分享量:{{scope.row.shareNumber}}</li>
										</ul>
									</template>
								</el-table-column>
								<el-table-column prop="phone" align="center" label="发布信息">
									<template slot-scope="scope">
										<ul>
											<li>发布时间:{{scope.row.addTime |timeFormate}}</li>
											<li>发布人:{{scope.row.showName}}</li>
										</ul>
									</template>
								</el-table-column>
								<el-table-column prop="phone" align="center" label="来源">
									<template slot-scope="scope">
										<span>{{scope.row.source}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="option" align="center" label="操作">
									<template slot-scope="scope">
										<el-button
										  v-if="value==0"
											@click="handleApproVoice(scope.row.id)"
											type="text">审核</el-button>
										<el-button
										  v-if="value==1"
											@click="handleDel(scope.row.id)"
											type="text">删除</el-button>
										<el-button
										  v-if="value!=0"
											@click="handleApproveList(scope.row.id)"
											type="text">记录</el-button>
										<el-button
										  v-if="userinfo.role=='szw_admin' && value==1"
											@click="handleApproVoice(scope.row.id)"
											type="text">审核</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div></el-col>
					</el-row>
					<div id="footer"><Footer @currentPage="getCurrentPage" :total="pageSize"></Footer></div>
				</el-card>
			</div>
			
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
			
			
			<!-- 审核对话框 -->
			<el-dialog title="审核记录" :visible.sync="reviewVisible" width="30%" :before-close="handleClose" center>
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
		</div>
	</div>
</template>

<script>
import SerachL from '../../components/serachL.vue';
import SerachK from '../../components/serachK.vue';
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue'
import {bus} from '../../utils/bus.js'
import {getCommunityVoiceListAPI,
				getApproveRecordsAPI,
				approveCommunityVoiceAPI,
				deleteCommunityVoiceAPI} from '../../api/api.js'
export default {
	data() {
		return {
			textarea:'',
			searchValue:'',
			radio:'1',
			currentId:'',
			reviewVisible:false,
			approveList:[],
			recodringVisible:false,
			userinfo:'',
			pageSize:0,
			tableData: [],
			options: [
				{
					value: '1',
					label: '通过'
				},
				{
					value: '2',
					label: '未通过'
				},
				{
					value: '0',
					label: '待审核'
				}
			],
			value:1,
			loading: false
		};
	},
	methods: {
		handleSubmit(){
			let p={
				id:this.currentId,
				audit:this.radio,
				approvePerson:this.userinfo.personname,
				auditDesc:this.textarea
			}
			approveCommunityVoiceAPI(p).then(res=>{
				this.reviewVisible=false
				this.getCommunityVoiceList('',this.value,1)
			})
		},
		handleApproVoice(id){
			this.reviewVisible=true
			this.currentId=id
		},
		handleApproveList(id){
			this.recodringVisible=true
			let p={
				contentId:id,
				type:'sqzs',
				pageSize:10,
				pageNumber:1
			}
			getApproveRecordsAPI(p).then(res=>{
				console.log('审核',res);
				this.approveList=res.list
			})
		},
		handleChange(val){
			this.getCommunityVoiceList('',val,1)
		},
		handleSearch(val){
			this.getCommunityVoiceList(this.searchValue,this.value,1)
		},
		getCurrentPage(val){
			this.getCommunityVoiceList('',this.value,val)
		},
		handleClose(done) {
			done();
		},
		
		tableRowClassName() {
			console.log('tablerow');
		},
		// 删除操作
		handleDel(id) {
			this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteCommunityVoiceAPI({id:id}).then(res=>{
					this.getCommunityVoiceList('',this.value,1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		// 编辑操作
		handleEdi() {
			console.log('edi');
		},

		// 详情
		onGetInfo() {
			console.log('info');
		},
		getCommunityVoiceList(searchContent,audit,pageNumber){
			let p={
				searchContent:searchContent,
				audit:audit,
				pageNumber:pageNumber,
				pageSize:10
			}
			getCommunityVoiceListAPI(p).then(res=>{
				console.log('voice',res);
				this.tableData=res.list
				this.pageSize=res.totalRow
			})
		},
	},
	created() {
		this.getCommunityVoiceList('',1,1)
		this.userinfo =bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
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
	.margtop20{
		margin-top: 20px;
	}
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
	width: 160px;
	display: flex;
	flex-wrap: wrap;
	li {
		margin: 5px 5px;
		cursor: pointer;
	}
}

.comm-top {
	display: flex;
	justify-content: space-between;
	li{
		width: 50%;
	}
}

.other-opt {
	width: 110px !important;
}
// 移动对话框
.move {
	display: flex;
	flex-direction: column;
	align-items: center;
	li {
		margin: 5px 0;
	}
}
.box-card{
	min-height: 750px;
	max-height: 800px;
	position: relative;
	#footer{
		position: absolute;
		bottom: 20px;
		right: 30px;
	}
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
</style>

