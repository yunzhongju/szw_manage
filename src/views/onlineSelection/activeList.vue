<template>
	<div>
		<div class="top">
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="content">
			<el-card shadow="always" class="box-card">
				<MyActiveHeader 
				@getPubSta="handlePubSta" 
				@getApprSta="handleApprSta" 
				@getInput="handleSearch"></MyActiveHeader>
				<div>
				 <el-table
						max-height="580"
						:data="tableData"
						style="width: 100%">
						<el-table-column
							prop=""
							label="活动海报">
							<template slot-scope="scope">
								<el-image
									style="width: 365px;height: 124px;"
									:src="scope.row.coverImg"></el-image>
							</template>
						</el-table-column>
						<el-table-column
							prop="title"
							label="活动基本信息"
							align="center"
							width="180">
						</el-table-column>
						<el-table-column
							prop=""
							align="center"
							label="活动时间">
							<template slot-scope="scope">
								<ul>
									<li>{{scope.row.startTime|timeFormate}}</li>
									<li>{{scope.row.endTime|timeFormate}}</li>
								</ul>
							</template>
						</el-table-column>
						<el-table-column
							prop=""
							align="center"
							label="发布时间">
							<template slot-scope="scope">
								<span>{{scope.row.createTime|timeFormate}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop=""
							width="100"
							align="center"
							label="状态">
							<template slot-scope="scope">
								<span>{{scope.row.name}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop=""
							align="center"
							label="操作">
							<template slot-scope="scope">
								<el-button 
									size="medium"
									v-show="scope.row.audit!=1"
									@click="handleEdi(scope.row.id)"
									type="text">编辑</el-button>
								<el-button
									size="medium"
									@click="handleMove(scope.row.id)"
									type="text">删除</el-button>
								<el-button
									size="medium"
									@click="handleParticle(scope.row.id)"
									type="text">详情</el-button>	
								<el-button
									size="medium"
									v-show="userInfo.role=='szw_admin'&&scope.row.audit!=2"
									@click="handleApprove(scope.row.id,scope.row)"
									type="text">审核</el-button>	
								<el-button
									size="medium"
									@click="handlePublic(scope.row)"
									type="text">公众号</el-button>	
							</template>
						</el-table-column>
					</el-table>
				</div>
				<Footer @currentPage="getCurrentPage" :total="pageSize"></Footer>
			</el-card>
			
			
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
			
			<!-- 公众号 -->
			<el-dialog
			  title="添加/修改公众号"
			  :visible.sync="dialogVisiblePublic"
				center
			  :before-close="handleClose">
			  <div v-if="dialogVisiblePublic">
					<el-form 
						:model="publicForm" 
						ref="publicForm" 
						label-width="100px">
					  <el-form-item
					    label="公众号名称"
					    prop="qrTitle"
					    :rules="[{ required: true, message: '标题不能为空'}]">
					    <el-input 
								v-model="publicForm.qrTitle">
							</el-input>
					  </el-form-item>
						<el-form-item
						  label="二维码"
						  prop="qrCode"
						  :rules="[{ required: true, message: '二维码不能为空'}]">
						  <ImgUp @getImageUrl="getImageUrl" adviceSize="430*430"></ImgUp>
							<span
								v-if="publicForm.qrCode"><img 
								:src="publicForm.qrCode" 
								style="width: 300px;height: 300px;" alt=""></span>
						</el-form-item>
					</el-form>
				</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="resetPublicForm('publicForm')">取 消</el-button>
			    <el-button type="primary" @click="submitPublicForm('publicForm')">确 定</el-button>
			    <el-button 
						type="primary" 
						@click="onHandleDelQrCode">删 除</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb.vue'
	import MyActiveHeader from './components/myActiveHeader.vue'
	import ImgUp from './addActive/imgUp.vue'
	import Footer from '../../components/footer.vue'
	import {bus} from '../../utils/bus.js'
	import {getActiveListAPI,
				approveActivityAPI,
				updateQrcodeAPI,
				getQrcodeAPI,
				clearQrcodeAPI,
				deleteActivityByIdAPI} from '../../api/api.js'
	export default {
		components:{
			Breadcrumb,
			MyActiveHeader,
			Footer,
			ImgUp
		},
		data(){
			return {
				currentQrCode:'',
				dialogVisiblePublic:false,
				publicForm:{
					id:'',
					qrTitle:'',
					qrCode:''
				},
				userInfo:'',
				currentId:'',
				pageSize:0,
				radio:"1",
				textarea:'',
				reviewVisible:false,
					msg:'',
		tableData: []
			}
		},
		methods:{
			onHandleDelQrCode(){
				this.$confirm('此操作将删除改活动的公众号二维码, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					clearQrcodeAPI({id:this.publicForm.id}).then(res=>{
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.dialogVisiblePublic=false
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});		
			},
			getImageUrl(url){
				this.publicForm.qrCode=url
			},
			submitPublicForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						updateQrcodeAPI(this.publicForm).then(res=>{
							this.$message({
								type:'success',
								message:res.msg
							})
							this.dialogVisiblePublic=false
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetPublicForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisiblePublic=false
			},
			handlePublic(row){
				let id=row.id
				getQrcodeAPI({id:id}).then(res=>{
					this.publicForm.qrCode=res.qrCode
					this.publicForm.qrTitle=res.qrTitle
					this.publicForm.id=res.id
					this.dialogVisiblePublic=true
				})
			},
			getCurrentPage(val){
				this.getActiveList('','1','',val)
			},
			handleClose(done){
				done()
			},
			handleSubmit(){
				let p={
					id:this.currentId,
					approvePerson:this.userInfo.personname,
					audit:this.radio,
					audit_desc:this.textarea
				}
				console.log(p);
				approveActivityAPI(p).then(res=>{
					this.reviewVisible=false
					this.getActiveList('','0','',1)
				})
			},
			handleEdi(id){
				this.$router.push({
					path:'/home/onlineselection/addactive',
					query:{
						id:id
					}
				})
			},
			handleApprove(id,row){
				if(row.items&&row.sets){
					this.currentId=id
					this.reviewVisible=true
				}else if(!row.items){
					this.$message({
						message: '该活动没有投票项,请前去编辑',
						type: 'warning'
					});
				}else if(!row.sets){
					this.$message({
						message: '该活动没有设置规则,请前去编辑',
						type: 'warning'
					});
				}
			},
			handleMove(id){
				this.$confirm('此操作将取消该活动, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteActivityByIdAPI({id:id}).then(res=>{
						this.getActiveList('','','',1)
						console.log('取消',res);
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
			handleParticle(id){
				this.$router.push({
					path:'/home/onlineselection/activedetail',
					query:{
						id:id
					}
				})
			},
			handlePubSta(val){
				this.getActiveList(val,'','',1)
			},
			handleApprSta(val){
				this.getActiveList('',val,'',1)
			},
			handleSearch(val){
				this.getActiveList('','',val,1)
			},
			handlePageView(id){
				this.$router.push('/home/onlineselection/activedetail')
			},
			getActiveList(publishStatus,audit,searchContent,pageNumber){
				let params={
					personid:this.userInfo.personid,
					publishStatus:publishStatus,
					audit:audit,
					searchContent:searchContent,
					pageSize:'10',
					pageNumber:pageNumber
				}
				getActiveListAPI(params).then(res=>{
					console.log('activeList',res);
					this.tableData=res.list
					this.pageSize=res.totalRow
				})
			},
		},
		created() {
			this.userInfo =bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
			this.getActiveList('','','',1)
		},
		filters: {
			timeFormate(time) {
				let timer = new Date(time*1000);
				let y = timer.getFullYear();
				let m = timer.getMonth() + 1 < 10 ? '0' + (timer.getMonth() + 1) : timer.getMonth() + 1;
				let d = timer.getDate() > 9 ? timer.getDate() : '0' + timer.getDate();
				let h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
				let mint = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
				return y + '-' + m + '-' + d + ' ' + h + ':' + mint;
			}
		},
	}
</script>

<style scoped lang="less">
	.content{
		margin-top: 40px;
	}
	.box-card{
		min-height: 700px;
	}
	// 操作
	.options {
		color: rgba(0, 105, 242, 0.88);
		font-size: 16px;
		text-align: left;
		width: 200px;
		display: flex;
		flex-wrap: wrap;
		li {
			display: flex;
			align-items: center;
			flex-basis: 40%;
			text-align: left;
			margin: 5px 5px;
			cursor: pointer;
			span{
				display: inline-block;
				width: 70px !important;
			}
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
