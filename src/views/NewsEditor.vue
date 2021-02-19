<template>
	<div class="newseditor">
		<div class="top">
			<!-- <Breadcrumb></Breadcrumb> -->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">新闻编辑</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="新闻封面" prop="img">
					<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" >
						<div slot="tip" class="el-upload__tip">建议图片尺寸：720px×405px ，图片大小不超过15M</div>
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{ file }">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
							<span class="el-upload-list__item-actions">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i class="el-icon-zoom-in"></i></span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"><i class="el-icon-download"></i></span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
							</span>
						</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
				</el-form-item>
				<el-form-item label="文章标题" prop="title"><el-input v-model="ruleForm.title" style="width: 544px;" placeholder="必填内容"></el-input></el-form-item>
				<el-form-item label="所属区域" prop="region"><el-input v-model="ruleForm.region" style="width: 544px;" placeholder="必填内容"></el-input></el-form-item>
				<el-form-item label="文章分类" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择" style="width: 542px;">
						<el-option label="上海" value="shanghai"></el-option>
						<el-option label="北京" value="beijing"></el-option>
					</el-select>
				</el-form-item>
					<el-form-item label="浏览量" prop="pageviews"><el-input v-model="ruleForm.pageviews" style="width: 544px;"></el-input></el-form-item>
				<el-form-item label="文章来源" prop="source"><el-input v-model="ruleForm.source" style="width: 544px;" placeholder="必填内容"></el-input></el-form-item>
				<el-form-item label="内容详情" prop="content"><CKEfitor @input="getContent"></CKEfitor></el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
// import CKEfitor from '../components/ckeditor.vue'
import Breadcrumb from '../components/breadcrumb.vue'
export default {
	components: {
		CKEfitor,
		Breadcrumb
	},
	data() {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			disabled: false,
			ruleForm: {
				img:'dasd',
				title: '',
				region:'',
				type: '',
				source: '',
				pageviews:'',
				content: ''
			},
			rules: {
				img: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
				title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
				region: [{ required: true, message: '请输入所属区域', trigger: 'blur' }],
				type:[{ required: true, message: '请选择文章分类', trigger: 'blur' }],
				source:[{ required: true, message: '请输入来源', trigger: 'blur' }],
				content:[{ required: true, message: '请输入内容', trigger: 'blur' }],
				pageviews: [{ required: true, message: '请输入浏览量', trigger: 'blur' }],
			}
		};
	},
	methods: {
		submitForm(formName) {
			console.log(this.$refs[formName]);
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log(this.ruleForm);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			// this.$router.push('/home/newsmanage');
			this.$refs[formName].resetFields();
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		getContent(event) {
			this.ruleForm.content=event
			console.log(this.ruleForm.content)
		}
	}
};
</script>

<style lang="less" scoped>
.newseditor {
	.content {
		margin-top: 40px;
		padding-right: 100px;
		// 表单
		.form {
			.form-upload {
				margin-left: 10px;
				margin-top: 30px;
			}
			p {
				color: rgba(16, 16, 16, 1);
				font-size: 14px;
				text-align: left;
				span {
					margin-right: 42px;
				}
			}
		}
		.head {
			display: flex;
			justify-content: space-between;
			padding-right: 80px;
			ul {
				display: flex;
				li {
					margin-left: 5px;
				}
			}
		}
	}
}

// 加红*
.addRedStar:before {
	content: '*';
	color: red;
	font-size: 18px;
}
// .uploadicon{
// 	display: flex;
// 	flex-direction: column;
// 	overflow: hidden;
// 	span{
// 		width: 84px;
// 		height: 21px;
// 		color: rgba(16, 16, 16, 1);
// 		font-size: 14px;
// 	}
// }
</style>
