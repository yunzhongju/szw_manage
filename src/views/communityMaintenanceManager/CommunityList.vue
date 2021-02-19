
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
							clearable @clear="pull.street = ''"
							@change="handleCurrent" 
							placeholder="街道">
							<el-option 
								v-for="item in street" 
								:key="item.orgid" 
								:label="item.orgname" 
								:value="item.orgid"></el-option>
						</el-select>
					</li>
					<li class="mar-left"><el-input v-model="input" placeholder="请输入关键字" clearable></el-input></li>
					<li><el-button type="primary" @click="handleSearch">搜索</el-button></li>
					<li class="mar-left"><el-button type="primary" @click="handleAddComm">新增</el-button></li>
				</ul>

				<!-- 数据表格 -->
				<el-table 
					:data="tableData" 
					style="width: 100%" 
					max-height="580" 
					:row-class-name="tableRowClassName">
					<el-table-column 
						prop="head" 
						label="封面" 
						align="center" 
						width="180">
						<template slot-scope="scope">
							<div class="block">
								<el-avatar shape="square" :size="100" :src="scope.row.imagePath"></el-avatar>
							</div>
						</template>
					</el-table-column>
					<el-table-column 
						prop="info" 
						label="基本信息" 
						align="center">
						<template slot-scope="scope">
							<ul class="address">
								<li>{{ scope.row.title }}</li>
								<li>{{ scope.row.fullName }}</li>
							</ul>
						</template>
					</el-table-column>
					<el-table-column 
						prop="date" 
						label="封面摄影"
						align="center">
						<template slot-scope="scope">
							<div class="block"><el-avatar shape="square" :size="100" :src="scope.row.coverImage"></el-avatar></div>
						</template>
					</el-table-column>
					<el-table-column 
						prop="option" 
						align="center"
						label="操作">
						<template slot-scope="scope">
							<el-button
								type="text" 
								size="medium"
								@click="handleEdit(scope.row)">编辑</el-button>
							<el-button
								type="text" 
								size="medium"
								@click="handleDel(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
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
import { getAreasAPI,getDistrictListAPI,deleteAreasAPI} from '../../api/api.js';
import {bus} from '../../utils/bus.js'
export default {
	components: { SerachK, Footer, UploadHead, Breadcrumb },
	methods: {
		handleSearch(){
			let text=this.input
			this.getCommunityList('',text,1)
		},
		handleEdit(row){
			this.$router.push({
				path:'/home/createcomm',
				query:{
					id:row.orgid
				}
			})
		},
		handleDel(row){
			this.$confirm('该操作将删除当前区划及其子区划, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteAreasAPI({orgid:row.orgid}).then(res=>{
						this.getCommunityList('510100','',1)
						this.$message({
							type: 'success',
							message: '删除成功'
						});
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		handleAddComm(){
			this.$router.push('/home/createcomm')
		},
		handleNextCounty() {
			if (this.pull.city) {
				getAreasAPI({ parentId: this.pull.city }).then(res => {
					this.county = res;
					this.currengOrgId=this.pull.city
					this.getCommunityList(this.pull.city,'',1)
				});
			}
		},
		handleNextStreet() {
			if (this.pull.County) {
				getAreasAPI({ parentId: this.pull.County }).then(res => {
					this.currengOrgId=this.pull.County
					this.street = res;
					this.getCommunityList(this.pull.County,'',1)
				});
			}
		},
		handleCurrent(){
			this.currengOrgId=this.pull.street
			this.getCommunityList(this.pull.street,'',1)
		},
		tableRowClassName() {},
		getCurrentPage(val) {
			this.getCommunityList(this.currengOrgId,'',val)
		},

		getCommunityList(parentId,searchContent,pageNumber ){
			let p={
				parentId:parentId,
				searchContent:searchContent,
				pageNumber:pageNumber,
				pageSize:'10'
			}
			getDistrictListAPI(p).then(res=>{
				console.log('list',res);
				this.tableData=res.list
				this.pageSize=res.totalRow
			})
		}
	},

	data() {
		return {
			currengOrgId:'510100',
			pageSize:10,
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
		getAreasAPI({ parentId:'510100'}).then(res=>{
			this.county=res
		})
		this.getCommunityList('510100','',1)
	}
};
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
}

.head {
	display: flex;
	// justify-content: space-between;
}
.mar-left{
	margin-left: 50px;
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
	Footer{
		align-self: flex-end;
	}
}
</style>
