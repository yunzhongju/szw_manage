<template>
	<div class="serach">
		<div v-if="title">
			<el-button type="primary" icon="el-icon-plus" size="medium" @click="addNews">{{ title }}</el-button>
		</div>
		<ul>
			<li><el-input v-model="input" placeholder="搜索关键词" autosize clearable></el-input></li>
			<li><el-button type="primary" icon="el-icon-search" @click="handleSerach">搜索</el-button></li>
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
	props: {
		title: String
	},
	methods: {
		addNews() {
			this.$router.push('/home/newseditor');
		},
		// 搜索按钮
		handleSerach() {
			let text = this.input;
			console.log(text);
		}
	}
};
</script>

<style lang="less" scoped>
.serach {
	display: flex;
	justify-content: space-between;
	ul {
		display: flex;
		li {
			margin-right: 50px;
		}
		li:nth-child(1) {
			width: 404px;
		}
	}
	div {
		flex: 1;
		margin-left: 20px;
	}
}
</style>
