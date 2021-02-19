<template>
	<div class="amap-page-container">
		<div :style="{ width: '552px', height: '300px' }">
			<el-amap vid="amap" :plugin="plugin" :events="events" class="amap-demo" :center="center"><el-amap-marker :position="center" vid="amapMarker"></el-amap-marker></el-amap>
		</div>
	</div>
</template>
<style>
.amap-demo {
	height: 300px;
}
</style>
<script>
export default {
	data() {
		const self = this;
		return {
			center: [104.004318, 30.565537],
			lng: 0,
			lat: 0,
			loaded: false,
			events: {
				click: e => {
					// 点击地图的时候，获取点击的经纬度，并将地图中心点移自此处
					console.log(e);
					let m = e.lnglat;
					self.addrInput = '';
					self.center = [m.lng, m.lat];
					self.GDmapGetInfoOfNearby(m.lng, m.lat, self); // 获取周边信息
				}
			},
			plugin: [
				{
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 100, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions: 'all',
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							self.GDinit(o, self);
						}
					}
				}
			]
		};
	},
	methods: {
		GDmapGetInfoOfNearby(lng, lat, self) {
			let geocoder = new AMap.Geocoder({
				radius: 1000,
				extensions: 'all',
				poitype: ''
			});
			geocoder.getAddress([lng, lat], (status, result) => {
				if (status === 'complete' && result.info === 'OK') {
					if (result && result.regeocode) {
						console.log(result);
						self.$nextTick();
					}
				}
			});
		},
		GDinit(o, self) {
			o.getCurrentPosition((status, result) => {
				console.log(status, result);
				if (status === 'complete' && result.info === 'SUCCESS') {
					let lat = result.position.lat;
					let lng = result.position.lng;
					self.center = [lng, lat];
					self.GDmapGetInfoOfNearby(lng, lat, self); // 获取周边信息
				}else{
					this.$message('当前位置获取失败!');
				}
			});
		}
	}
};
</script>
