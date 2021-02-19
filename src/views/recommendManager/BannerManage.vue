<template>
	<div class="bannermanage">
		<div class=""><Breadcrumb></Breadcrumb></div>

		<div class="content">
			<el-card shadow="always">
				<div class="top">
					<p>
						banner管理
						<span>（最多5张，且可以上传图片不能大于15M）</span>
					</p>
				</div>
				<!-- 添加banner图片 -->
				<div class="show-img">
					<ImgList
					 @edit="handleEditor"
					 :list="bannerList"
					 @delete="handleDelete">
						<div 
						class="add-img" 
						v-if="bannerList.length<5"
						@click="handleAddBanner">
							<i class="el-icon-plus"></i>
						</div>
					</ImgList>
				</div>
				<el-divider></el-divider>
				<!-- 推荐新闻置顶 -->
				<ul class="recommend">
					<li>
						推荐新闻
						<i>（不限）</i>
					</li>
					<li v-for="(item,index) in recommendNewsList" :key="index">
						<div class="item">
							<div>
								<span>{{item.title}}</span>
								<span>{{item.addTime|timeFormate}}</span>
								<i>置顶</i>
							</div>
							<div class="deloption" @click="handleDel(item.id,1)">
								<img src="../../assets/images/del.svg" alt="" style="width: 24px; height: 24px;" />
								<!-- <span>移除</span> -->
							</div>
						</div>
					</li>
				</ul>
				<el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
					<ul class="newslist">
						<el-checkbox-group 
						v-model="checkList" 
						:max="5"
						style="display: flex;flex-direction: column;">
							<li v-for="(item,index) in list" :key="index">
								<el-checkbox :label="item.id" :value="item.id">{{item.title}}</el-checkbox>
							</li>
						</el-checkbox-group>
					</ul>
					<ul slot="title" class="dialog-title">
						<li><el-input v-model="input" placeholder="请输入内容" style="width: 311px;"></el-input></li>
						<li><el-button type="primary" style="width: 77px;" @click="handleSerach">搜索</el-button></li>
					</ul>
					<Footer @currentPage="getCurrentPage" :total="totalRow"></Footer>
					<span slot="footer" class="dialog-footer">
						<el-button @click="handlePass">取 消</el-button>
						<el-button type="primary" @click="handleSure">确 定</el-button>
					</span>
				</el-dialog>

				<!-- 添加推荐新闻 -->
				<div class="addnews">
					<i>+</i>
					<span @click="handleClick(1)">添加推荐新闻</span>
				</div>

				<el-divider></el-divider>

				<!-- 推荐专题 -->
				<ul class="recommend">
					<li>
						推荐专题
						<i>（不限）</i>
					</li>
					<li v-for="(item,index) in recommendTopicList" :key="index">
						<div class="item">
							<div>
								<span>{{item.title}}</span>
								<span>{{item.addTime|timeFormate}}</span>
								<i class="recomm">推荐</i>
							</div>
							<div class="deloption" @click="handleDel(item.id,2)">
								<img src="../../assets/images/del.svg" alt="" style="width: 24px; height: 24px;" />
								<!-- <span>移除</span> -->
							</div>
						</div>
					</li>
				</ul>
				<!-- 添加推荐专题 -->
				<div class="addnews">
					<i>+</i>
					<span @click="handleClick(2)">添加专题推荐</span>
				</div>
			</el-card>
			
			<!-- 添加banner图片 -->
			<el-dialog
			  title="添加Banner"
			  :visible.sync="BannerdialogVisible"
			  width="50%"
				center
			  :before-close="handleClose">
			  <div class="banner-form">
					<el-form :model="formInline" :rules="formInlineRule" ref="formInline">
					  <el-form-item label="封面" prop="imagePath">
					    <ImgUp @getImageUrl="getImageUrl"></ImgUp>
							<div v-if="formInline.imagePath" style="width: 360px; height:180px; margin-left: 45px;"><img style="width: 100%; height: 100%;" :src="formInline.imagePath" alt=""></div>
					  </el-form-item>
						<el-form-item label="标题" prop="title">
						  <el-input v-model="formInline.title" placeholder="标题" style="width: 400px;"></el-input>
						</el-form-item>
						<el-form-item label="排序" prop="sort">
						  <el-input 
							v-model="formInline.sort" 
							placeholder="排序"
							style="width: 400px;">
							</el-input>
						</el-form-item>
						<el-form-item label="链接" style="margin-left: 10px;">
						  <el-input 
							v-model="formInline.link" 
							placeholder="链接"
							clearable
							@focus="handleBannerClick"
							style="width: 400px;">
							</el-input>
						</el-form-item>
					</el-form>
				</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="BannerdialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="handleAddBannerSure('formInline')">确 定</el-button>
			  </span>
			</el-dialog>
			
			<!-- 添加banner数据列表 -->
			<el-dialog
			  :visible.sync="bannerListDialogVisible"
			  width="50%"
				center
				v-if="bannerListDialogVisible"
			  :before-close="handleClose">
			  <div class="banner-data-list">
						<el-row style="display: flex;align-items: center;margin-bottom: 30px;" :gutter="10">
						  <el-col :span="12"><div class="grid-content bg-purple">
								<el-radio v-model="BannerRadio" label="1" @change="handleChangeRadio">新闻</el-radio>
								<el-radio v-model="BannerRadio" label="2" @change="handleChangeRadio">视频</el-radio>
								<el-radio v-model="BannerRadio" label="3" @change="handleChangeRadio">投票</el-radio>
							</div></el-col>
						  <el-col :span="6"><div class="grid-content bg-purple-light">
								<el-input
								  placeholder="请输入搜索内容"
								  v-model="serachText"
									size="medium"
								  clearable>
								</el-input>
							</div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple">
								<el-button type="primary" size="medium" @click="onHandleSerach">搜索</el-button>
							</div></el-col>
						</el-row>
					<ul class="newslist">
						<el-radio-group 
						v-model="dataRadio" 
						:max="5"
						style="display: flex;flex-direction: column;">
							<li v-for="(item,index) in list" :key="index">
								<el-radio :label="item.id" :value="item.id">{{item.title}}</el-radio>
							</li>
						</el-radio-group>
					</ul>
					<Footer @currentPage="getBannerCurrentPage" :total="totalRow"></Footer>
				</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="bannerListDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="handleBannerSure">确 定</el-button>
			  </span>
			</el-dialog>
			
		</div>
	</div>
