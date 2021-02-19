<template>
	<div>
<!-- 		<qqmap></qqmap>
		<el-upload
		  class="upload-demo"
		  drag
		  action="https://jsonplaceholder.typicode.com/posts/"
		  multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload> -->
		
		 <el-button type="primary" @click="handleClick">主要按钮</el-button>
	</div>
</template>

<script>
	import qqmap from '../components/qqMap.vue'
	export default{
		components:{
			qqmap
		},
		methods:{
			handleClick(){
				// console.log('start');
				// this.$bus.$emit('name','jack')
				// this.$bus.$on(name,(res)=>{
				// 	console.log(res);
				// })
			}
		},
		created() {
			console.log('start');
			this.$bus.$emit('name','jack')
			this.$bus.$on(name,(res)=>{
				console.log(res);
			})
		}
	}
</script>