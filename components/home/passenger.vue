<template>
	<view class="chart">
		<canvas canvas-id="canvasLineC" id="canvasLineC" disable-scroll=true class="charts" @touchstart="touchLineC" @touchmove="moveLineC" @touchend="touchEndLineC"></canvas>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineC = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				chartDataC: {
					categories: [],
					series: [{
						name: '数值',
						data: [],
						color: '#ff0066'
					}]
				}
			}
		},
		onShow() {},
		onReady() {},
		onLoad() {},
		methods: {
			itemClick2(dept_id, time_type) {
				_self = this;
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(500);
				this.getAchieveTrend(dept_id, time_type)
			},
			showLineC(canvasId, chartData) {
				canvaLineC = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#f6f6f6',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						rotateLabel: true,
						itemCount: 7,
						scrollAlign: 'left',
						scrollShow: true,
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						area: {
							type: 'curve',
							opacity: 0.8,
							addLine: true,
							width: 10,
							gradient: true
						},
						tooltip: {
							showBox: true, //是否显示半透明黑色的提示区域
							bgColor: '#000000', //主体背景颜色
							bgOpacity: 0.7, //背景颜色透明度
							gridType: 'dash', //辅助线类型（虚线）
							dashLength: 5, //虚线单段长度
							gridColor: '#1890ff', //辅助线颜色
							fontColor: '#FFFFFF', //主体文字颜色
							horizentalLine: true, //是否显示横向辅助线
							xAxisLabel: true, //是否显示X轴辅助标签
							yAxisLabel: true, //是否显示Y轴辅助标签
							labelBgColor: '#DFE8FF', //标签背景颜色
							labelBgOpacity: 0.95, //背景颜色透明度
							labelFontColor: '#666666' //标签文字颜色
						},
						line: {
							type: 'curve',
							width: 4
						}
					}
				});

			},
			touchLineC(e) {
				canvaLineC.scrollStart(e);
				canvaLineC.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},
			moveLineC(e) {
				canvaLineC.scroll(e);
			},
			touchEndLineC(e) {
				canvaLineC.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
			},
			getAchieveTrend(dept_id, time_type) {
				uni.request({
					url: uni.getStorageSync('interface') + 'report/total/getPerPrice',
					method: 'POST',
					data: {
						dept_id: dept_id,
						time_type: time_type
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						var keysList = Object.keys(res.data.data.list),
							name = new Array(),
							arr = [],
							value = new Array();
						for (var i = 0; i < keysList.length; i++) {
							name[i] = keysList[i].replace('2019-', '')
						}
						for (let o in res.data.data.list) {
						    arr.push(res.data.data.list[o]); //属性
						}
						arr.forEach((item, index) => {
							value[index] = item.value
						})
						this.chartDataC.categories = name
						this.chartDataC.series[0].data = value
						this.showLineC("canvasLineC", this.chartDataC);
					}
				});
			}
		}
	}
</script>

<style lang="less">
	canvas {
		width: 100%;
		height: 480upx;
	}
</style>
