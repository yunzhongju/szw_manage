<template>
	<div>
		<el-row :gutter="10">
		  <el-col :span="12"><div class="grid-content bg-purple">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<label for="" class="show-label">发布状态:</label>
						<el-radio-group v-model="pubStatue" @change="handlePubSta">
							<el-radio :label="0">未发布</el-radio>
							<el-radio :label="2">未开始</el-radio>
							<el-radio :label="3">已开始</el-radio>
							<el-radio :label="4">已结束</el-radio>
						</el-radio-group>
					</div></el-col>
				</el-row>
				<el-row style="margin-top: 20px;">
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<label for="" class="show-label">审核状态:</label>
						<el-radio-group v-model="ApprStatue" @change="handleApprSta">
							<el-radio :label="0">待审核</el-radio>
							<el-radio :label="1">已通过</el-radio>
							<el-radio :label="2">未通过</el-radio>
						</el-radio-group>
					</div></el-col>
				</el-row>
			</div></el-col>

		  <el-col :span="8"><div class="grid-content bg-purple">
				<el-input v-model="input" placeholder="请输入标题" style="width: 50%;" clearable></el-input>
				<el-button type="primary" class="addBtn" @click="handleSearch">搜索</el-button>
			</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple">
				<el-button type="primary" @click="$router.push('/home/onlineselection/addactive')">新增活动</el-button>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pubStatue: "",
			ApprStatue:'',
			input: '',
			options: [
				{
					value: '0',
					label: '未发布'
				},

				{
					value: '2',
					label: '未开始'
				},
				{
					value: '3',
					label: '已开始'
				},
				{
					value: '4',
					label: '已结束'
				}
			],
			approStatus: [
				{
					value: '0',
					label: '待审核'
				},
				{
					value: '1',
					label: '已通过'
				},

				{
					value: '2',
					label: '未通过'
				}
			]
		};
	},
	methods:{
		handlePubSta(val){
			console.log('发布',val);
			this.$emit('getPubSta',val)
		},
		handleApprSta(val){
			console.log('审核',val);
			this.$emit('getApprSta',val)
		},
		handleSearch(){
			this.$emit('getInput',this.input)
		}
	}
};
</script>

<style lang="less" scoped>
div {
}
ul {
	margin-bottom: 10px;
	border-bottom: 1px solid gainsboro;
	width: 100%;
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	li {
		margin-right: 50px;
	}
}
.addBtn {
	margin-left: 20px !important;
}
.show-label{
	font-size: 14px;
	padding: 0 10px;
}
</style>
