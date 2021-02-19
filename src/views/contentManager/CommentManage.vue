<template>
	<div class="commentmanage">
		<div class="top">
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="content">
			<el-card shadow="always" class="box-card">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="正常评论" name="1">
						<Serach @input="getText"></Serach>
						<el-table 
						:data="tableData"
						max-height="580"
						 style="width: 100%" highlight-current-row
						>
							<!-- <el-table-column type="selection" width="55"></el-table-column> -->
							<el-table-column 
								prop="head" 
								label="头像" 
								align="center" 
								width="250">
								<template slot-scope="scope">
									<!-- <img style="width: 122px; height: 93px;" :src="scope.row.headImage" alt="" /> -->
									<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.headImage"></el-avatar></div>
								</template>
							</el-table-column>
							<el-table-column 
								prop="info" 
								align="center"
								label="用户">
								<template slot-scope="scope">
									<span>{{ scope.row.showName }}</span>
								</template>
							</el-table-column>
							<el-table-column 
								prop="date" 
								align="center"
								label="评论内容">
								<template slot-scope="scope">
									<p>{{ scope.row.content }}</p>
								</template>
							</el-table-column>
							<el-table-column 
								prop="option" 
								align="center"
								label="操作" >
								<template slot-scope="scope">
									<el-button 
										type="text" 
										@click="deleteItem(scope.row.id)"
										size="medium"
										icon="el-icon-view">屏蔽</el-button>
							<!-- 		<ul class="options">
										<li @click="deleteItem(scope.row.id)">
											<i class="el-icon-view"></i>
											<span>屏蔽</span>
										</li>
									</ul> -->
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="异常评论" name="2">
						<Serach @input="getText"></Serach>
						<el-table 
							:data="tableData" 
							style="width: 100%" 
							highlight-current-row 
							@selection-change="handleSelectionChange" 
							@current-change="handleCurrentChange">
							<!-- <el-table-column type="selection" width="55"></el-table-column> -->
							<el-table-column 
								prop="head" 
								label="头像" 
								align="center" 
								width="250">
								<template slot-scope="scope">
									<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.headImage"></el-avatar></div>
									<!-- <img style="width: 122px; height: 93px;" :src="scope.row.headImage" alt="" /> -->
								</template>
							</el-table-column>
							<el-table-column 
								prop="info" 
								align="center" 
								label="用户">
								<template slot-scope="scope">
									<span>{{ scope.row.showName }}</span>
								</template>
							</el-table-column>
							<el-table-column 
								prop="date" 
								align="center" 
								label="评论内容">
								<template slot-scope="scope">
									<p>{{ scope.row.content }}</p>
								</template>
							</el-table-column>
							<el-table-column 
								prop="option" 
								align="center"
								label="操作">
								<template slot-scope="scope">
									<el-button
										type="text" 
										@click="resumeItem(scope.row.id)"
										size="medium"
										icon="el-icon-refresh-left">恢复</el-button>
	<!-- 								<ul class="options">
										<li @click="resumeItem(scope.row.id)">
											<i class="el-icon-refresh-left"></i>
											<span>恢复</span>
										</li>
									</ul> -->
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<Footer @currentPage="getCurrentPage" :total="pageSize"></Footer>
			</el-card>
		</div>
	</div>
</template>

<script>
import Serach from '../../components/serachK.vue';
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue'
import {getCommentsListAPI,shieldCommentsAPI,resumeCommentsAPI} from '../../api/api.js'
export default {
	components: {
		Serach,
		Footer,
		Breadcrumb
	},
	data() {
		return {
			pageSize:10,
			activeName: '1',
			serachInput:'',
			tableData: [],
			currentRow: null,
			multipleSelection: []
		};
	},
	methods: {
		getCurrentPage(val){
			this.getCommentsList('',this.activeName,val)
		},
		getText(val){
			this.serachInput=val
			this.getCommentsList(val,this.activeName,1)
		},
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
		},
		handleCurrentChange(val) {
			this.currentRow = val;
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		deleteItem(id) {
			shieldCommentsAPI({id:id}).then(res=>{
				this.getCommentsList('',this.activeName,1)
			})
		},
		resumeItem(id){
			resumeCommentsAPI({id:id}).then(res=>{
				this.getCommentsList('',this.activeName,1)
			})
		},
		handleClick(tab) {
			console.log(tab);
			this.getCommentsList('',tab.name,1)
		},
		getCommentsList(searchContent,audit,pageNumber){
			let p={
				searchContent:searchContent,
				audit:audit,
				pageNumber:pageNumber,
				pageSize:10
			}
			getCommentsListAPI(p).then(res=>{
				console.log(res);
				this.tableData=res.list
				this.pageSize=res.pageSize*res.totalPage
			})
		}
	},
	created() {
		this.getCommentsList('',1,1)
	}
};
</script>

<style lang="less" scoped>
.commentmanage {
	.content {
		// border: 10px solid #f0f0f2;
		// padding-left: 20px;
		margin-top: 40px;
		.options {
			color: rgba(0, 105, 242, 0.88);
			font-size: 16px;
			text-align: left;
			font-family: SourceHanSansSC-bold;
			display: flex;
			li {
				cursor: pointer;
				span {
					margin-left: 4px;
				}
			}
		}
	}
}
.box-card{
	min-height: 700px;
	max-height: 800px;
}
</style>
