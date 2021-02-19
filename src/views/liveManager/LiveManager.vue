<template>
	<div>
		<Breadcrumb></Breadcrumb>
		<el-card class="box-card">
			<el-row  style="margin-top: 30px;display: flex;align-items: center;">
				<el-col :span="6"><div class="grid-content bg-purple-dark" style="display: flex;">
					<el-input 
						v-model="input" 
						size="medium"
						placeholder="请输入房间名称"></el-input>
					<el-button 
						type="primary" 
						size="medium"
						@click="handleSearch"
						style="margin-left: 10px;">搜索</el-button>
				</div></el-col>
				<el-col :span="15"><div class="grid-content bg-purple-dark" style="margin-left: 30px;">
					<el-radio-group v-model="radio" @change="handleChooseType">
						<el-radio :label="2">全部</el-radio>
						<el-radio :label="0">直播</el-radio>
						<el-radio :label="1">推流</el-radio>
					</el-radio-group>
					<el-select 
						v-model="value" 
						size="medium" 
						@change="handleChooseStatus"
						placeholder="请选择直播状态" 
						style="margin-left: 30px;">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div></el-col>
			</el-row>
			<el-row style="margin-top: 30px;">
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<el-table 
							:data="tableData" 
							height="550"
							style="width: 100%">
							<el-table-column 
								align="center"
								label="最近开播">
								<template slot-scope="scope">
									<div class="recent">
										<span>{{scope.row.startTime}}</span>
										<span>至</span>
										<span>{{scope.row.endTime}}</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column 
								prop="name" 
								label="直播间信息">
								<template slot-scope="scope">
									<div class="live-info">
										<div>
											<el-image
												style="width: 125px; height: 100px;border-radius: 10px;"
												:src="scope.row.coverImg"
												fit="cover"></el-image>
										</div>
										<div class="item-info">
											<p>{{scope.row.roomName}}</p>
											<div>
												<span>房间号: {{scope.row.roomId}}</span>
												<span>主播: {{scope.row.anchorName}}</span>
												<span>微信号: {{scope.row.wxcode}}</span>
											</div>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column 
								prop="address" 
								align="center"
								label="直播状态">
								<template slot-scope="scope">
									<span>{{scope.row.liveStatus==102?'未开始':scope.row.liveStatus==101?'直播中':scope.row.liveStatus==103?'已结束':scope.row.liveStatus==104?'禁播':scope.row.liveStatus==105?'暂停':scope.row.liveStatus==106?'异常':scope.row.liveStatus==107?'已过期':'已删除'}}</span>
								</template>
							</el-table-column>
							<el-table-column 
								width="180" 
								align="center" 
								label="操作">
								<template slot-scope="scope">
									<el-button
										@click="handleGetUrl(scope.row)"
										v-show="radio==1&&scope.row.liveStatus==102" 
										type="text">推流地址</el-button>
									<el-button
										@click="deleteRoomById(scope.row)"
										v-show="scope.row.liveStatus!=108"
										type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24"><div class="grid-content bg-purple-dark">
					<Footer @currentPage="getCurrentPage" :total="total"></Footer>
				</div></el-col>
			</el-row>
		</el-card>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="50%"
			center
		  :before-close="handleClose">
		  <ul class="show-miyao">
		  	<li>服务名: {{serveName}}</li>
		  	<li>推流密钥: {{code}}</li>
		  	<li>操作步骤:复制服务名和推流密钥至推流工具中进行推流,完成推流后进入
				<a 
					style="color: blue;" 
					target="_blank"
					href="https://live.weixin.qq.com/livemp/login">控制台</a>开播。</li>
		  </ul>
		</el-dialog>
	</div>
</template>

<script>
import Breadcrumb from '../../components/breadcrumb.vue';
import Footer from '../../components/footer.vue'
import {getPushUrlAPI,deleteRoomByIdAPI,getRoomListAPI} from '../../api/api.js'
export default {
	components: {
		Breadcrumb,
		Footer
	},
	data() {
		return {
			dialogVisible:false,
			pushAddr:"",
			pageNumber:1,
			pageSize:10,
			radio:2,
			input:'',
			total:0,
			tableData: [],
			value: '',
			options: [{
			          value: '101',
			          label: '直播中'
			        },{
			          value: '102',
			          label: '未开始'
			        },{
			          value: '103',
			          label: '已结束'
			        },{
			          value: '104',
			          label: '禁播'
			        },{
			          value: '105',
			          label: '暂停'
			        },{
			          value: '106',
			          label: '异常'
			        },{
			          value: '107',
			          label: '已过期'
			        },{
			          value: '108',
			          label: '已删除'
			        }],
		};
	},
	methods:{
		handleClose(done){done()},
		handleSearch(){
			this.getRoomList({pageSize:this.pageSize,pageNumber:this.pageNumber,type:this.radio,roomName:this.input})
		},
		getCurrentPage(page){
			this.getRoomList({pageSize:this.pageSize,pageNumber:page,type:this.radio,liveStatus:status})
		},
		copy(row){
			console.log(row);
		},
		deleteRoomById(row){
			this.$confirm('此操作将删除该直播视频, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteRoomByIdAPI({roomId:row.roomId}).then(res=>{
						this.$message({
							message:"删除成功",
							type:'success'
						})
						this.getRoomList({pageSize:this.pageSize,pageNumber:this.pageNumber,type:this.radio,liveStatus:status})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
		},
		handleChooseStatus(status){
			this.getRoomList({pageSize:this.pageSize,pageNumber:this.pageNumber,type:this.radio,liveStatus:status})
		},
		handleChooseType(type){
			this.getRoomList({pageSize:this.pageSize,pageNumber:this.pageNumber,type:this.radio})
		},
		handleGetUrl(row){
			getPushUrlAPI({roomId:row.roomId}).then(res=>{
				this.pushAddr=res.pushAddr
				this.dialogVisible=true
			})
		},
		getRoomList(args){
			getRoomListAPI(args).then(res=>{
				console.log(res);
				this.tableData=res.list
				this.total=res.totalRow,
				this.pageNumber=res.pageNumber
			})
		}
	},
	created() {
		this.getRoomList({pageSize:this.pageSize,pageNumber:this.pageNumber,type:this.radio})
	},
	computed:{
		serveName(){
			if(this.pushAddr){
				return this.pushAddr.match('rtmp://(.*?)/live/')[0]
			}
		},
		code(){
			let add=this.pushAddr.split('/')
			return add[add.length-1]
		}
	}
};
</script>

<style scoped>
.box-card {
	height: 750px;
	margin-top: 30px;
}
.recent{
	display: flex;
	flex-direction: column;
}
.live-info{
	display: flex;
}
.item-info{
	margin-left: 20px;
}
.item-info p{
	font-size: 18px;
	color: #000000;
	font-weight: 700;
}
.item-info div{
	margin-top: 10px;
	display: flex;
	flex-direction: column;
}
.show-miyao{
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 18px;
}
.show-miyao li{
	margin-bottom: 20px;
}
</style>
