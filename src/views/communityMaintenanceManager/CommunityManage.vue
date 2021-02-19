<template>
	<div class="commanage">
		<div class="top"><Breadcrumb></Breadcrumb></div>
		<div class="content">
			<el-card shadow="always" style="height: 800px;">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="待审核" name="0">
						<div style="display: flex;">
							<CommunityRegion @getArea="getArea"></CommunityRegion>
							<serach @input="handleSearch"></serach>
						</div>
						<el-table 
							style="width: 100%" 
							:data="tableData" 
							height="600"
							:row-class-name="tableRowClassName">
							<el-table-column prop="head" label="证明资质" align="center" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.supportingDocuments" 
										@click="handleImgPre(scope.row.supportingDocuments)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="info" label="身份证正面" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardFront" 
										@click="handleImgPre(scope.row.idcardFront)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="" label="身份证反面">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardBack" 
										@click="handleImgPre(scope.row.idcardBack)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="申请人信息">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>姓名:{{scope.row.userName}}</li>
										<li>手机号码:{{scope.row.phone}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="社区信息">
								<template slot-scope="scope">
									<ul class="address">
										<li>{{scope.row.area}}</li>
										<!-- <li>四川省成都市青羊区</li> -->
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作">
								<template slot-scope="scope">
									<div class="shenhe" @click="handleApprove(scope.row.id)">
										<i class=""></i>
										<span>审核</span>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="已通过" name="1">
						<div style="display: flex;">
							<CommunityRegion @getArea="getArea"></CommunityRegion>
							<serach @input="handleSearch"></serach>
						</div>
						<el-table 
							style="width: 100%" 
							:data="tableData" 
							height="600"
							:row-class-name="tableRowClassName">
							<el-table-column prop="head" label="证明资质" align="center" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.supportingDocuments" 
										@click="handleImgPre(scope.row.supportingDocuments)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="info" label="身份证正面" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardFront" 
										@click="handleImgPre(scope.row.idcardFront)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="" label="身份证反面">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardBack" 
										@click="handleImgPre(scope.row.idcardBack)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="申请人信息">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>姓名:{{scope.row.userName}}</li>
										<li>手机号码:{{scope.row.phone}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="社区信息">
								<template slot-scope="scope">
									<ul class="address">
										<li>{{scope.row.area}}</li>
										<!-- <li>四川省成都市青羊区</li> -->
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作">
								<template slot-scope="scope">
									<ul class="options">
										<li @click="handleApproveList(scope.row.id)">
											<i class=""></i>
											<span>审核记录</span>
										</li>
										<li @click="handleApprove(scope.row.id)">
											<i class=""></i>
											<span>重新审核</span>
										</li>
									</ul>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="未通过" name="2">
						<div style="display: flex;">
							<CommunityRegion @getArea="getArea"></CommunityRegion>
							<serach @input="handleSearch"></serach>
						</div>
						<el-table 
							style="width: 100%" 
							:data="tableData" 
							height="600"
							:row-class-name="tableRowClassName">
							<el-table-column prop="head" label="证明资质" align="center" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										@click="handleImgPre(scope.row.supportingDocuments)"
										:src="scope.row.supportingDocuments" 
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="info" label="身份证正面" width="180">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardFront" 
										@click="handleImgPre(scope.row.idcardFront)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="" label="身份证反面">
								<template slot-scope="scope">
									<el-image 
										style="width: 132px; height: 132px" 
										:src="scope.row.idcardBack" 
										@click="handleImgPre(scope.row.idcardBack)"
										:preview-src-list="srcList"></el-image>
								</template>
							</el-table-column>
							<el-table-column prop="date" label="申请人信息">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>姓名:{{scope.row.userName}}</li>
										<li>手机号码:{{scope.row.phone}}</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="社区信息">
								<template slot-scope="scope">
									<ul class="address">
										<li>{{scope.row.area}}</li>
										<!-- <li>四川省成都市青羊区</li> -->
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作">
								<template slot-scope="scope">
									<ul class="options">
										<li @click="handleApproveList(scope.row.id)">
											<i class=""></i>
											<span>审核记录</span>
										</li>
										<!-- 			<li>
											<i class=""></i>
											<span>重新审核</span>
										</li> -->
									</ul>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<Footer @currentPage="getCurrentPage" :total="totalRow"></Footer>
			</el-card>
		</div>

		<el-dialog title="审核" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 审核记录对话框 -->
		<el-dialog title="审核记录" :visible.sync="recodringVisible" width="40%" center :before-close="handleClose">
			<div>
				<el-table :data="approveList">
					<el-table-column property="approveTime" label="日期" width="150">
						<template slot-scope="scope">
							<p>{{ scope.row.approveTime | timeFormate }}</p>
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
import serach from '../../components/serachK.vue';
import Footer from '../../components/footer.vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import CommunityRegion from './components/communityRegion.vue'
import { getSqManagerListAPI, approveSqManagerAPI, getApproveRecordsAPI} from '../../api/api.js';
import { bus } from '../../utils/bus.js';
export default {
	data() {
		return {
			areaCode:'',
			recodringVisible:false,
			approveList: [],
			userInfo: '',
			pageSize: 10,
			totalRow:0,
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			srcList: [],
			textarea: '',
			radio: '1',
			dialogVisible: false,
			activeName: '0',
			tableData: [],
			currentId: ''
		};
	},
	components: {
		serach,
		Footer,
		Breadcrumb,
		CommunityRegion
	},
	methods: {
		handleImgPre(val){
			this.srcList.push(val)
		},
		getArea(val){
			this.areaCode=val
			this.getSqManagerList('', this.activeName,val, 1);
		},
		handleSearch(val){
			this.getSqManagerList(val, this.activeName,this.areaCode, 1);
		},
		handleApproveList(id){
			let p={
				contentId:id,
				type:'sqfzr',
				pageSize:'10',
				pageNumber:1
			}
			getApproveRecordsAPI(p).then(res=>{
				this.approveList=res.list
				this.recodringVisible=true
			})
		},
		handleApprove(id) {
			this.currentId = id;
			this.dialogVisible = true;
		},
		getCurrentPage(val) {
			this.getSqManagerList('', this.activeName,this.areaCode, val);
		},
		getSqManagerList(searchContent, audit, communityId,pageNumber) {
			let p = {
				searchContent: searchContent,
				audit: audit,
				communityId: communityId,
				pageSize: '10',
				pageNumber: pageNumber
			};
			getSqManagerListAPI(p).then(res => {
				console.log('list:', res);
				this.tableData = res.list;
				this.totalRow = res.totalRow;
			});
		},
		handleClick(tab) {
			console.log(tab);
			this.getSqManagerList('', tab.name,'5101', 1);
		},
		handleClose(done) {
			done();
		},
		tableRowClassName() {},
		handleSubmit() {
			let content = this.textarea;
			let radio = this.radio;
			console.log(radio, content);
			let p = {
				id: this.currentId,
				approvePerson: this.userInfo.personname,
				audit: radio,
				audit_desc: content
			};
			approveSqManagerAPI(p).then(res => {
				this.dialogVisible = false;
				this.getSqManagerList('', this.activeName,this.areaCode, 1);
			});
		}
	},
	created() {
		this.getSqManagerList('', '0','5101', 1);
		this.userInfo = bus.userInfo == {} ? bus.userInfo : JSON.parse(localStorage.getItem('userInfo'));
	},
	filters: {
		timeFormate(time) {
			let timer = new Date(time * 1000);
			let y = timer.getFullYear();
			let m = timer.getMonth() + 1 < 10 ? '0' + (timer.getMonth() + 1) : timer.getMonth() + 1;
			let d = timer.getDate() > 10 ? timer.getDate() : '0' + timer.getDate();
			let h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
			let mint = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
			return y + '-' + m + '-' + d + ' ' + h + ':' + mint;
		}
	}
};
</script>

<style lang="less" scoped>
img {
	height: 132px;
	width: 132px;
}
.content {
	margin-top: 40px;
}
.address {
	text-align: center;
}
.shenhe {
	cursor: pointer;
	display: flex;
	align-items: center;
	i {
		font-size: 24px;
	}
	color: rgba(26, 114, 200, 1);
	font-size: 14px;
	text-align: left;
	font-family: SourceHanSansSC-regular;
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
.options {
	color: rgba(8, 8, 8, 1);
	font-size: 14px;
	text-align: left;
	cursor: pointer;
	font-family: SourceHanSansSC-regular;
	li:nth-child(2) {
		color: rgba(52, 128, 204, 1);
	}
}
</style>
