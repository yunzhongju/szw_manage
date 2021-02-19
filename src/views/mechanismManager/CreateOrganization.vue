<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home/commmanager' }">机构管理</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/home/create_organization">创建机构</a></el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			<div style="width: 50%;">
				<el-form
					:model="orgForm" 
					ref="numberValidateForm" 
					label-width="100px">
					<el-form-item
					  label="所属区划"
					  :rules="[{ required: true, message: '所属区划不能为空'}]">
					  <el-cascader
					  	:props="props"
					  	clearable
							style="width: 100%;"
					  	v-model="orgForm.communityId" 
					  	:options="areas"
					  	ref="myregon"
					  	placeholder="请选择区域">
					  </el-cascader>
					</el-form-item>
				  <el-form-item
				    label="组织名称"
						prop="title"
				    :rules="[{ required: true, message: '组织名称不能为空'}]">
				    <el-input v-model="orgForm.title"></el-input>
				  </el-form-item>
					<el-form-item
					  label="负责人"
						prop="leader"
					  :rules="[{ required: true, message: '负责人不能为空'}]">
					  <el-input v-model="orgForm.leader"></el-input>
					</el-form-item>
					<el-form-item
					  label="联系方式"
						prop="phone"
					  :rules="[{ required: true, message: '联系方式不能为空'}]">
					  <el-input v-model="orgForm.phone"></el-input>
					</el-form-item>
					<el-form-item
					  label="机构代码"
						prop="code"
					  :rules="[{ required: true, message: '机构代码不能为空'}]">
					  <el-input v-model="orgForm.code"></el-input>
					</el-form-item>
					<el-form-item
					  label="创建人"
						prop="createPerson"
					  :rules="[{ required: true, message: '创建人不能为空'}]">
					  <el-input v-model="orgForm.createPerson" disabled></el-input>
					</el-form-item>
					<el-form-item
					  label="机构证书"
						prop="coverImg"
					  :rules="[{ required: true, message: '机构证书不能为空'}]">
					  <ImgUp @getImageUrl="getImageUrl"></ImgUp>
						<span 
							v-if="orgForm.coverImg">
								<img :src="orgForm.coverImg" style="width: 360px;height: 180px;">
							</span>
					</el-form-item>
					<el-form-item
					  label="封面摄影"
						prop="coverPhoto"
					  :rules="[{ required: true, message: '封面摄影不能为空'}]">
					  <ImgUp @getImageUrl="getcoverPhotoUrl"></ImgUp>
						<span 
							v-if="orgForm.coverPhoto">
							<img :src="orgForm.coverPhoto" style="width: 360px;height: 180px;">
						</span>
					</el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
				    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
						<el-button @click="$router.go(-1)">返回</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import ImgUp from '../onlineSelection/addActive/imgUp.vue'
	import {getAreasAPI,saveOrganizationAPI,getOrgDetailByIdAPI} from '../../api/api.js'
  export default {
		components:{
			ImgUp
		},
    data() {
      return {
				userInfo:'',
        orgForm: {
					id:'',
					title:'',
					coverImg:'',
					coverPhoto:'',
					createPerson:'',
					leader:'',
					phone:'',
					communityId:["510000", "510100"],
					code:''
        },
				props: {
					 checkStrictly: true,
					 lazy: true,
					 lazyLoad: this.lazyLoad
				},
				region:[]
      };
    },
    methods: {
			//加载方法
			lazyLoad(node, resolve) {
				setTimeout(() => {
					this.getProvence(node, resolve)
				}, 1000)
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
			getcoverPhotoUrl(url){
				this.orgForm.coverPhoto=url
			},
			getImageUrl(url){
				this.orgForm.coverImg=url
			},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
							id:this.orgForm.id,
							title:this.orgForm.title,
							coverImg:this.orgForm.coverImg,
							coverPhoto:this.orgForm.coverPhoto,
							createPerson:this.orgForm.createPerson,
							leader:this.orgForm.leader,
							phone:this.orgForm.phone,
							communityId:this.orgForm.communityId[this.orgForm.communityId.length-1],
							code:this.orgForm.code
						}
						saveOrganizationAPI(params).then(res=>{
							console.log(res,1111111111);
							if(res.status==1){
								this.$message({
									message:"创建成功",
									type:"success"
								})
								this.$router.go(-1)
							}else{
								this.$message({
									message:res.msg,
									type:"warning"
								})
							}
						})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
			getCurrent(id){
				if(id){
					getOrgDetailByIdAPI({id:id}).then(res=>{
						console.log(res,2222222222);
						this.orgForm.title=res.title
						this.orgForm.leader=res.leader
						this.orgForm.phone=res.phone
						this.orgForm.code=res.code
						this.orgForm.createPerson=res.createPerson
						this.orgForm.coverImg=res.coverImg
						this.orgForm.coverPhoto=res.coverPhoto
						this.orgForm.communityId=res.areapath
					})
				}
			}
    },
		created() {
			this.orgForm.id=this.$route.query.id
			this.getCurrent(this.orgForm.id)
			this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
			this.orgForm.createPerson=this.userInfo.personname
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
		},
  }
</script>

<style scoped>
	.box-card{
		margin-top: 30px;
		min-height: 700px;
	}
</style>
