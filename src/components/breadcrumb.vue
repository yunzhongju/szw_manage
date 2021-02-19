<template>
	<div class="">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">{{nav[0]}}</el-breadcrumb-item>
			<el-breadcrumb-item><a href="">{{nav[1]}}</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
import { bus } from '../utils/bus.js';
export default {
	data() {
		return {
			nav: []
		};
	},
	created() {
		// console.log('面包导航',bus.nav);
		this.nav=bus.nav
	},
	mounted() {
		// console.log('面包导航1',this.nav);
	},
	computed: {}
};
</script>

<style></style>
