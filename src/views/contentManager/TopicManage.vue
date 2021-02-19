<template>
	<div class="topicmanage">
		<div class="top"><Breadcrumb></Breadcrumb></div>

		<div class="content">
			<el-card shadow="always" class="box-card">
				<div class="serach">
					<div><el-button 
						type="primary" 
						icon="el-icon-plus" 
						size="small" 
						@click="addTopic">添加专题</el-button></div>
					<ul>
						<li><el-input 
							v-model="input"
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

				<el-table 
				:data="newTableData"
				 style="width: 100%"
				:row-class-name="tableRowClassName" 
				:v-loading="loading" 
				 max-height="580">
					>
					<el-table-column prop="head" label="封面" align="center" width="280">
						<template slot-scope="scope">
							   <div class="block"><el-avatar shape="square" :size="100" :src="scope.row.imagePath"></el-avatar></div>
							<!-- <img style="width: 122px; height: 93px;" :src="scope.row.imagePath" alt="" /> -->
						</template>
					</el-table-column>
					<el-table-column prop="info" label="基本信息" >
						<template slot-scope="scope">
							<span>{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="新闻/视频数量">
						<template slot-scope="scope">
							<ul>
								<li>新闻:{{ scope.row.newsNumber }}</li>
								<li>视频: {{ scope.row.videosNumber }}</li>
							</ul>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="创建时间">
						<template slot-scope="scope">
							<span>{{ scope.row.addTime | timeFormate }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="option" label="操作">
						<template slot-scope="scope">
							<ul class="options">
								<li @click="handleDel(scope.row.id)">
									<i class="el-icon-delete"></i>
									<span>删除</span>
								</li>
								<li @click="handleEdi(scope.row.id)">
									<i class="el-icon-edit"></i>
									<span>编辑</span>
								</li>
							</ul>
						</template>
					</el-table-column>
				</el-table>
				<Footer :total="totalRow" @currentPage="currentPage"></Footer>
			</el-card>
		</div>

		<!-- 编辑对话框 -->
		<el-dialog title="编辑专题" :visible.sync="dialogVisible" width="30%" center :before-close="handleClose">
			<div class="topic-manage" style="width: 100%;">
				<el-form ref="form" :model="form" :rules="rules">
					<el-form-item prop="name"  label="专题名称">
						<el-input placeholder="请输入专题名称" v-model="form.name" clearable></el-input>
					</el-form-item>
					<el-form-item prop="name" label="专题封面">
						<uploadImg @getImgUrl="getImgUrl"></uploadImg>
						<div class="show-topic-img" v-show="">
							<img :src="form.img_path" alt="">
						</div>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleCanle">取 消</el-button>
				<el-button type="primary" @click="handleSure">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Footer from '../../components/footer.vue';
import uploadImg from '../../components/uploadImg.vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import { getTopicListAIP, getTokenAPI, saveTopicAPI, deleteTopicAPI } from '../../api/api.js';
import { post } from '../../utils/request.js';
import { bus } from '../../utils/bus.js';
export default {
	data() {
		return {
			visible2: false, //是否删除
			isShowImg:true,
			pageSize: 0,
			totalRow:0,
			input: '',
			form: {
				id: '',
				name: '',
				img_path: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入专题名称',
						trigger: 'blur'
					}
				]
			},
			dialogVisible: false,
			loading: true,
			tableData: [] ,//专题数据
			type:0
		};
	},
	methods: {
		//获取专题封面
		getImgUrl(val){
			this.form.img_path=val
		},
		//添加专题
		addTopic() {
			this.form.id = '';
			this.form.name = '';
			this.form.img_path = '';
			this.type=0
			this.dialogVisible = true;
		},
		// 搜索
		handleSerach() {
			let searchContent = this.input;
			this.getTopicList(searchContent, 10, 1);
		},
		// 取消
		handleCanle() {
			this.form.name = '';
			this.form.img_path = '';
			this.form.id = '';
			this.dialogVisible = false;
		},
		// 确定
		handleSure() {
			this.form.img_path = bus.img_url;
			console.log('类型',this.type);
			let params = {
				id: this.form.id,
				title: this.form.name,
				imagePath: this.form.img_path
			};
			console.log(params);
			this.saveOraddTopic(this.type,params)
			this.dialogVisible = false;
		},

		currentPage(page) {
			console.log(page);
			this.getTopicList('', 10, page);
		},
		// 删除操作
		handleDel(id) {
			console.log(id);
			let params = {
				id: id
			};
			this.$confirm('确定删除该专题, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteTopicAPI(params).then(res => {
						if (res.status == 1) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getTopicList('', 10, 1);
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
			this.dialogVisible = true;
			this.isShowImg=false
			this.type=1
			console.log(id);
			this.form.id = id;
			this.newTableData.forEach(item => {
				if (item.id == id) {
					this.form.name = item.title;
					this.form.img_path=item.imagePath
				}
			});
		},
		//新增/编辑接口
		saveOraddTopic(type,params) {
			if (type == 0) {
				params.id = '';
			}
			console.log('currentparams',params);
			saveTopicAPI(params).then(res=>{
				console.log('editor/add ok');
				this.$message('操作成功!')
				this.getTopicList('', 10, 1);
			})
		},
		tableRowClassName() {},
		handleClose(done) {
			this.form.id = '';
			this.form.name = '';
			this.form.img_path = '';
			done();
		},
		getTopicList(searchContent = '', size, num) {
			var params = {
				pageSize: size,
				pageNumber: num,
				searchContent: searchContent
			};
			getTopicListAIP(params).then(res => {
				console.log('专题列表', res);
				this.tableData = res.list;
				this.totalRow = res.totalRow
				this.loading = false;
			});
		}
	},
	components: {
		Footer,
		uploadImg,
		Breadcrumb
	},
	created() {
		this.getTopicList('', 10, 1);
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
	computed: {
		newTableData() {
			let newtable = [];
			this.tableData.forEach(item => {
				let each = item.imagePath.replace('szw.image.blackshell.cn', 'image.sqfzzl.com');
				item.imagePath = each;
				newtable.push(item);
			});
			return newtable;
		}
	}
};
</script>

<style lang="less" scoped>
.topicmanage {
	.content {
		margin-top: 40px;
		.options {
			color: rgba(0, 105, 242, 0.88);
			font-size: 16px;
			li {
				margin: 11px 0;
				cursor: pointer;
				span {
					margin-left: 4px;
				}
			}
			li:nth-child(1) {
				color: rgba(217, 136, 50, 1);
			}
		}
	}
}
.box-card {
	// height: 800px;
	// overflow-y: auto;
	max-height: 800px;
	// min-height: 750px;
}
.serach {
	display: flex !important;
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
.topic-manage{
	position: relative;
}
.topic-manage i{
	background-color: gainsboro;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	line-height: 20px;
	color: red;
	position: absolute;
	top: -10px;
	text-align: center;
	right:170px;
	cursor: pointer;
}
.show-topic-img{
	width: 100%;
	img{
		margin-left: 75px;
		width: 300px;
		height: 200px;
	}
}
</style>
