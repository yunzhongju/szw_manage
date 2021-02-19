<template>
	<div class="commmanager">
		<div class="top"><Breadcrumb></Breadcrumb></div>
		<div class="content">
			<el-card shadow="always" class="box-card">
				<el-tabs v-model="activeName">
					<el-tab-pane label="机构列表" name="first">
						<ul class="head">
							<li>
								<el-input v-model="input" placeholder="请输入机构名称" clearable></el-input>
							</li>
							<li>
								<el-button type="primary" @click="handleSerach">搜索</el-button>
							</li>
							<li>
								<el-select 
								v-model="pull.city"
								@change="handleNextCounty"
								clearable
								@clear="pull.city=''"
								 placeholder="城市">
									<el-option 
									v-for="item in citys" 
									:key="item.value" 
									
									:label="item.label" 
									:value="item.value">
									</el-option>
								</el-select>
							</li>
							<li>
								<el-select 
								v-model="pull.County" 
								clearable
								@clear="pull.County=''"
								@change="handleNextStreet"
								placeholder="县区">
									<el-option 
										v-for="item in county" 
										:key="item.orgid" 
										:label="item.orgname" 
										:value="item.orgid"></el-option>
								</el-select>
							</li>
							<li>
								<el-select 
								v-model="pull.street"
								clearable
								@clear="pull.street=''"
								@change="handleNextCommunity"
								 placeholder="街道">
									<el-option 
										v-for="item in street" 
										:key="item.orgid" 
										:label="item.orgname" 
										:value="item.orgid"></el-option>
								</el-select>
							</li>
							<li>
								<el-select 
								v-model="pull.community" 
								placeholder="社区" 
								style="width: 100%;"
								@change="handleNextzero"
								clearable>
									<el-option 
										v-for="item in communities" 
										:key="item.orgid" 
										:label="item.orgname" 
										:value="item.orgid"></el-option>
								</el-select>
							</li>
							<li>
								 <li>
									 <el-select 
									 v-model="status_value" 
									 @change="handleChangeState"
									 placeholder="请选择">
									    <el-option
									      v-for="item in status"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
								 </li>
							</li>
							<li>
								<el-button type="primary" @click="handleAddOrg">添加</el-button>
							</li>
						</ul>
						<!-- 数据表格 -->
						<el-table 
							:data="tableData" 
							style="width: 100%" 
							height="580"
							:row-class-name="tableRowClassName">
							<el-table-column 
								prop="head" 
								label="封面" 
								align="center" 
								width="180">
								<template slot-scope="scope">
									<div class="block">
										<el-avatar shape="square" :size="100" :src="scope.row.coverImg"></el-avatar>
									</div>
								</template>
							</el-table-column>
							<el-table-column 
								prop="info" 
								label="基本信息" 
								align="center">
								<template slot-scope="scope">
									<ul class="address">
										<li>{{scope.row.title}}</li>
										<li>{{scope.row.area}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column 
								prop="date" 
								label="营业执照" 
								align="center">
								<template slot-scope="scope">
									<div class="block">
										<el-avatar shape="square" :size="100" :src="scope.row.coverPhoto"></el-avatar>
									</div>
								</template>
							</el-table-column>
							<el-table-column 
								prop="" 
								label="创建时间" 
								align="center">
								<template slot-scope="scope">
									<span>{{scope.row.createTime|timeFormate}}</span>
								</template>
							</el-table-column>
							<el-table-column 
								prop="" 
								label="申请人" 
								align="center">
								<template slot-scope="scope">
									<span>{{scope.row.createPerson}}</span>
								</template>
							</el-table-column>
							<el-table-column 
								prop="option" 
								align="center"
								label="操作">
								<template slot-scope="scope">
									<el-button
										type="text" 
										v-show="userInfo.role=='szw_admin'"
										size="medium"
										@click="handleApprove(scope.row)">审核</el-button>
									<el-button
										type="text" 
										size="medium"
										@click="handleRecoding(scope.row.id)">记录</el-button>
									<el-button
										type="text" 
										size="medium"
										@click="handleDelete(scope.row.id)">删除</el-button>
									<el-button
										type="text" 
										v-show="scope.row.audit!='1'"
										size="medium"
										@click="handleEditor(scope.row.id)">编辑</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<div id="footer"><Footer @currentPage="getCurrentPage" :total="total"></Footer></div>
			</el-card>
		</div>
		
		<!-- 审核对话框 -->
		<el-dialog 
			title="审核记录" 
			:visible.sync="reviewVisible" 
			width="30%" 
			:before-close="handleClose" 
			center>
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
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import {bus} from '../../utils/bus.js'
import { getOrganizationsAPI,
					getAreasAPI,
					deleteOrgByIdAPI,
					getOrgDetailByIdAPI,
					approveOrgAPI,
					getApproveRecordsAPI} from '../../api/api.js';
export default {
	components: {
		Footer,
		Breadcrumb
	},
	data() {
		return {
			currentDateAudit:'',
			total:0,
			approveList:[],
			recodringVisible:false,
			radio:'1',
			textarea:'',
			reviewVisible:false,
			status_value:'3',
			isshow: true,
			imageUrl: '',
			fengVisible: false,
			pull: { city: '510100', County: '', street: '',community:'' },
			dialogVisible: false,
			status:[{value: '3',label: '全部'},{value: '0',label: '待审核'},{value: '1',label: '已通过'},{value: '2',label: '未通过'}],
			citys: [{value: '510100',label: '成都市'}],
			county:[],
			street:[],
			communities:[],
			options:[],
			activeName: 'first',
			input: '',
			tableData: [],
			tableData2: [],
			pageSize:10,
			currentOrgId:'',
			userInfo:''
		};
	},
	methods: {
		handleDelete(id){
			this.$confirm('该操作将删除组织机构, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteOrgByIdAPI({id:id}).then(res => {
						if (res.status == 1) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getOrganizations({pageSize:this.pageSize,pageNumber:1});
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
		handleEditor(id){
			this.$router.push({
				path:'/home/create_organization',
				query:{
					id:id
				}
			})
		},
		handleAddOrg(){
			this.$router.push({
				path:'/home/create_organization',
				query:{
					id:null
				}
			})
		},
		handleRecoding(id){
			let p ={
				contentId:id,
				type:'org',
				pageSize :'10',
				pageNumber:1
			}
			getApproveRecordsAPI(p).then(res=>{
				this.approveList=res.list.reverse()
			})
			this.recodringVisible=true
		},
		handleApprove(row){
			this.currentOrgId=row.id
			this.reviewVisible=true,
			this.currentDateAudit=row.audit
		},
		handleSubmit(){
			let params={
				id:this.currentOrgId,
				approvePerson:this.userInfo.personname,
				audit:this.radio,
				audit_desc:this.textarea
			}
			approveOrgAPI(params).then(res=>{
				console.log('审核',res);
				this.getOrganizations({pageSize:this.pageSize,pageNumber:1});
				this.reviewVisible=false
			})
		},
		handleNextCounty(){
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,communityId:this.pull.city});
			if(this.pull.city){
				getAreasAPI({parentId:this.pull.city}).then(res=>{
					this.county=res
				})
			}
		},
		handleNextStreet(){
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,communityId:this.pull.County});
			if(this.pull.County){
				getAreasAPI({parentId:this.pull.County}).then(res=>{
					this.street=res
				})
			}
		},
		handleNextCommunity(){
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,communityId:this.pull.street});
			if(this.pull.street){
				getAreasAPI({parentId:this.pull.street}).then(res=>{
					this.communities=res
				})
			}
		},
		handleNextzero(){
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,communityId:this.pull.community});
		},
		handleChangeState(val){
			if(val==3){
				this.getOrganizations({pageSize:this.pageSize,pageNumber:1});
				return false
			}
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,audit:val});
		},
		getCurrentPage(val) {
			this.getOrganizations({pageSize:this.pageSize,pageNumber:val,searchContent:this.input,audit:this.status_value});
		},
		handleClose(done) {
			done();
		},
		tableRowClassName({ row, rowIndex }) {
			console.log(row);
			return 'header-class';
		},
		handleSerach() {
			let text = this.input;
			this.getOrganizations({pageSize:this.pageSize,pageNumber:1,searchContent:text});
		},
		//获取组织列表
		getOrganizations(params) {
			getOrganizationsAPI(params).then(res => {
				console.log('组织列表', res);
				this.tableData=res.list
				this.total=res.totalRow
				this.userInfo =bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
			});
		},
	},
	created() {
		this.getOrganizations({pageSize:this.pageSize,pageNumber:1});
		getAreasAPI({parentId:'510100'}).then(res=>{
			this.county=res
		})
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
	margin-top: 40px;
}
// 表头class
.header-class {
	display: flex;
	justify-content: center;
}
.head {
	display: flex;
	li:nth-child(1) {
		width: 200px;
		margin-left: 0;
	}
	li:nth-child(5) {
		display: flex;
	}

	li {
		width: 170px;
		margin-left: 9px;
	}
}

// 操作
.options {
	display: flex;
	flex-direction: column;
	li {
		cursor: pointer;
		margin-top: 19px;
		font-size: 16px;
		color: rgba(0, 105, 242, 0.88);
	}
	i {
		margin: 0 10px;
	}
	li:nth-child(1) {
		// color: rgba(0, 105, 242, 0.88);
	}
	li:nth-child(2) {
		// color: rgba(16, 16, 16, 1);
	}
}
.footer {
	display: flex;
	// justify-content: space-between;
}

//上传封面
.uploadImg {
	display: flex;
	justify-content: center;
}
.show-feng {
	width: 178px;
	height: 178px;
	display: block;
}

.showImg {
	position: relative;
	padding: 10px 10px;
	i {
		color: red;
		position: absolute;
		top: -15px;
		right: -25px;
		border-radius: 50%;
		padding: 1px 1px;
		font-size: 20px;
		width: 30px;
		height: 30px;
		background-color: #000000;
		opacity: 0.3;
		text-align: center;
		font-weight: 600;
		cursor: pointer;
		line-height: 30px;
	}
}
.el-upload-dragger {
	padding-top: 40px !important;
}
.box-card {
	min-height: 700px;
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
