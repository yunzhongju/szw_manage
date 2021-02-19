<template>
	<div>
		<ul class="item-card">
			<li v-for="(item,index) in list" :key="index" :style="{background:item.color,'border-radius':radius}">
				<div class="each">
					<span>{{item.name}}</span>
					<i :class="item.icon"></i>
				</div>
				<h1>{{item.count}}</h1>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[]
			},
			radius:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.item-card{
		// box-sizing: border-box;
		display: flex !important;
		margin-top: 15px;
		justify-content: space-between;
		border-radius: ;
		// li:nth-child(1){
		// 	margin-left: 0;
		// }
		li{
			cursor: pointer;
			width: 200px;
			background-color: rgba(103, 171, 238, 1);
			text-align: center;
			color: rgba(255, 253, 253, 1);
			padding-left: 35px;
			padding-right: 20px;
			padding-top: 26px;
			padding-bottom: 32px;
			// margin-left: 25px;
			.each{
				display: flex;
				justify-content: space-between;
				i{
					font-size: 24px;
				}
			}
			h1{
				font-size: 36px;
				text-align: left;
				font-family: SourceHanSansSC-regular;
				margin-top: 24px;
			}
		}
	}
</style>
