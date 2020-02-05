<template>
	<view class="footer">
		<view class="_li" v-for="(item,index) in tabs.list" :key="index" :class="{on:footIndex==index}" @click="tabsClick(index)">
			<image :src="'../../../static/style/footer-icon'+index+'.png'" class="temporarily" mode="widthFix"></image>
			<image src='../../../static/style/footer-icon6.png' v-if="footIndex == 2 && show == true" class="icon hide-icon" mode="widthFix"></image>
			<image :src="'../../../static/style/footer-on-icon'+index+'.png'" v-if="!(footIndex == 2) || iconShow == 'false' && show == false" class="icon" mode="widthFix"></image>
			<text v-text="item"></text>
		</view>
		<view class="popup" v-show="show == true">
			<view class="item-tabs" :class="{on:showClass==false}">
				<view class="item">
					<image src="../../../static/home/tabs-icon3.png" mode="widthFix" @click="tabsPopupClick(0)"></image>
					会员消费
				</view>
				<view class="item">
					<image src="../../../static/style/footer-icon5.png" mode="widthFix" @click="tabsPopupClick(1)"></image>
					散客消费
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['footIndex','iconShow'],
		components: {
		},
		data() {
			return {
				current: 0,
				show: false,
				showClass: false,
				tabs: {
					list: ['首页','订单','收银','预约','会员'],
					index: 0
				}
			}
		},
		onReady() { 
		},
		methods: {
			tabsClick(e) {
				let _this = this
				if (this.show === true) {
					if (e === 2) {
						this.showClass = false
						setTimeout(function() {
							_this.show = false
							_this.footIndex = _this.current
						}, 500)
					}
					return
				}
				if (e === 4) {
					uni.navigateTo({
						url: `/pages/tabBar/member/member`,
					})
				} else if (e === 3) {
					uni.navigateTo({
						url: `/pages/tabBar/yuyue/yuyue`,
					})
				} else if (e === 2) {
					this.current = this.footIndex
					this.show = true
					this.showClass = true
					this.footIndex = 2
				} else if (e === 0) {
					uni.navigateTo({
						url: `/pages/tabBar/home/home`,
					})
				} else if (e === 1) {
					uni.navigateTo({
						url: `/pages/tabBar/Order/order`,
					})
				}
			},
			tabsPopupClick(e) {
				if (e === 0) {
					uni.navigateTo({
						url: `/pages/tabBar/Price/price`,
					})
				} else if (e === 1) {
					uni.navigateTo({
						url: `/pages/price/individual`,
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 110upx;
		background: #FFFFFF;
		border-top: solid 1upx #e4e4e4;
		display: flex;
		justify-content: space-between;
		padding-left: 55upx;
		padding-right: 55upx;
		z-index: 9;
		.popup {
			background: rgba(255, 255, 255, 0.9) none repeat scroll 0 0;
			bottom: 110upx;
			height: auto;
			top: 0;
			z-index: 8;
			.item-tabs {
				position: absolute;
				bottom: 20upx;
				left: 0;
				right: 0;
				display: flex;
				justify-content: center;
				&.on {
					.item {
						&:first-child {
							animation: bounce-in-hide .5s ease;
						}
						&:nth-child(2) {
							animation: bounce-tow-hide .5s ease;
						}
					}
				}
				.item {
					width: 140upx;
					height: 140upx;
					border-radius: 100upx;
					background: #FFFFFF;
					font-size: 18upx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					box-shadow: 2upx 0px 40upx #ccc;
					margin-left: 60upx;
					color: #FF0066;
					transform: translate(0,0);
					image {
						width: 50upx;
						margin-bottom: 10upx;
					}
					&:first-child {
						margin-left: 0;
						animation: bounce-in .5s ease;
					}
					&:nth-child(2) {
						animation: bounce-tow .5s ease;
					}
				}
			}
		}
		._li {
			display: flex;
			align-items: center;
			flex-direction: column;
			height: 100%;
			justify-content: center;
			&:nth-child(3) {
				position: relative;
				top: -26upx;
				width: 86upx;
				border-radius: 100upx;
				border-top: solid 1upx #e4e4e4;
				background: #FFFFFF;
				padding-top: 12upx;
				image {
					width: 70upx;
					height: 70upx;
				}
			}
			&.on {
				text {
					color: #ff0066;
				}
				image {
					&.icon {
						display: block;
						&.hide-icon {
							width: 80upx;
						}
					}
					&.temporarily {
						display: none;
					}
				}
			}
			image {
				width: 50upx;
				height: 50upx;
				&.icon {
					display: none;
				}
			}
			text {
				font-size: 20upx;
				color: #d7d7d7;
				margin-top: 5upx;
			}
		}
	}
	@keyframes bounce-in {
	  0% {
	    transform: translate(55px,65px);
	  }
	  100% {
	    transform: translate(0,0);
	  }
	}
	@keyframes bounce-tow {
	  0% {
	    transform: translate(-45px,65px);
	  }
	  100% {
	    transform: translate(0,0);
	  }
	}
	@keyframes bounce-in-hide {
	  0% {
	    transform: translate(0,0);
	  }
	  100% {
	    transform: translate(55px,65px);
	  }
	}
	@keyframes bounce-tow-hide {
	  0% {
	    transform: translate(0,0);
	  }
	  100% {
	    transform: translate(-45px,65px);
	  }
	}
</style>
