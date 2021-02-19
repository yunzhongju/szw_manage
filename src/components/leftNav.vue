<template>
	<el-aside>
		<el-menu 
			@open="handleOpen" 
			@close="handleClose" 
			@select="handleSelect" 
			:unique-opened="true" 
			class="el-menu-vertical-demo">
			<el-menu-item index="/home">
				<i class="menu-icon iconfont iconhome"></i>
				<span>首页</span>
			</el-menu-item>
			<el-submenu 
			:index="item.menu_name" 
			v-for="(item, i) in newMenu" 
			v-if="item.permission && item.menu_type == 'Menu'"
			:key="i">
				 <!-- v-if="item.permission && item.menu_type == 'Menu'" -->
				<template slot="title">
					<i :class="item.iconPath+' '+'iconfont'+' '+'menu-icon'"></i>
					<span>{{ item.menu_name }}</span>
				</template>
				<el-menu-item
				v-for="(each, j) in item.child_menu"
				:index="each.menu_name" 
				 v-if="each.permission"
				:key="j">
					<!-- v-if="each.permission" -->
					<span>{{ each.menu_name }}</span>
				</el-menu-item>
				<el-menu-item-group 
				>
					
		<!-- 			<el-submenu index="1-4" v-if="each.menu_type == 'Menu'">
						<template slot="title">
							选项4
						</template>
						<el-menu-item index="1-4-1">选项1</el-menu-item>
					</el-submenu> -->
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>

<script>
import { menuAPI } from '../api/api.js';
import { bus } from '../utils/bus.js';
import config from '../config/index.js';
export default {
	data() {
		return {
			userInfo: '', //用户信息
			menu: [], //菜单列表
			hj: false,
			menuRouter: config.menuRouter
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath);
		},
		handleSelect(key, keyPath) {
			if(key=='/home'){
				this.$router.push(key);
			}
			console.log(key, keyPath);
			bus.$emit('getNav', keyPath);
			this.menuRouter.forEach(item => {
				if (item.name == keyPath[1]) {
					this.$router.push(item.path);
				}
			});
		},
		//获取菜单
		getMenu() {
			let personid = this.userInfo.personid;
			menuAPI({ personId: personid }).then(res => {
				// console.log('菜单列表', res);
				this.menu = res;
			});
		}
	},
	created() {
		this.userInfo = bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
		// console.log('当前用户信息', this.userInfo);
		this.getMenu();
	},
	computed: {
		// 处理导航菜单
		newMenu() {
			let menu = this.menu;
			let path = 'path';
			let iconPath='iconPath'
			// console.log('原来的menu',menu);
			this.menuRouter.forEach(mitem=>{
				menu.forEach(item=>{
					let count = 0;
					item.child_menu.forEach(each=>{
						if(!each.permission){
							count += 1;
						}
						if(mitem.menuId==each.menu_code){
							each[path] = mitem.path;
						}
					})
					if(item.child_menu.length==count){
						item.permission = false;
						count = 0;
					}
					if(mitem.menuId==item.menu_code){
						item[iconPath]=mitem.iconPath
					}
				})
			})
			
			
			// menu.forEach(item => {
			// 	item.child_menu.forEach(each => {
			// 		this.menuRouter.forEach(mrouter => {
			// 			if (mrouter.menuId == each.menu_code) {
			// 				each[path] = mrouter.path;
			// 			}
			// 			if(mrouter.menuId==item.menu_code){
			// 				item[iconPath]=mrouter.iconPath
			// 			}
			// 		});
			// 		if (!each.permission) {
			// 			count += 1;
			// 		}
			// 	});
			// 	if (item.child_menu.length == count) {
			// 		item.permission = false;
			// 		count = 0;
			// 	}
			// });
			console.log('处理过的menu', menu);
			return menu;
		}
	}
};
</script>

<style lang="less" scoped>
.el-aside {
	position: fixed;
	top: 60px;
	left: 0;
	font-size: 50px;
	height: 1000px;
	width: 200px !important;
	.nav-title {
		text-align: center;	
		line-height: 60px;
		color: #fff;
		font-size: 24px;
		text-shadow: 2px 4px 8px #000;
		border-right: 1px solid #f0f0f0;
	}
	.el-menu {
		border: none;

		.el-submenu {
			.el-menu-item {
				padding: 0;
			}
			.iconfont {
				color: #eee;
				margin: 10px;
			}
		}

		.el-menu-item {
			.iconfont {
				color: #eee;
				margin: 10px;
			}
		}

		.el-menu-item-group__title {
			padding: 0;
		}
	}
}
.menu-icon{
	height: 24px;
	width: 24px;
	font-size: 20px;
	color: grey !important;
}
.el-menu-item-group__title{
	padding: 0 !important;
}
</style>
