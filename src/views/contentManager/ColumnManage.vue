<template>
	<div class="colunm-manage">
		<div class="top">
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="content">
			<el-card shadow="always" class="box-card">
				<!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="addParent">添加栏目</el-button> -->
				<div>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="新闻" name="1">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<el-button 
									type="primary" 
									@click="onAdd(1)"
									size="small"
									icon="el-icon-plus">添加栏目</el-button>
								</div></el-col>
							</el-row>
							<el-table
							    :data="tableData5"
							    row-key="value"
							    :tree-props="{children: 'children'}">
							    <el-table-column
							      prop="value"
										width="200"
							      label="栏目编号">
							    </el-table-column>
							    <el-table-column
							      prop="label"
										align="center"
							      label="栏目名称">
							    </el-table-column>
							    <el-table-column
							      prop=""
										align="center"
							      label="操作">
										<template slot-scope="scope">
											<el-button
												type="text" 
												size="mini"
												@click="onEdit(scope.row.value)">编辑</el-button>
											<el-button 
												type="text" 
												size="mini"
												@click="onAdd(scope.row.value)">添加</el-button>
											<el-button 
												type="text" 
												size="mini"
												@click="onRemove(scope.row.value)">删除</el-button>
										</template>
							    </el-table-column>
							  </el-table>
							</el-tab-pane>
							<el-tab-pane label="视频" name="2">
								<el-row>
								  <el-col :span="24"><div class="grid-content bg-purple-dark">
										<el-button 
										type="primary" 
										@click="onAdd(2)"
										size="small"
										icon="el-icon-plus">添加栏目</el-button>
									</div></el-col>
								</el-row>
								<el-table
								    :data="tableData5"
								    row-key="value"
								    :tree-props="{children: 'children'}">
								    <el-table-column
								      prop="value"
											width="200"
								      label="栏目编号">
								    </el-table-column>
								    <el-table-column
								      prop="label"
											align="center"
								      label="栏目名称">
								    </el-table-column>
								    <el-table-column
								      prop=""
											align="center"
								      label="操作">
											<template slot-scope="scope">
												<el-button
													type="text" 
													size="mini"
													@click="onEdit(scope.row.value)"
													>编辑</el-button>
												<el-button 
													type="text" 
													size="mini"
													@click="onAdd(scope.row.value)"
													>添加</el-button>
												<el-button 
													type="text" 
													size="mini"
													@click="onRemove(scope.row.value)"
													>删除</el-button>
											</template>
								    </el-table-column>
								  </el-table>
							</el-tab-pane>
							<el-tab-pane label="社区之声" name="3">
								<el-row>
								  <el-col :span="24"><div class="grid-content bg-purple-dark">
										<el-button 
										type="primary" 
										size="small"
										@click="onAdd(3)"
										icon="el-icon-plus">添加栏目</el-button>
									</div></el-col>
								</el-row>
								
								<el-table
								    :data="tableData5"
								    row-key="value"
								    :tree-props="{children: 'children'}">
								    <el-table-column
								      prop="value"
											width="100"
								      label="栏目编号">
								    </el-table-column>
								    <el-table-column
								      prop="label"
											align="center"
								      label="栏目名称">
								    </el-table-column>
								    <el-table-column
								      prop=""
											align="center"
								      label="操作">
											<template slot-scope="scope">
												<el-button
													type="text" 
													size="mini"
													@click="onEdit(scope.row.value)"
													>编辑</el-button>
												<el-button 
													type="text" 
													size="mini"
													@click="onAdd(scope.row.value)"
													>添加</el-button>
												<el-button 
													type="text" 
													size="mini"
													@click="onRemove(scope.row.value)"
													>删除</el-button>
											</template>
								    </el-table-column>
								  </el-table>
							</el-tab-pane>
						</el-tabs>
				</div>
				<div id="footer"><Footer :total="pageSize" @currentPage="currentPage"></Footer></div>
			</el-card>
		</div>
		
		<!-- 编辑对话框 -->
		<el-dialog
		  :title="columnInfo.name+'栏目详情'"
		  :visible.sync="isEdit"
		   width="30%"
			 center
		  :before-close="handleClose">
		  <div class="column-info">
				<el-form label-position="right" inline class="demo-table-expand">
					<el-form-item label="栏目编号:">
						<span>{{columnInfo.channelid}}</span>
					</el-form-item>
					<el-form-item label="栏目代码:">
						<span>{{columnInfo.channelCode}}</span>
					</el-form-item>
					<el-form-item label="栏目名称:">
						<span>{{columnInfo.name}}</span>
					</el-form-item>
					<el-form-item label="栏目英文:">
						<span>{{columnInfo.channelEng}}</span>
					</el-form-item>
					<el-form-item label="栏目简述:">
						<span>{{columnInfo.summary}}</span>
					</el-form-item>
					<el-form-item label="主标题:">
						<span>{{columnInfo.firstTitle}}</span>
					</el-form-item>
					<el-form-item label="栏图图标:">
						<el-image
							style="width: 50px; height: 50px"
							:src="columnInfo.channelIcon"
							v-if="columnInfo.channelIcon"
							fit="contain">
						</el-image>
					</el-form-item>
					<el-form-item label="主题背景:">
						<el-image
							style="width: 50px; height: 50px"
							:src="columnInfo.channelBgpic"
							v-if="columnInfo.channelBgpic"
							fit="contain">
						</el-image>
					</el-form-item>
					<el-form-item label="副标题:">
						<span>{{columnInfo.secondTitle}}</span>
					</el-form-item>
				</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isEdit = false">取 消</el-button>
		    <el-button type="primary" @click="handleModify">修改</el-button>
		  </span>
		</el-dialog>

		<!-- 添加子栏目对话框 -->
		<el-dialog
		  title="添加/编辑"
		  :visible.sync="isAdd"
			center
			width="600px"
		  :before-close="handleClose">
		  <div class="">
				<el-form inline :model="ruleForm" :rules="rules" ref="ruleForm"  label-position="right" class="add-column">
					
			<!-- 		<el-form-item label="栏目编号" class="form-item" prop="id">
						<el-input v-model="ruleForm.id">
						</el-input>
					</el-form-item> -->
					<el-form-item label="栏目名称" class="form-item" prop="name">
						<el-input v-model="ruleForm.name" placeholder="必填内容">
						</el-input>
					</el-form-item>
					<el-form-item label="主标题" class="form-item" prop="firstTitle">
						<el-input v-model="ruleForm.firstTitle">
						</el-input>
					</el-form-item>
					<el-form-item label="栏目英文" class="form-item" prop="channelEng">
						<el-input v-model="ruleForm.channelEng">
						</el-input>
					</el-form-item>
					<el-form-item label="栏目简述" class="form-item" prop="summary">
						<el-input v-model="ruleForm.summary">
						</el-input>
					</el-form-item>	
					<el-form-item label="父级栏目" class="form-item" prop="parentId">
						<el-input v-model="ruleForm.parentId">
						</el-input>
					</el-form-item>
					<el-form-item label="副标题" class="form-item" prop="secondTitle">
						<el-input v-model="ruleForm.secondTitle">
						</el-input>
					</el-form-item>
					<el-form-item label="主题背景" class="form-item" prop="channelBgPic">
						<ul>
							<li v-if="ruleForm.channelBgPic">
								<el-image
									style="width: 100px; height: 100px"
									:src="ruleForm.channelBgPic"
									@click="closeImg(0)"
									fit="contain">
								</el-image>
							</li>
							<li v-if="!ruleForm.channelBgPic"><UploadImg></UploadImg></li>
						</ul>
					</el-input>
					</el-form-item>
					<el-form-item label="栏图图标" class="form-item" prop="channelIcon">
						<ul>
							<li v-if="ruleForm.channelIcon">
								<el-image
									style="width: 100px; height: 100px"
									:src="ruleForm.channelIcon"
									@click="closeImg(1)"
									fit="contain">
								</el-image>
							</li>
							<li v-if="!ruleForm.channelIcon">
								<el-upload
									class="upload-demo"
									:action="domain"
									:on-remove="handleRemove"
									:before-upload="beforUpload"
									:data="qn"
									:limit="1"
									:on-success="handleSuccess"
									list-type="picture"
								>
									<el-button size="small" type="primary">点击上传</el-button>
								</el-upload>
							</li>
						</ul>
					</el-form-item>
					
				</el-form>
			</div>
		 <span slot="footer" class="dialog-footer">
		    <el-button @click="onClose">取 消</el-button>
		    <el-button type="primary" @click="handleSubmit()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb.vue'
	import UploadImg from '../../components/uploadImg.vue'
	import Footer from '../../components/footer.vue'
	import {getChannelListAPI,getChannelDetailAPI,getTokenAPI,saveChannelAPI,deleteChannelAPI} from '../../api/api.js'
	import {bus} from '../../utils/bus.js'