</template>

<script>
import Breadcrumb from '../../components/breadcrumb.vue';
import Footer from '../../components/footer.vue'
import ImgList from './components/imgList.vue'
import ImgUp from '../onlineSelection/addActive/imgUp.vue'
import {bus} from '../../utils/bus.js'
import {getNewsListAPI,
				getTopicListAIP,
				getBannerListAPI,
				getVideoListAPI,
				deleteBannerByIdAPI,
				saveOrEditBannerAPI,
				getActiveListAPI,
				addOrMoveRecommend} from '../../api/api.js'
export default {
	components: {
		Breadcrumb,
		Footer,
		ImgList,
		ImgUp
	},
	data() {
		var checkSort = (rule, value, callback) =>{
			if(value>6){
				return callback(new Error('排序不能大于5'))
			}
		}
		return {
			serachText:'',
			totalRow:0,
			userInfo:'',
			BannerRadio:'1',
			formInline:{
				id:'',
				imagePath:'',
				title:'',
				link:'',
				sort:''
			},
			formInlineRule:{
				imagePath: [{ required: true, message: '请上传banner图片', trigger: 'blur' }],
				title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
				link: [{ required: true, message: '请选择链接', trigger: 'blur' }],
				sort:[{ required: true, message: '请输入排序', trigger: 'blur' },
				// { validator: checkSort, trigger: 'blur' },
				],
			},
			bannerListDialogVisible:false,
			BannerdialogVisible:false,
			fileImgList:[{name: 'food.jpg', url: 'https://image.sqfzzl.com/2020071315154764052.jpg'}],
			info:'',
			pageSize:10,
			disabled: false,
			input: '',
			dialogVisible: false,
			checkList: [],
			bannerList:[],
			list:[],
			dataRadio:'',
			type:'',
			recommendNewsList:[],
			recommendTopicList:[],
			newsDetailLink:'/pages/index/news_details/news_details?id=',
			videoDetailLink:'/pages/index/video_details/video_details?id=',
			activeDetailLink:'/pages/index/active_details/active_details?id='
		};
	},
	methods: {
		onHandleSerach(){
			if(this.BannerRadio==1){
				this.getNewsList(this.serachText,1,0)
			}else if(this.BannerRadio==2){
				this.getVideoList(this.serachText,1)
			}else if(this.BannerRadio==3){
				this.getActiveList({searchContent:this.serachText,pageNumber:1})
			}
		},
		handlePass(){
			this.checkList=[]
		},
		saveOrEditBanner(id,title,path,link,sort){
			let p={
				id:id,
				title:title,
				image_path:path,
				link:link,
				sort:sort
			}
			saveOrEditBannerAPI(p).then(res=>{
				console.log('结果',res);
				this.getBannerList()
			})
		},
		handleAddBannerSure(formName){
			// console.log('form',this.formInline);
			// console.log(this.$refs);
			this.$refs[formName].validate(valid=>{
				if(valid){
					// console.log(111111);
					this.saveOrEditBanner(this.formInline.id,this.formInline.title,this.formInline.imagePath,this.formInline.link,this.formInline.sort)
					this.BannerdialogVisible=false
				}else{
					console.log('error');
				}
			})
		},
		getImageUrl(url){
			this.formInline.imagePath=url
		},
		handleBannerSure(){
			console.log('select-data',this.dataRadio);
			if(this.BannerRadio=='1'){
				this.formInline.link=this.newsDetailLink+this.dataRadio
			}else if(this.BannerRadio==2){
				this.formInline.link=this.videoDetailLink+this.dataRadio
			}else if(this.BannerRadio==3){
				this.formInline.link=this.activeDetailLink+this.dataRadio
			}
			this.bannerListDialogVisible=false
		},
		handleChangeRadio(val){
			console.log(val);
			if(val=='1'){
				this.getNewsList('',1,'0')
			}else if(val==2){
				this.getVideoList('',1)
			}else if(val==3){
				this.getActiveList({searchContent:'',pageNumber:1})
			}
		},
		getActiveList(params){
			params['personid']=this.userInfo.personid
			params['pageSize']=10
			params['audit']=1
			params['publishStatus']=''
			getActiveListAPI(params).then(res=>{
				this.list=res.list
				this.totalRow=res.totalRow
			})
		},
		handleBannerClick(){
			this.getNewsList('',1,'0')
			this.bannerListDialogVisible=true
		},
		handleEditor(id){
			this.BannerdialogVisible=true
			console.log('editor');
			this.bannerList.forEach(item=>{
				if(id==item.id){
					this.formInline.id=id
					this.formInline.imagePath=item.imagePath
					this.formInline.link=item.link
					this.formInline.title=item.title,
					this.formInline.sort=item.sort
				}
			})
		},
		handleDelete(id){
			console.log('delete');
			this.$confirm('确定删除该banner, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(() => {
				deleteBannerByIdAPI({id:id}).then(res=>{
					this.getBannerList()
				})
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		handleAddBanner(){
			this.formInline.id=''
			this.formInline.imagePath=''
			this.formInline.title=''
			this.formInline.link=''
			this.BannerdialogVisible=true
		},
		handleClick(type){
			this.type=type
			console.log(type);
			this.dialogVisible=true
			if(type==1){
				this.getNewsList('',1,'0')
			}else{
				this.getTopicList('',1,'0')
			}
		},
		getNewsList(searchContent,pageNumber,recommend){
			let p={
				memberId :this.userInfo.personid,
				searchContent:searchContent,
				channelId:'',
				recommend:recommend,
				audit:'1',
				pageSize:10,
				pageNumber :pageNumber
			}
			getNewsListAPI(p).then(res=>{
				console.log(res);
				if(recommend=='0'){
					this.list=res.list
				}else{
					this.recommendNewsList=res.list
				}
				this.totalRow=res.totalRow
			})
		},
		getTopicList(searchContent,pageNumber,recommend){
			let p={
				searchContent:searchContent,
				recommend:recommend,
				pageSize:10,
				pageNumber :pageNumber
			}
			getTopicListAIP(p).then(res=>{
				// console.log(res);
				if(recommend=="0"){
					this.list=res.list
				}else{
					this.recommendTopicList=res.list
				}
				this.totalRow=res.totalRow
			})
		},
		getBannerCurrentPage(val){
			if(this.BannerRadio==1){
				this.getNewsList(this.serachText,val,'0')
			}else if(this.BannerRadio==2){
				this.getVideoList(this.serachText,val)
			}else if(this.BannerRadio==3){
				this.getActiveList({searchContent:this.serachText,pageNumber:val})
			}
		},
		getCurrentPage(val){
			console.log(val);
			if(this.type==1){
				this.getNewsList(this.input,val,'0')
			}else{
				this.getTopicList(this.input,val,'0')
			}
		},
		getBannerList(){
			getBannerListAPI().then(res=>{
				console.log('bannerList',res);
				this.bannerList=res
			})
		},
		handleSure(){
			let params={
				id:this.checkList.join(';'),
				type:this.type==1?'news':'specialTopic',
				addOption:'1'
			}
			addOrMoveRecommend(params).then(res=>{
				console.log(res);
				this.getNewsList('',1,'1')
				this.getTopicList('',1,'1')
				this.checkList=[]
				this.dialogVisible=false
			})
		},
		handleSerach(){
			let text=this.input
			if(this.type==1){
				this.getNewsList(text,1,'0')
			}else{
				this.getTopicList(text,1,'0')
			}	
		},
		addImg() {
			console.log(23);
		},
		handleClose(done) {
			done();
		},
		// 移除操作
		handleDel(id,type) {
			console.log(id);
			let params={
				id:id,
				type:type==1?'news':'specialTopic',
				addOption:'0'
			}
			addOrMoveRecommend(params).then(res=>{
				if(type==1){
					this.getNewsList('',1,'1')
				}else{
					this.getTopicList('',1,'1')
				}
			})
		},
		getVideoList(searchContent,pageNumber){
			let p={
				memberId :this.userInfo.personid,
				searchContent:searchContent,
				channelId:'',
				recommend:'0',
				audit:'1',
				pageSize:10,
				pageNumber:pageNumber
			}
			getVideoListAPI(p).then(res=>{
				console.log('shiping',res);
				this.list=res.list
				this.totalRow=res.totalRow
			})
		},
	},
	created() {
		this.userInfo =bus.userInfo=={}?bus.userInfo:JSON.parse(localStorage.getItem('userInfo'));
		this.getNewsList('',1,'1')
		this.getTopicList('',1,'1')
		this.getBannerList()
	},
	filters: {
		timeFormate(time) {
			let timer = new Date(time*1000);
			let y = timer.getFullYear();
			let m = timer.getMonth() + 1 < 10 ? '0' + (timer.getMonth() + 1) : timer.getMonth() + 1;
			let d = timer.getDate() > 10 ? timer.getDate() : '0' + timer.getDate();
			let h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
			let mint = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
			return y + '-' + m + '-' + d + ' ' + h + ':' + mint;
		}
	},
};
</script>

<style lang="less" scoped>
.bannermanage {
	.content {
		margin-top: 40px;
		// 添加推荐新闻
		.addnews {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 143px;
			color: rgba(0, 105, 242, 1);
			font-size: 18px;
			text-align: left;
			font-family: SourceHanSansSC-regular;
			cursor: pointer;
			i {
				margin-right: 5px;
				font-size: 30px;
			}
		}
		.top {
			color: rgba(16, 16, 16, 1);
			font-size: 16px;
			text-align: left;
			font-family: SourceHanSansSC-bold;
			span {
				color: rgba(16, 16, 16, 1);
				font-size: 14px;
				text-align: left;
				font-family: SourceHanSansSC-regular;
				font-weight: 200;
			}
		}
		.show-img {
			margin-top: 20px;
		}
	}
}
// 推荐
.recommend {
	display: flex;
	flex-direction: column;
	margin-top: 40px;
	// 添加推荐新闻
	li .item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #e6e6e6;
		align-items: center;
		padding: 10px 0;
		div span:nth-child(2){
			margin-left: 10px;
		}
		.deloption {
			cursor: pointer;
			display: flex;
			align-items: center;
			margin-right: 47px;
			span {
				margin-left: 5px;
			}
		}
		.recomm {
			opacity: 0.46;
			color: rgba(8, 8, 8, 1);
			font-size: 14px;
			text-align: center;
			font-family: Roboto;
			border: 2px solid rgba(8, 8, 8, 1);
		}
		i {
			width: 42px;
			height: 24px;
			line-height: 20px;
			color: rgba(11, 253, 3, 1);
			font-size: 14px;
			text-align: center;
			font-family: Roboto;
			border: 1px solid rgba(11, 253, 3, 1);
			padding: 2px 5px;
			margin-left: 19px;
		}
	}
	li:nth-child(1) {
		color: rgba(16, 16, 16, 1);
		font-size: 16px;
		text-align: left;
		font-family: SourceHanSansSC-bold;
		font-weight: 600;
		i {
			color: rgba(16, 16, 16, 1);
			font-size: 14px;
			text-align: left;
			font-family: SourceHanSansSC-regular;
			font-weight: 300;
		}
	}
}
.el-divider--horizontal {
	height: 10px;
}
.dialog-title {
	display: flex;
	li:nth-child(2) {
		margin-left: 5px;
	}
}
.newslist {
	li {
		border: 1px solid #f0f0f2;
		padding: 10px 5px;
	}
}
.el-upload-list__item-thumbnail{
	// width: 100% !important;
	// height: 100% !important;
}
.add-img{
	border-radius: 10px;
	margin-top: 20px;
	width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px dashed gray;
	cursor: pointer;
	i{
		font-size: 24px;
	}
}
.banner-form{
	margin-left: 100px;
}
// .banner-data-list div{
// 	display: flex;
// 	justify-content: center;
// 	margin-bottom: 20px;
// }
</style>
