import Vue from 'vue'
export const bus = new Vue({
  data () {
    return {
      // 定义数据
      userInfo: {},
			communityInfo:'',
			msg:'123',
			nav:[],
			img_url:'',
			newsCurrentInfo:'',
			videoCurrentInfo:''
    }
  },
  created () {
    // 绑定监听
    this.$on('getuserinfo', (value)=>{
      this.userInfo = value
    })
		
		this.$on('getNewsCurrentInfo', (value)=>{
		  this.newsCurrentInfo = value
		})
		
		this.$on('getNav', (value)=>{
		  this.nav = value
		})
		this.$on('getImgUrl', (value)=>{
		  this.img_url = value
		})
		this.$on('getVideoCurrentInfo',(value)=>{
			this.videoCurrentInfo=value
		})
		this.$on('getCommunityInfo',(value)=>{
			this.communityInfo=value
		})
		
  }
})