export default {
	components:{
		Breadcrumb,
		UploadImg,
		Footer
	},
	data() {
		return {
			channelType:"1",
			pageSize:10,
			activeName:'1',
			domain: 'http://upload-z2.qiniup.com',
			qn: {
				key: '',
				token: ''
			},
			qiniuaddr: 'https://image.sqfzzl.com/',
			icon_url:'',
			isShowImg:true, //显示图片
			fileList: [],
			columnInfo:'', //栏目详情
			isEdit:false,  //显示对话框
			isAdd:false,  //添加对话框
			ruleForm:{
				id:'',
				parentId:'',
				name:'',
				channelEng:'',
				firstTitle:'',
				secondTitle:'',
				summary:'',
				channelBgPic:'',
				channelIcon:'',
			},
			rules:{
				name: [
				   { required: true, message: '请输入栏目名称', trigger: 'blur' },
				      ],
			},
			//栏目数据
			tableData5:[],
		};
	},
	created() {
		this.$http({
			url: '/token/getUpToken',
			method: 'get',
			params: {
				type: 'image'
			}
		}).then(res => {
			this.qn.token = res.data.data;
		});
		this.getChannelList(this.channelType)
	},
	methods:{
		handleClick(tab){
			this.channelType=tab.name
			this.getChannelList(this.channelType)
			console.log('tab',tab);
		},
		currentPage(){
			
		},
		beforUpload(file){
			var timestamp = new Date().getTime();
			this.qn.key = `${timestamp}/${file.name}`;
		},
		handleSuccess(res, file, filelist){
			console.log(res);
			this.icon_url = this.qiniuaddr + res.key;
		},
		//提交
		handleSubmit(formName){
			let p=this.ruleForm
			if(p.channelBgPic==null||p.channelBgPic==''){
				p.channelBgPic=bus.img_url
			}
			if(p.channelIcon==''||p.channelIcon==null){
				p.channelIcon=this.icon_url
			}
			console.log('提交的数据',p);
			
			saveChannelAPI(p).then(res=>{
				console.log('保存ok',res);
				this.ruleForm={
					id:'',
					parentId:'',
					name:'',
					channelEng:'',
					firstTitle:'',
					secondTitle:'',
					summary:'',
					channelBgPic:'',
					channelIcon:'',
				}
				this.isAdd=false
				this.getChannelList(this.channelType)
			})
		},
		// 取消
		onClose(){
			this.ruleForm={
				id:'',
				parentId:'',
				name:'',
				channelEng:'',
				firstTitle:'',
				secondTitle:'',
				summary:'',
				channelBgPic:'',
				channelIcon:'',
			}
			this.isAdd=false
		},
		//获取栏目列表
		getChannelList(channelType){
			let p={
				channelType:channelType
			}
			getChannelListAPI(p).then(res=>{
				console.log('栏目列表',res);
				this.tableData5=res.children
			})
		},
		//修改栏目
		handleModify(){
			this.isAdd=true
			this.isEdit=false
			this.ruleForm.id=this.columnInfo.channelid
			this.ruleForm.parentId=this.columnInfo.parentid
			this.ruleForm.name=this.columnInfo.name
			this.ruleForm.channelEng=this.columnInfo.channelEng
			this.ruleForm.firstTitle=this.columnInfo.firstTitle
			this.ruleForm.secondTitle=this.columnInfo.secondTitle
			this.ruleForm.summary=this.columnInfo.summary
			this.ruleForm.channelBgPic=this.columnInfo.channelBgpic
			this.ruleForm.channelIcon=this.columnInfo.channelIcon
			console.log('clickmodify',this.ruleForm);
		},
		// 添加
		onAdd(index){
			this.ruleForm.parentId=index
			this.isAdd=true;
		},
		addParent(){
			this.ruleForm.parentId=0
			this.isAdd=true
		},
		//编辑
		onEdit(id){
			this.isEdit=true
			this.getChannelDetail(id)
		},
		//获取栏目详情
		getChannelDetail(id){
			getChannelDetailAPI({id:id}).then(res=>{
				console.log('栏目详情',res);
				this.columnInfo=res;
			})
		},
		//移除
		onRemove(index){
			console.log(index);
			let p={id:index}
			this.$confirm('确定删除该专题, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteChannelAPI(p).then(res=>{
						console.log('删除ok',res);
						this.getChannelList(this.channelType)
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			
		},
		// 关闭对话框
		handleClose(done){
			this.ruleForm={
				id:'',
				parentId:'',
				name:'',
				channelEng:'',
				firstTitle:'',
				secondTitle:'',
				summary:'',
				channelBgPic:'',
				channelIcon:'',
			}
			this.columnInfo=''
			this.isAdd=false
			done()
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},

		closeImg(type){
			if(type==0){
				this.ruleForm.channelBgpic=''
			}else{
				this.ruleForm.channelIcon=''
			}
		}
	},
};
</script>

<style lang="less">
.content {
	margin-top: 40px;
}
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
.el-table::before{
	height: 0 !important;
}

.child-column{
	padding-left: 18px !important;
}
.optionss {
	color: rgba(0, 105, 242, 0.88);
	font-size: 16px;
	text-align: left;
	width: 150px;
	display: flex;
	li {
		margin: 5px 5px;
		cursor: pointer;
	}
}
.oth-opt{
	margin-left: 20px !important;
	color: red;
}
.box-card{
	position: relative;
	// height: 800px;
	// overflow-y: auto;
	min-height: 700px;
	max-height: 800px;
	#footer{
		position: absolute;
		bottom: 20px;
		right: 30px;
	}
}

// 添加栏目
.add-column{
	// width: 500px;
	display: flex;
	// flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-between;
	.form-item{
		flex-basis: 40%;
	}
	
}
.showImg span{
	height: 12px;
	width: 12px;
	border: 1px solid red;
	border-radius: 50%;
	position: absolute;
	background-color: red;
	font-weight: 600;
	top: -5px;
	right: -20px;
	text-align: center;
	font-size: 5px;
	line-height: 10px;
	opacity: 0.5;
	cursor: pointer;
}
.form-item-footer{
	position: absolute;
	right: 0;
	bottom: 0;
}
</style>
