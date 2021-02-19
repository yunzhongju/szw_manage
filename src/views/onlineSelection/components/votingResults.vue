<template>
  <el-table
    :data="tableData"
    stripe
		height="500"
    style="width: 100%">
    <el-table-column
      label="编号"
			align="center"
      width="80">
			<template slot-scope="scope">
				<span>{{scope.$index+1}}</span>
			</template>
    </el-table-column>
		<el-table-column
		  label="图片"
			align="center">
			<template slot-scope="scope">
				<el-image
					style="width: 365px;height: 124px;"
					:src="scope.row.coverImg"></el-image>
			</template>
		</el-table-column>
    <el-table-column
      prop="title"
			align="center"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="readNumber"
			align="center"
      label="浏览量">
    </el-table-column>
		<el-table-column
		  prop="ticket"
			align="center"
		  label="票数">
		</el-table-column>
  </el-table>
</template>

<script>
	import {getItemSearchResultAPI} from '../../../api/api.js'
  export default {
		props:{
			id:{
				type:String,
				default:()=>''
			}
		},
    data() {
      return {
        tableData: [],
				pageSize:10,
				pageNumber:1
      }
    },
		methods:{
			getItemSearchResult(params){
				getItemSearchResultAPI(params).then(res=>{
					console.log(res,1111111111111);
				})
			}
		},
		mounted() {
			
		},
		created() {
			
		}
  }
</script>

<style lang="less" scoped>
	.voting{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
