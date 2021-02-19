<template>
  <el-table
    :data="list"
    stripe
		height="500"
    style="width: 100%">
		<el-table-column
			align="center"
		  label="呢称">
			<template slot-scope="scope">
				<div class="voting">
					<el-image
						style="width: 100px; height: 100px"
						:src="scope.row.headImage"
						fit="cover"></el-image>
					<span>{{scope.row.showName}}</span>
				</div>
			</template>
		</el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
			align="center">
    </el-table-column>
    <el-table-column
      prop="voteTime"
			align="center"
      label="投票时间">
    </el-table-column>
		<el-table-column
		  prop="itemTile"
			align="center"
		  label="投票项">
		</el-table-column>
  </el-table>
</template>

<script>
  export default {
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
	.voting{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.voting span{
		padding: 0 20px;
	}
</style>
