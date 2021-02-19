<template>
	<div class="footer">
		<!-- <span>共计10</span> -->
		<el-pagination 
		background 
		layout="prev, pager, next, jumper, ->, total" 
		@current-change="handleCurrentChange"
		:total="total" 
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	props:{
		total:{
			type:Number,
			default:0
		}
	},
	data() {
		return {};
	},
	methods: {
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.$emit("currentPage",val)
		}
	}
};
</script>

<style>
.footer {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
	padding-right: 40px;
	align-items: center;
	span {
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}
}
</style>
