<template>
	<view class="page">
		<Slither :actions="actions" :active-index.sync="activeIndex" :fade="true" @click="handleClick">
			<view class="centent">
				有新的跟进事项
			</view>
			<text>13:15:35</text>
		</Slither>
		<Slither :actions="actions" :active-index.sync="activeIndex" :fade="true" @click="handleClick">
			<view class="centent">
				有新的跟进事项
			</view>
			<text>13:15:35</text>
		</Slither>
	</view>
</template>

<script>
	import Slither from '@/components/littlezong-slither/littlezong-slither'
	export default {
		components: {
			Slither
		},
		data() {
			return {
				// 数据列表
				dataList: [],
				// 索引(设置为null即可)
				activeIndex: null,
				// 行为
				actions: [{
					title: '删除',
					style: {
						color: 'white',
						background: '#ff0066'
					},
					trigger(index) {
						console.log('delete', index)
					}
				}]
			}
		},
		onLoad(e) {
			if (e.type === 'follow') {
				uni.setNavigationBarTitle({
				    title: '跟进事项'
				});
			} else if (e.type === 'tixing') {
				uni.setNavigationBarTitle({
				    title: '提醒事项'
				});
			} else if (e.type === 'daodian') {
				uni.setNavigationBarTitle({
				    title: '预约客户'
				});
			} else if (e.type === 'zhuangjiao') {
				uni.setNavigationBarTitle({
				    title: '转交客户'
				});
			}
		},
		methods: {
			handleClick({
				event,
				activeStatus,
				index
			}) {
				console.log(event, activeStatus, index)
			}
		}
	}
</script>

<style lang="less">
	.page {
		position: absolute;
		left: 0;
		top: 30upx;
		bottom: 0;
		right: 0;
		background: #f6f6f6;
		overflow-x: hidden;
		overflow-y: auto;

		.zuni_slither_item {
			height: 120upx;
			background: #FFFFFF;
			border-top: solid 2upx #f6f6f6;
			box-sizing: border-box;

			/deep/ .zuni_slither_item_content {
				display: flex;
				height: 120upx;
				align-items: center;
				justify-content: space-between;

				.centent {
					font-size: 34upx;
					color: #333333;
					margin-left: 20upx;
				}

				text {
					font-size: 20upx;
					color: #949494;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
