<template>
	<div class="createcomm">
		<div class="top">
		 <Breadcrumb></Breadcrumb>
		</div>
		<div class="content">
			<el-card shadow="always">
				<el-form 
					:model="ruleForm" 
					:rules="rules" 
					ref="ruleForm" 
					label-width="100px" 
					class="demo-ruleForm">
					<el-form-item
						label="父级区划"
						prop="parentId">
						<el-cascader
							:props="props"
							clearable
							v-model="ruleForm.parentId" 
							:options="areas"
							ref="myregon"
							placeholder="请选择区域"
							style="width: 544px;">
						</el-cascader>
					</el-form-item>
					<el-form-item
						label="行政代码"
						prop="orgid">
						<el-input 
							:disabled="isDisable" 
							v-model="ruleForm.orgid" 
							style="width: 552px;" 
							placeholder="必填内容">
						</el-input>
					</el-form-item>
					<el-form-item
						label="名称"
						prop="orgname">
						<el-input 
							v-model="ruleForm.orgname" 
							style="width: 552px;" 
							placeholder="必填内容">
						</el-input>
					</el-form-item>
					<el-form-item 
						label="上传封面">
						<div class="preview">
							<ImgUp 
								@getImageUrl="getImageFUrl"></ImgUp>
							<span 
								v-if="ruleForm.coverImage">
								<img :src="ruleForm.coverImage" alt="">
							</span>
						</div>
					</el-form-item>
					<el-form-item
						label="封面摄影">
						<div class="preview">
							<ImgUp @getImageUrl="getImageUrl"></ImgUp>
							<span v-if="ruleForm.imagePath">
									<img :src="ruleForm.imagePath" alt="">
							</span>
						</div>
					</el-form-item>
					<el-form-item
						label="封面名称">
						<el-input 
							v-model="ruleForm.imageName" 
							style="width: 552px;">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						<el-button @click="resetForm('ruleForm')">取消</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import qqmap from '../../components/qqMap.vue'
import Breadcrumb from '../../components/breadcrumb.vue'
import ImgUp from '../onlineSelection/addActive/imgUp.vue'
import {getAreasAPI,saveCommunityAPI,getAreaDetailByIdAPI} from '../../api/api.js'
import {bus} from '../../utils/bus.js'
export default {
	components:{
		qqmap,
		Breadcrumb,
		ImgUp
	},
	data() {
		return {
			isDisable:false,
			pull: { city: '510100', County: '', street: '', community: '' },
			citys: [{ value: '510100', label: '成都市' }],
			county: [],
			street: [],
			status_value: '',
			status: '',
			communities: [],
			region:[], //行政区划
			isshow:true,
			dialogVisible:false,
			imageUrl:"",
			ruleForm: {
				orgid:'',
				parentId:["510000", "510100"],
				address:'',
				orgname:'',
				coverImage:'',
				imagePath:'',
				imageName:'',
				region:["510000", "510100"],
			},
			rules: {
				orgid: [{ required: true, message: '请输入行政代码', trigger: 'blur' }],
				parentId: [{ required: true, message: '请选择父级区划', trigger: 'blur' }],
				orgname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
			},
			props: {
				 checkStrictly: true,
				 lazy: true,
				 lazyLoad: this.lazyLoad
			},
		};
	},
	methods:{
		//加载方法
		lazyLoad(node, resolve) {
			setTimeout(() => {
				this.getProvence(node, resolve)
			}, 1000)
		},
		//获取行政区划
		getAreas(pid=''){
			let p={parentId:pid}
			getAreasAPI(p).then(res=>{
				this.region=res
				console.log('行政区划',res);
			})
		},
		getProvence(node, resolve){
			console.log('节点',node);
			// 510000
			// node.data.value
			getAreasAPI({parentId:node.data?node.data.value:''}).then(res=>{
				 const nodes = res.map(item=>({
					 value: item.orgid, // 
					 label: item.orgname,
					 leaf: node.level >= 5 // 5层级
				 }))
				 resolve(nodes)
			})
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
		handleNextComm(val){
			this.ruleForm.parentId=val
			if (this.pull.street) {
				getAreasAPI({ parentId: this.pull.street }).then(res => {
					this.communities = res;
				});
			}
		},
		handleCurrent(val){
			console.log(val);
			this.ruleForm.orgid=val
		},
		getImageUrl(val){
			this.ruleForm.imagePath=val
		},
		getImageFUrl(val){
			this.ruleForm.coverImage=val
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params={
						orgid: this.ruleForm.orgid,
						parentId : this.ruleForm.parentId[this.ruleForm.parentId.length-1] ,
						orgname : this.ruleForm.orgname ,
						coverImage: this.ruleForm.coverImage,
						imagePath: this.ruleForm.imagePath,
						imageName:this.ruleForm.imageName
					}
					saveCommunityAPI(params).then(res=>{
						this.$message({
							message:"提交成功",
							type:"success"
						})
						this.$router.push('/home/communityList')
					})
				} else {
					this.$message('提交失败！')
					return false;
				}
			});
		},
		resetForm(fname){
			 this.$refs[fname].resetFields();
			 this.$router.push('/home/communityList')
		},
		handleCurrentComm(){
			let id=this.$route.query.id
			if(!id){
				return
			}
			getAreaDetailByIdAPI({orgid:id}).then(res=>{
				console.log(111111,res);
				this.ruleForm.parentId=res.parentAreaPath
				this.ruleForm.orgname=res.orgname
				this.ruleForm.orgid=res.orgid
			})
		}
	},
	created() {
		this.handleCurrentComm()
		this.getAreas()
	},
	computed:{
		areas(){
			let newAreas=[]
			this.region.forEach((item,index)=>{
				let p={
					value:item.orgid,
					label:item.orgname,
				}
				newAreas.push(p)
			})
			return newAreas
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
}
.showImg{
	position: relative;
	padding: 10px 10px;
	i{
		color: red;
		position: absolute;
		top: -15px;
		right: -25px;
		border-radius: 50%;
		padding: 1px 1px;
		font-size: 20px;
		width: 30px;
		height: 30px;
		background-color: #000000;
		opacity: 0.3;
		text-align: center;
		font-weight: 600;
		cursor: pointer;
		line-height: 30px;
	}
}
.preview{
	display: flex;
	span{
		margin-left: 50px;
		width: 360px;
		height: 180px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	
}
</style>
