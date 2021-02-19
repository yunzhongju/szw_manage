<template>
	<div>
		<div>
			<Breadcrumb></Breadcrumb>
			<div class="content">
				<el-card shadow="always" class="box-card">
					<el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="新闻" name="1">
								<el-tag
								:key="tag.id" 
								v-for="tag in dynamicTags" 
								closable 
								@click="onEditor(tag.id)"
								:disable-transitions="false" 
								style="width: 97px; height: 52px;font-size: 14px;line-height: 52px;text-align: center;"
								@close="handleDelete(tag.id)">{{ tag.title }}</el-tag>
								<el-input
									class="input-new-tag"
									v-if="inputVisible"
									v-model="inputValue"
									ref="saveTagInput"
									size="small"
									style="width: 97px; height: 52px;font-size: 14px;line-height: 52px;"
									@keyup.enter.native="handleInputConfirm"
									@blur="onInputConfirm"
								></el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
							</el-tab-pane>
					    <el-tab-pane label="视频" name="2">
								<el-tag
								:key="tag.id" 
								v-for="tag in dynamicTags" 
								closable 
								@click="onEditor(tag.id)"
								:disable-transitions="false" 
								style="width: 97px; height: 52px;font-size: 14px;line-height: 52px;text-align: center;"
								@close="handleDelete(tag.id)">{{ tag.title }}</el-tag>
								<el-input
									class="input-new-tag"
									v-if="inputVisible"
									v-model="inputValue"
									ref="saveTagInput"
									size="small"
									style="width: 97px; height: 52px;font-size: 14px;line-height: 52px;"
									@keyup.enter.native="handleInputConfirm"
									@blur="onInputConfirm"
								></el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
							</el-tab-pane>
					</el-tabs>
				</el-card>
				
				<el-dialog
				  title="编辑标签"
				  :visible.sync="dialogVisible"
				  width="20%"
					center
				  :before-close="handleClose">
				  <el-input 
					v-model="input" 
					@keyup.enter.native="onSubmit"
					placeholder="请输入标签名称">
					</el-input>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="onSubmit">确 定</el-button>
				  </span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import Breadcrumb from '../../components/breadcrumb.vue';
import {getTagsListAPI,deleteTagsAPI,saveTagAPI} from '../../api/api.js'
export default {
	components: {
		Breadcrumb
	},
	data() {
		return {
			dialogVisible:false,
			input:'',
			dynamicTags:[],
			inputVisible: false,
			inputValue: '',
			activeName:'1',
			type:'1',
			currentTagId:''
		};
	},
	methods: {
		onInputConfirm(){
			this.inputVisible=false
		},
		getTagsList(type){
			let p={
				type:type,
				pageSize:'10',
				pageNumber:'1'
			}
			getTagsListAPI(p).then(res=>{
				console.log('标签列表',res);
				this.dynamicTags=res.list
			})
		},
		handleClose(done){
			this.dialogVisible=false
		},
		handleClick(tab, event) {
			console.log(tab);
			this.type=tab.name
			this.getTagsList(this.type)
		},
		handleDelete(tag) {
			console.log('id',tag);
			let p ={
				id:tag
			}
			deleteTagsAPI(p).then(res=>{
				console.log('result',res);
				this.getTagsList(this.type)
			})
		},

		showInput() {
			this.inputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		//编辑标签
		onEditor(id){
			console.log(id);
			this.currentTagId=id
			this.dialogVisible=true
		},
		handleInputConfirm() {
			if(this.inputValue==''){
				return
			}
			let inputValue = this.inputValue;
			let p={
				id:'',
				title:this.inputValue,
				type:this.type
			}
			console.log('befor',p);
			saveTagAPI(p).then(res=>{
				console.log('result',res);
				this.inputVisible = false;
				this.inputValue = '';
				this.getTagsList(this.type)
			})
		},
		//编辑提交
		onSubmit(){
			let p={
				id:this.currentTagId,
				title:this.input,
				type:this.type
			}
			console.log(p);
			saveTagAPI(p).then(res=>{
				console.log(res);
				this.getTagsList(this.type)
				this.input=''
				this.dialogVisible=false
			})
		},
	},
	created() {
		this.getTagsList('1')
	}
};
</script>

<style lang="less" scoped>
	.content{
		margin-top: 40px;
	}
.el-tag + .el-tag {
	margin-left: 35px;
	margin-bottom: 20px;
	// margin-top: 43px;
}
.el-tab-pane{
	display: flex;
	flex-wrap: wrap;
	span:nth-child(1){
		margin-left: 35px;
	}
}
.button-new-tag {
	// margin-top: 43px;
	margin-left: 35px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
	width: 97px;
	height: 52px;
	font-size: 14px;
	line-height: 52px;
	text-align: center;
}
.input-new-tag {
	width: 90px;
	height: 52px;
	margin-left: 10px;
	vertical-align: bottom;
}
.box-card{
	min-height: 700px;
	max-height: 800px;
}
</style>
