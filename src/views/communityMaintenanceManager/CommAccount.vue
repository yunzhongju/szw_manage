<template>
	<div class="commaccount">
		<div class="top"><Breadcrumb></Breadcrumb></div>
		<div class="content">
			<el-card shadow="always" style="height: 800px;">
				<ul class="head">
					<li>
						<el-select 
							v-model="pull.city" 
							@change="handleNextCounty" 
							clearable 
							@clear="pull.city = ''" 
							placeholder="城市">
							<el-option 
								v-for="item in citys" 
								:key="item.value" 
								:label="item.label" 
								:value="item.value"></el-option>
						</el-select>
					</li>
					<li>
						<el-select 
							v-model="pull.County" 
							clearable 
							@clear="pull.County = ''" 
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
							@clear="pull.street = ''" 
							@change="handleCurrent"
							placeholder="街道">
							<el-option 
								v-for="item in street" 
								:key="item.orgid" 
								:label="item.orgname" 
								:value="item.orgid"></el-option>
						</el-select>
					</li>
					<!-- 		<li>
						<el-select v-model="pull.community" placeholder="社区" @change="" clearable>
							<el-option v-for="item in communities" :key="item.orgid" :label="item.orgname" :value="item.orgid"></el-option>
						</el-select>
					</li> -->
					<!-- 	<li>
						<el-select v-model="status_value" @change="" placeholder="请选择">
							<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</li> -->
					<li><el-input v-model="input" placeholder="请输入角色" clearable></el-input></li>
					<li><el-button type="primary" @click="handleSerach">搜索</el-button></li>
				</ul>

				<!-- 数据表格 -->
				<div>
					<el-table :data="tableData" height="600" :row-class-name="tableRowClassName">
						<el-table-column 
							prop="head" 
							label="头像" 
							align="center" 
							width="300">
							<template slot-scope="scope">
								<!-- <el-image style="width: 132px; height: 132px" :src="scope.row.headImage"></el-image> -->
								<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.headImage"></el-avatar></div>
							</template>
						</el-table-column>
						<el-table-column 
							prop="date" 
							align="center"
							label="基本信息">
							<template slot-scope="scope">
								<ul class="baseinfo">
									<li>昵称:{{scope.row.personname}}</li>
									<li>手机号码:{{scope.row.personpho}}</li>
								</ul>
							</template>
						</el-table-column>
						<el-table-column 
							prop="phone" 
							align="center"
							label="角色">
							<template slot-scope="scope">
								<ul class="address">
									<li>{{scope.row.personname}}</li>
								</ul>
							</template>
						</el-table-column>
						<el-table-column 
							prop="option" 
							align="center"
							label="操作">
							<template slot-scope="scope">
								<el-button 
									type="text" 
									v-if="scope.row.isused=='Y'"
									size="medium"
									@click="onStop(scope.row.personid)"
									icon="el-icon-remove">停用</el-button>
								<el-button
									type="text" 
									v-if="scope.row.isused=='N'"
									size="medium"
									@click="onOpen(scope.row.personid)"
									icon="el-icon-sort">启用</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="footer"><Footer @currentPage="getCurrentPage" :total="pageSize"></Footer></div>
			</el-card>
		</div>
	</div>
</template>

<script>
import SerachK from '../../components/serachK.vue';
import Footer from '../../components/footer.vue';
import UploadHead from '../../components/uploadHead.vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import { getSqAccountListAPI,
					getAreasAPI,
					accountCanUsedAPI} from '../../api/api.js';
export default {
	components: { SerachK, Footer, UploadHead, Breadcrumb },
	methods: {
		getCurrentPage(val) {
			this.getAccountList('','',val)
		},

		tableRowClassName({ row, rowIndex }) {
			return 'header-class';
		},

		handleSerach() {
			let text = this.input;
			this.getAccountList(text,'',1)
		},
		handleNextCounty() {
			if (this.pull.city) {
				getAreasAPI({ parentId: this.pull.city }).then(res => {
					this.county = res;
				});
			}
		},
		handleNextStreet() {
			if (this.pull.County) {
				getAreasAPI({ parentId: this.pull.County }).then(res => {
					this.street = res;
				});
			}
		},
		handleCurrent(){
			this.getAccountList('',this.pull.street,1)
		},
		getAccountList(searchContent,communityId,pageNumber){
			let p={
				searchContent:searchContent,
				communityId:communityId,
				pageNumber:pageNumber,
				pageSize:10
			}
			getSqAccountListAPI(p).then(res=>{
				console.log('list',res);
				this.tableData=res.list
				this.pageSize=res.totalRow
			})
		},
		// 停用
		onStop(id) {
			let p={
				personid:id,
				isused:'N'
			}
			this.$confirm('此操作将停用该账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				accountCanUsedAPI(p).then(res=>{
					this.getAccountList('','',1)
					this.$message({
						type: 'success',
						message: '停用成功!'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});	
		},
		// 启动
		onOpen(id){
			let p={
				personid:id,
				isused:'Y'
			}
			this.$confirm('此操作将启用该账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				accountCanUsedAPI(p).then(res=>{
					this.getAccountList('','',1)
					this.$message({
						type: 'success',
						message: '启用成功!'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
	},
	data() {
		return {
			pageSize:10,
			url:'',
			srcList:[],
			pull: { city: '510100', County: '', street: '', community: '' },
			citys: [{ value: '510100', label: '成都市' }],
			county: [],
			street: [],
			status_value: '',
			status: '',
			communities: [],
			input: '',
			chooseForm: {
				city: '',
				country: '',
				street: '',
				community: ''
			},
			tableData: []
		};
	},
	created() {
		getAreasAPI({ parentId: '510100' }).then(res=>{
			this.county=res
		})
		this.getAccountList('','',1)
	}
};
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
}

.head{
	display: flex;
}
.options {
	display: flex;
	font-weight: 600;
	li {
		padding: 0 5px;
		cursor: pointer;
	}
}
.footer {
	display: flex;
	justify-content: flex-end;
}
// 创建账号
.createAcount {
	display: flex;
	justify-content: center;
	text-align: center;
	div {
		// display: flex;
		// justify-content: flex-start;
	}
}
</style>
