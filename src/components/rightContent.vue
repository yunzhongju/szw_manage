<template>
	<div class="right-content">
		<div><router-view></router-view></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			sub: ''
		};
	},
	created() {
		this.$bus.$on('bread', res => {
			this.title = res.title;
			this.sub = res.sub;
		});
	}
};
</script>

<style lang="less" scoped>
	.right-content{
		
	}
</style>
