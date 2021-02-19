<template>
	<div class="serach">
		<ul class="right">
			<li><el-input 
				v-model="input" 
				placeholder="搜索关键词" 
				style="width: 404px;" 
				size="small"
				clearable></el-input></li>
			<li><el-button 
				type="primary" 
				size="small"
				@click="handleSerach">搜索</el-button></li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: ''
		};
	},
	methods: {
		handleSerach() {
			let text = this.input;
			this.$emit('input',text)
			// console.log(text);
		}
	}
};
</script>

<style lang="less" scoped>
.serach {
	display: flex;
	justify-content: flex-end;
	.right {
		display: flex;
		// width: 250px;
		margin-right: 62px;
		li:nth-child(2) {
			margin-left: 10px;
		}
	}
}
</style>
