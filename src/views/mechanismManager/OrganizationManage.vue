<template>
	<div>
		<div>
			<Breadcrumb></Breadcrumb>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb.vue'
	export default{
		components:{
			Breadcrumb
		}
	}
</script>

<style>
</style>










<el-tab-pane label="负责人" name="second">
						<ul class="head">
							<li><el-input v-model="input" placeholder="请输入内容"></el-input></li>
							<li>
								<el-select 
								v-model="pull.city"
								@change="handleNextCounty"
								clearable
								@clear="pull.city=''"
								 placeholder="城市">
									<el-option 
									v-for="item in citys" 
									:key="item.value" 
									
									:label="item.label" 
									:value="item.value">
									</el-option>
								</el-select>
							</li>
							<li>
								<el-select 
								v-model="pull.County" 
								clearable
								@clear="pull.County=''"
								@change="handleNextStreet"
								placeholder="县区">
									<el-option v-for="item in county" :key="item.orgid" :label="item.orgname" :value="item.orgid"></el-option>
								</el-select>
							</li>
							<li>
								<el-select 
								v-model="pull.street"
								clearable
								@clear="pull.street=''"
								@change="handleNextCommunity"
								 placeholder="街道">
									<el-option v-for="item in street" :key="item.orgid" :label="item.orgname" :value="item.orgid"></el-option>
								</el-select>
							</li>
							<li>
								<el-button type="primary">搜索</el-button>
								<!-- <el-button>重置</el-button> -->
							</li>
						</ul>

						<!-- 数据表格 -->
						<el-table :data="tableData2" header-row-class-name="header-class" :row-class-name="tableRowClassName" label-width="100%">
							<el-table-column prop="head" label="头像">
								<template slot-scope="scope">
									<img style="width: 132px; height: 132px;" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg" alt="" />
								</template>
							</el-table-column>
							<el-table-column prop="info" label="基本信息">
								<template slot-scope="scope">
									<ul class="baseinfo">
										<li>昵称:adad</li>
										<li>性别:男</li>
										<li>年龄:23</li>
									</ul>
								</template>
							</el-table-column>
							<el-table-column prop="option" label="操作">
								<template slot-scope="scope">
									<ul class="options">
										<li @click="onChangeMan">
											<i class="el-icon-edit"></i>
											<span>更换负责人</span>
										</li>
										<li @click="onStop">
											<i class="el-icon-video-pause"></i>
											<span>停用账户</span>
										</li>
										<li @click="onDelete">
											<i class="el-icon-delete"></i>
											<span>删除</span>
										</li>
									</ul>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>