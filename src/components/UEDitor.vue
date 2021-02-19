<template>
    <div class="ueditor">
      <vue-ueditor-wrap 
				v-model="content" 
				mode="listener"
				@ready="ready"
				@input="getContent"
				:config="myConfig"></vue-ueditor-wrap>
    </div>
</template>

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'
  export default {
		props:{
			content:{
				type:String,
				default:()=>''
			}
		},
    name: 'Ueditor',
    components: {VueUeditorWrap},
    data () {
      return {
        myConfig: {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
          // serverUrl: 'http://upload-z2.qiniup.com',
          // serverUrl: 'https://manage.sqfzzl.com/AdminManagement/lib/UEditor/php/controller.php',
					serverUrl: 'http://47.111.226.60:4440/ueditor/upload',
					// serverUrl: 'http://192.168.0.6/ueditor/upload',
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          UEDITOR_HOME_URL: '/ueditor/',
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 工具栏是否可以浮动
          autoFloatEnabled: false,
          // 初始容器高度
          initialFrameHeight: 440,
          // 初始容器宽度
          initialFrameWidth: '70%',
          // 关闭自动保存
          enableAutoSave: true
        },
      }
    },
		methods:{
			getContent(text){
				this.$emit('getContent',text)
			},
			ready(ue){
				console.log('ue实列',ue);
			}
		}
  }
</script>

<style scoped>

</style>