<template>
	<view class="page">
		<view class="list">
			<view class="_li" :key="index" @click="liClick('follow')">
				<view class="pic">
					<image src="../../static/home/跟进.png"></image>
					<text>1</text>
				</view>
				<text>有新的跟进事项</text>
				<text class="time">13:15:35</text>
			</view>
			<view class="_li" :key="index" @click="liClick('tixing')">
				<view class="pic">
					<image src="../../static/home/提醒.png"></image>
					<text>1</text>
				</view>
				<text>有新的提醒事项</text>
				<text class="time">昨天</text>
			</view>
			<view class="_li" :key="index" @click="liClick('daodian')">
				<view class="pic">
					<image src="../../static/home/预约.png"></image>
					<text>1</text>
				</view>
				<text>有新的预约客户到啦</text>
				<text class="time">2019-11-01</text>
			</view>
			<view class="_li" :key="index" @click="liClick('zhuangjiao')">
				<view class="pic">
					<image src="../../static/home/转交%20-%20线性.png"></image>
					<text>1</text>
				</view>
				<text>有新的客户转交给你啦</text>
				<text class="time">2019-10-22</text>
			</view>
		</view>
		<popup :popup="popup" v-on:childPopup="childPopup" ref="popup"></popup>
	</view>
</template>
<script>
	import popup from '@/components/member/popup'
	export default {
		components: {
			popup,
		},
		data() {
			return {
				popup: '',
			}
		},
		methods: {
			liClick(e) {
				uni.navigateTo({
					url: `/pages/tabBar/home/listItems?type=` + e,
				})
				// if(e=='follow'){
				// 	this.popup = 16
				// 	this.$refs.popup.itemClick('true')
				// }else if(e=='tixing'){
				// 	this.popup = 17
				// 	this.$refs.popup.itemClick('true')
				// }else if(e=='daodian'){
				// 	this.popup = 18
				// 	this.$refs.popup.itemClick('true')
				// }else if(e=='zhuangjiao'){
				// 	this.popup = 19
				// 	this.$refs.popup.itemClick('true')
				// }
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f6f7f9;
	}

	::-webkit-scrollbar {
		width: 0px;
	}

	.page {
		margin-top: 20upx;
	}

	._li {
		display: flex;
		position: relative;
		align-items: center;
		width: 710upx;
		height: 140upx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20upx;
		background: #FFFFFF;
		padding: 0 20upx;
		border-radius: 20upx;

		.pic {
			position: relative;
			background-color: #ff6600;
			box-sizing: border-box;
			margin-right: 30upx;
			width: 100upx;
			height: 100upx;
			padding: 15upx;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
			}

			text {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 0 3upx 0upx;
				box-sizing: border-box;
				top: -8upx;
				right: -14upx;
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				background-color: #ff0066;
				color: #fff;
			}
		}

		text {
			font-size: 32upx;
		}

		.time {
			position: absolute;
			top: 12upx;
			right: 20upx;
			font-size: 20upx;
			color: #b0b0b0;
		}
	}

	._li:nth-child(2) .pic {
		background-color: #6666ff;
	}

	._li:nth-child(3) .pic {
		background-color: #ff00cc;
	}

	._li:nth-child(4) .pic {
		background-color: #66cc66;
	}
</style> -->
