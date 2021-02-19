<template>
	<div>
		<Breadcrumb></Breadcrumb>
		<div class="content">
			<el-card shadow="always" style="height: 650px;" class="box-card">
				<ul class="addCard">
					<li>
						<el-card :body-style="{ padding: '0px' }">
							<div class="li-card">
								<h3>投票活动</h3>
								<img src="../../assets/images/starline.png" class="image" />
								<p>简单易用、专业的社区微信投票工具； 支持社区各种评选活动场景。</p>
								<div class="btn"><el-button type="primary" style="width: 163px; height:54px; background-color: rgba(0, 105, 242, 0.88);" @click="handleClick" >创建活动</el-button></div>
							</div>
						</el-card>
					</li>
					<li>
						<el-card :body-style="{ padding: '0px' }">
							<div class="li-card">
								<h3>问卷调查</h3>
								<img src="../../assets/images/starline.png" class="image" />
								<p>简单易用、专业的社区微信投票工具； 支持社区各种评选活动场景。</p>
								<div class="btn">
									<el-button 
									type="primary" 
									style="width: 163px; height:54px; background-color: rgba(0, 105, 242, 0.88);" 
									@click="handleClick" >创建活动</el-button></div>
							</div>
						</el-card>
					</li>
				</ul>
			</el-card>
		</div>
	</div>
</template>

<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
	components: {
		Breadcrumb
	},
	data() {
		return {
			msg: 'sd'
		};
	},
	methods:{
		handleClick(){
			console.log('add active');
			this.$router.push('/home/onlineselection/addactive')
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	margin-top: 40px;
	// background-color: #f0f0f2;
	// padding: 10px 10px;
	// padding-bottom: 0;
}
.box-card {
	min-height: 700px;
	max-height: 800px;
}
.addCard {
	display: flex;
	li {
		flex-basis: 33%;
		margin-top: 34px;
		margin-left: 58px;
	}
}

.li-card {
	position: relative;
	h3{
		position: absolute;
		left: 43px;
		top: 23px;
		color: rgba(16, 16, 16, 1);
		font-size: 20px;
		text-align: left;
		font-family: SourceHanSansSC-bold;
		font-weight: 700;
	}
	// box-sizing: border-box;
	height: 452px;
	// width: 393px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	img {
		width: 192px;
		height: 192px;
		margin-top: 55px;
		margin-bottom: 27px;
	}
	p {
		color: rgba(16, 16, 16, 1);
		font-size: 16px;
		text-align: left;
		font-family: SourceHanSansSC-regular;
		padding-left: 47px;
		padding-right: 27px;
		margin-bottom: 32px;
	}
	.btn{
		align-self: center;
		margin-bottom: 30px;
	}
}
</style>
