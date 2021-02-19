<template>
	<div class="home-item">
		<div class="item-top">
			<h2>{{title}}</h2>
			<ul>
				<li 
				v-for="(item,index) in tags" 
				@click="changeTags(index,item.value)" 
				:class="{'isactive':isactive==index}">{{item.title}}</li>
			</ul>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			tags:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return {
				isactive:0,
			}
		},
		methods:{
			changeTags(index,tag){
				console.log(tag);
				this.isactive=index
				this.$emit('getTag',tag)
			}
		}
	}
</script>

<style lang="less" scoped>
	.home-item{
		background-color: white;
		margin-bottom: 20px;
		padding: 20px 35px;
	}
	.item-top{
		display: flex;
		justify-content: space-between;
		h2{
			color: rgba(9, 9, 9, 1);
			font-size: 18px;
			text-align: left;
			font-family: SourceHanSansSC-bold;
			font-weight: 600;
		}
		ul{
			display: flex;
			color: rgba(50, 101, 252, 0.99);
			font-size: 14px;
			text-align: left;
			font-family: SourceHanSansSC-regular;
			li{
				margin-right: 24px;
				padding-bottom: 10px;
				cursor: pointer;
			}
		}
	}
	
.isactive{
	border-bottom: 2px solid rgba(50, 101, 252, 0.99);
}	
</style>
