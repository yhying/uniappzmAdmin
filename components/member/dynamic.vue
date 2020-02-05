<template>
	<view class="dynamic">
		<view class="nums">
			<view class="_li">
				<text v-text="form.to_shop"></text>
				到店数
			</view>
			<view class="_li">
				<text v-text="form.paid_amount"></text>
				消费总额
			</view>
		</view>
		<view class="list">
			<view class="_li" v-for="(item, index) in list" :key="index">
				<image src="../../static/style/avatar.png" class="avatar" mode="widthFix"></image>
				<view class="info">
					<view class="title">
						<view class="user-title">
							{{item.user_name}} <text class="yuyue" v-if="item.type == 1">预约</text><text class="dingjin" v-if="item.type == 3">定金</text><text
							 class="dingdan" v-if="item.type == 2">订单</text>
						</view>
						<view class="date" v-text="item.add_date +'  '+ item.add_time"></view>
					</view>
					<view class="project">项目：{{item.content}}</view>
					<view class="remark">备注：</view>
					<button class="message">留言</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['form', 'list'],
		data() {
			return {
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {},
		methods: {}
	}
</script>

<style lang="less">
	.nums {
		background: #FFFFFF;
		height: 200upx;
		display: flex;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			width: 1upx;
			height: 65upx;
			left: 50%;
			top: 50%;
			margin-left: -.5upx;
			margin-top: -32.5upx;
			background: #e4e4e4;
		}

		._li {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24upx;
			color: #6b6b6b;

			text {
				color: #333333;
				font-size: 48upx;
				margin-bottom: 20upx;
			}
		}
	}

	.list {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 220upx;
		background: #FFFFFF;
		overflow-x: hidden;
		overflow-y: auto;

		._li {
			padding-top: 30upx;
			padding-bottom: 30upx;
			border-top: solid 1upx #f6f7f9;
			padding-left: 30upx;
			padding-right: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&:first-child {
				border-top: none;
			}

			.avatar {
				width: 90upx;
				height: 100%;
			}

			.info {
				width: 580upx;
				position: relative;

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.user-title {
						font-size: 32upx;
						display: flex;
						align-items: center;
						color: #333333;

						text {
							color: #FFFFFF;
							height: 40upx;
							font-size: 24upx;
							width: 90upx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 10upx;
							margin-left: 20upx;

							&.yuyue {
								background: #9999ff;
							}

							&.dingjin {
								background: #ff9999;
							}

							&.dingdan {
								background: #99cccc;
							}
						}
					}

					.date {
						font-size: 22upx;
						color: #b7b7b7;
					}
				}

				.project {
					font-size: 28upx;
					color: #333333;
					margin-top: 10upx;
				}

				.remark {
					font-size: 22upx;
					color: #949494;
					margin-top: 15upx;
				}

				.message {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 126upx;
					height: 54upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26upx;
					color: #333333;
					border-radius: 10upx;
					border: solid 1upx #d7d7d7;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
