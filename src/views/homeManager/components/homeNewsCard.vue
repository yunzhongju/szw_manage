<template>
	<div>
		<ul class="news-list">
			<li v-for="(item,index) in data" :key="index">
				<div>
					<span :class="{'grad':(index+1)>3}">{{index+1}}</span>
					<p>{{item.title}}</p>
				</div>
				<span>{{item.readNumber}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style lang="less" scoped>
	.news-list{
		li{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid rgba(187, 187, 187, 1);
			padding: 10px 15px;
			div{
				display: flex;
				span{
					width: 29px;
					height: 30px;
					line-height: 29px;
					background-color: rgba(103, 171, 238, 1);
					color: rgba(255, 253, 253, 1);
					font-size: 20px;
					text-align: center;
					font-family: Roboto;
				}
				p{
					margin-left: 26px;
					color: rgba(16, 16, 16, 1);
					font-size: 14px;
					text-align: left;
					font-family: SourceHanSansSC-regular;
					padding-top: 10px;
					
				}
			}
		}
	}
	.grad{
		background-color: rgba(190, 190, 190, 1) !important;
	}
</style>
