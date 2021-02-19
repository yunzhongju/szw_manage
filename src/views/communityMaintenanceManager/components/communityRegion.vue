<template>
	<ul>
		<li>
			<el-select 
			v-model="city" 
			placeholder="请选择城市">
			<el-option 
			v-for="item in cityList" 
			:key="item.value" 
			:label="item.label" 
			:value="item.value">
			</el-option>
			</el-select>
		</li>
		<li>
			<el-select 
			v-model="county"
			@change="handleCounty"
			placeholder="请选择城市">
			<el-option 
			v-for="item in countyList" 
			:key="item.orgid"
			:label="item.orgname" 
			:value="item.orgid">
			</el-option>
			</el-select>
		</li>
		<li>
			<el-select 
			v-model="street" 
			@change="handleStreet"
			placeholder="请选择">
			<el-option 
			v-for="item in streetList" 
			:key="item.orgid" 
			:label="item.orgname" 
			:value="item.orgid">
			</el-option>
			</el-select>
		</li>
	</ul>
</template>

<script>
import { getAreasAPI } from '../../../api/api.js';
export default {
	data() {
		return {
			city: '成都市',
			county: '',
			street: '',
			cityList: [
				{
					value: '1',
					label: '成都市'
				}
			],
			countyList: [
				{
					value: '1',
					label: '双流区'
				}
			],
			streetList: [
				{
					value: '1',
					label: '航空港'
				}
			]
		};
	},
	methods: {
		handleStreet(val){
			this.$emit('getArea',val)
		},
		handleCounty(val){
			this.getAreas(val,res=>{
				this.streetList=res
			})
		},
		getAreas(pid = '', cb) {
			let p = {
				parentId: pid
			};
			getAreasAPI(p).then(res => {
				cb(res);
			});
		}
	},
	created() {
		this.getAreas('510100', res => {
			console.log('aaa',res);
			this.countyList = res;
		});
	}
};
</script>

<style lang="less" scoped>
ul {
	display: flex;
	li {
		margin-right: 20px;
	}
}
</style>
