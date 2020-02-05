<template>
	<view class="account">
		<view class="nums">
			<view class="_li">
				<view class="money">
					￥<text v-text="form.balance"></text>
				</view>
				会员余额
			</view>
			<view class="_li">
				<view class="money">
					￥<text v-text="form.deposit_amount"></text>
				</view>
				定金
			</view>
		</view>
		<view class="list">
			<view class="_li">
				<text v-text="form.card_num"></text>
				卡券
			</view>
			<view class="_li">
				<text v-text="form.rest_amount"></text>
				欠款
			</view>
			<view class="_li">
				<text v-text="form.scores"></text>
				积分
			</view>
			<view class="_li">
				<text v-text="form.paid_amount"></text>
				消费总额
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: ['form'],
		data() {
			return {
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {},
		methods: {
		}
	}
</script>

<style lang="less">
	.account {
		background: #FFFFFF;
		.nums {
			height: 260upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24upx;
			color: #6b6b6b;
			._li {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.money {
					font-size: 28upx;
					display: flex;
					align-items: center;
					color: #333333;
				}
			}
			text {
				font-size: 48upx;
				color: #333333;
				margin-bottom: 10upx;
			}
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			._li {
				width: 50%;
				height: 200upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 24upx;
				color: #6b6b6b;
				border-top: solid 1upx #e4e4e4;
				border-bottom: solid 1upx #e4e4e4;
				border-left: solid 1upx #e4e4e4;
				box-sizing: border-box;
				&:nth-child(odd) {
					border-left: none;
				}
				&:nth-child(1) {
					border-bottom: none;
				}
				&:nth-child(2) {
					border-bottom: none;
				}
				text {
					font-size: 48upx;
					color: #333333;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
