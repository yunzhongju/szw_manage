<template>
  <div class="home">
   <el-container>
     <el-header>
			 <navTop></navTop>
		 </el-header>
     <el-container>
       <el-aside width="200px">
				 <leftNav></leftNav>
			 </el-aside>
       <el-main>
				 <rightContent></rightContent>
			 </el-main>
     </el-container>
   </el-container>
  </div>
</template>

<script>
import navTop from "@/components/navTop.vue";
import leftNav from "@/components/leftNav.vue";
import rightContent from "@/components/rightContent.vue"
export default {
  data() {
    return {};
  },
  components: {
    navTop,
    leftNav,
		rightContent
  },
	created() {

	}
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .top-area {
    height: 60px;
  }
  .el-container {
    height: 100%;
    .el-header,
    .el-footer {
      background-color: #409eef;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .el-main {
      background-color: #BBBBBB 100%;
      // color: #333;
      // text-align: center;
      // line-height: 160px;
    }
  }
}
</style>