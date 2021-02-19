<template>
	<ul>
		<li>
			<h3>总浏览量</h3>
			<span>{{data.readNumber}}</span>
		</li>
		<li>
			<h3>总票数</h3>
			<span>{{data.sumActivityTicket}}</span>
		</li>
		<li>
			<h3>总分享量</h3>
			<span>{{data.shareNumber}}</span>
		</li>
	</ul>
</template>

<script>
	export default {
		props:{
			data:{}
		}
	}
</script>

<style lang="less" scoped>
	ul{
		display: flex;
		padding: 10px 20px;
		li{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-right: 40px;
			width: 10.88rem;
			height: 6.5rem;
			line-height: 20px;
			border-radius: 5px;
			background-color: rgba(255, 253, 253, 1);
			text-align: center;
			box-shadow: 5px 5px 5px #888888;
			border: 2px solid gainsboro;
			span{
				width: 60px;
				height: 54px;
				color: rgba(9, 9, 9, 1);
				font-size: 36px;
				text-align: left;
				font-family: SourceHanSansSC-regular;
				margin-left: 20px;
				padding-top: 20px;
			}
			h3{
				margin-top: 20px;
				padding-right: 30px;
			}
		}
	}
</style>
