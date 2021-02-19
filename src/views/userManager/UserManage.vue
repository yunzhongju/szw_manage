<template>
	<div class="minimanage">
		<Breadcrumb></Breadcrumb>
		<div class="content">
			<el-card shadow="always" class="box-card">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="正常用户" name="0">
						<Search @input="handleSearch"></Search>
						<el-table 
						:data="tableData" 
						style="width: 100%"
						max-height="580"
						v-loading="loading">
							<el-table-column prop="head" label="头像" align="center" width="180">
								<template slot-scope="scope">
									<div class="block">
										<el-avatar shape="square" :size="100" :src="scope.row.headImage"></el-avatar>
									</div>
									<!-- <img :src="scope.row.headImage" alt="" /> -->
								</template>
							</el-table-column>
							<el-table-column prop="info" label="用户信息" width="180">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>昵称:{{ scope.row.showName }}</li>
										<li>性别:{{ scope.row.sex == 1 ? '男' : '女' }}</li>
										<li>年龄:{{ scope.row.age }}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="注册时间">
								<template slot-scope="scope">
									<span>{{ scope.row.addTime|timeFormate }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="最近登录" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.lastLoginTime!=0">{{scope.row.lastLoginTime|timeFormate }}</span>
									<span v-if="scope.row.lastLoginTime==0">无</span>
								</template>
							</el-table-column>
							<el-table-column 
								align="center"
								prop="phone" 
								label="手机">
								<template slot-scope="scope">
									<span>{{ scope.row.phone?scope.row.phone:'无' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="head" label="直播" align="center">
								<template slot-scope="scope">
									<span>{{scope.row.livePower?'能':'否'}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作" width="180" align="center">
								<template slot-scope="scope">
									<div class="setFlex">
										<el-button
										type="primary" 
										plain 
										size="small"
										style="width: 90px;"
										@click="handleBlack(scope.row.id,scope.row.blacklist)">拉黑用户</el-button>
										<el-button
										type="primary" 
										plain 
										size="small"
										v-show="!scope.row.livePower"
										style="width: 90px; margin-top: 5px;"
										@click="handleAuthorization(scope.row.id,scope.row.livePower)">授权直播</el-button>
										<el-button
										type="primary" 
										plain 
										size="small"
										v-show="scope.row.livePower"
										style="width: 90px;margin-top: 5px;"
										@click="handleQuitAuthorization(scope.row.id,scope.row.livePower)">取消授权</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="黑名单" name="1">
						<Search @input="handleSearch"></Search>
						<el-table 
						:data="tableData" 
						style="width: 100%" 
						max-height="580"
						:row-class-name="tableRowClassName">
							<el-table-column prop="head" label="头像" align="center" width="180">
								<template slot-scope="scope">
									<div class="block">
										<el-avatar shape="square" :size="100" :src="scope.row.headImage"></el-avatar>
									</div>
									<!-- <img :src="scope.row.headImage" alt="" /> -->
								</template>
							</el-table-column>
							<el-table-column prop="info" label="用户信息" width="180">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>昵称:{{ scope.row.showName }}</li>
										<li>性别:{{ scope.row.sex == 1 ? '男' : '女' }}</li>
										<li>年龄:{{ scope.row.age }}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="注册时间">
								<template slot-scope="scope">
									<span>{{ scope.row.addTime|timeFormate }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="最近登录">
								<template slot-scope="scope">
									<span v-if="scope.row.lastLoginTime!=0">{{scope.row.lastLoginTime|timeFormate }}</span>
									<span v-if="scope.row.lastLoginTime==0">无</span>
								</template>
							</el-table-column>
							<el-table-column 
								align="center"
								prop="phone" 
								label="手机">
								<template slot-scope="scope">
									<span>{{ scope.row.phone?scope.row.phone:'无' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作">
								<template slot-scope="scope">
									<el-button 
									type="primary" 
									plain 
									size="small"
									@click="handleBlack(scope.row.id,scope.row.blacklist)">取消拉黑</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<Footer @currentPage="getApprovCurrentPage" :total="total"></Footer>
			</el-card>
		</div>
	</div>
</template>

<script>
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import Search from '../../components/serachK.vue';
import { getWxUserListAPI,addOrMoveBlackListAPI,addOrMoveListListAPI} from '../../api/api.js';
export default {
	components: {
		Footer,
		Breadcrumb,
		Search
	},
	data() {
		return {
			total:0,
			activeName: '0',
			loading: false,
			tableData: []
		};
	},
	methods: {
		//搜索
		handleSearch(val){
			this.getWxUserList(val, this.activeName,'1');
		},
		//下一页
		getApprovCurrentPage(val){
			console.log(val);
			this.getWxUserList('', this.activeName,val);
		},
		// 切换tab
		handleClick(tab) {
			this.activeName = tab.name;
			this.getWxUserList('', this.activeName, '1');
			console.log(tab);
		},
		tableRowClassName() {},
		handleQuitAuthorization(id,statues){
			let params={
				id:id,
				livePower:statues
			}
			addOrMoveListListAPI(params).then(res=>{
				if(res.status==1){
					this.$message({
						message:'取消授权成功',
						type:'success'
					})
					this.getWxUserList('', this.activeName, '1');
				}
			})
		},
		handleAuthorization(id,statues){
			let params={
				id:id,
				livePower:statues?statues:false
			}
			addOrMoveListListAPI(params).then(res=>{
				if(res.status==1){
					this.$message({
						message:'授权成功',
						type:'success'
					})
					this.getWxUserList('', this.activeName, '1');
				}
			})
		},
		// 拉黑
		handleBlack(id,statues) {
			console.log(id);
			console.log('拉黑');
			let params={
				id:id,
				blacklist:statues
			}
			addOrMoveBlackListAPI(params).then(res=>{
				this.getWxUserList('', this.activeName, '1');
			})
		},
		// 取消拉黑
		handleWhite(id) {
			console.log(id);
			console.log('取消拉黑');
		},
		//获取小程序用户列表
		getWxUserList(searchContent, blacklist, pageNumber) {
			let params = {
				searchContent: searchContent,
				pageSize: '10',
				pageNumber: pageNumber,
				blacklist: blacklist
			};
			getWxUserListAPI(params).then(res => {
				this.tableData = res.list;
				this.total=parseInt(res.totalRow)
				console.log('小程序用户', res);
			});
		}
	},
	created() {
		this.getWxUserList('', '0', '1');
	},
	filters: {
		timeFormate(time) {
			let timer = new Date(time * 1000);
			let y = timer.getFullYear();
			let m = timer.getMonth() + 1 < 10 ? '0' + (timer.getMonth() + 1) : timer.getMonth() + 1;
			let d = timer.getDate() > 9 ? timer.getDate() : '0' + timer.getDate();
			let h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
			let mint = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
			return y + '-' + m + '-' + d + ' ' + h + ':' + mint;
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
}
.el-button+.el-button{
	margin-left: 0;
}
.setFlex{
	display: flex;
	flex-direction: column;
}
.baseinfo {
	li {
		margin-top: 10px;
	}
}
img {
	height: 132px;
	width: 132px;
}
.box-card{
	// overflow-x: scroll !important;
	max-height: 750px;
	min-height: 700px;
}
</style>
