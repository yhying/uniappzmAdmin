<template>
	<view class="page">
		<view class="order-money">
			<view class="_title">订单金额</view>
			<view class="item">
				<view class="_li">
					<view class="money red">
						￥<text v-text="data.total_amount"></text>
					</view>
					总额
				</view>
				<view class="_li">
					<view class="money">
						￥<text v-text="data.pay_amount"></text>
					</view>
					应付
				</view>
				<view class="_li">
					<view class="money">
						￥<text v-text="data.real_amount"></text>
					</view>
					实付
				</view>
				<view class="_li">
					<view class="money green">
						￥<text v-text="data.rest_amount"></text>
					</view>
					欠款
				</view>
			</view>
		</view>
		<view class="order-info">
			<view class="_title">订单信息</view>
			<view class="item">
				<view class="_li">
					<text>预约时间:</text>
					{{data.appoint_date}}  {{data.appoint_btime}} <view class="status" v-text="data.cus_type_name"></view>
				</view>
				<view class="_li">
					<text>订单编号:</text>
					{{data.order_no}}
				</view>
				<view class="_li">
					<text>收银时间:</text>
					{{data.pay_time}}
				</view>
				<view class="_li">
					<text>预约门店:</text>
					{{data.dept_name}}
				</view>
				<view class="_li">
					<text>预约人员:</text>
					{{data.add_user_name}}
				</view>
				<view class="_li">
					<text>收银人员:</text>
					{{data.rec_user_name}}
				</view>
				<view class="_li">
					<text>预约备注:</text>
					{{data.cart_remarks}}
				</view>
				<view class="_li">
					<text>订单备注:</text>
					{{data.remarks}}
				</view>
			</view>
		</view>
		<view class="data-info">
			<view class="tabs">
				<view class="_li" v-for="(item,index) in tabs.list" :key="index" :class="{on:tabs.index==index}" v-text="item" @click="tabsClick(index)"></view>
			</view>
			<table v-if="tabs.index == 0">
				<tr>
					<th v-for="(item,index) in consume.tabs" :key="index" v-text="item"></th>
				</tr>
				<tr v-for="(item,index) in consume.list" :key="index">
					<td v-text="item.prod_name"></td>
					<td v-text="item.teacher_name"></td>
					<td v-text="'￥'+item.money"></td>
					<td v-text="item.buy_num"></td>
					<td v-text="'￥'+item.unit_price"></td>
				</tr>
			</table>
			<table v-if="tabs.index == 1">
				<tr>
					<th v-for="(item,index) in performance.tabs" :key="index" v-text="item"></th>
				</tr>
				<tr v-for="(item,index) in performance.list" :key="index">
					<td v-text="item.pay_time"></td>
					<td v-text="item.pay_money"></td>
					<td v-text="'￥'+item.pay_card"></td>
					<td>
						<button>分配业绩</button>
					</td>
				</tr>
			</table>
		</view>
		<view class="page-btn" v-if="data.status == 1 && data.is_rest == 1 && data.rest_amount > '0'">
			<button>还款</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				data: {},
				tabs: {
					index: 0,
					list: ['消息信息','技师业绩']
				},
				consume: {
					tabs: ['项目','技师','价格','数量','应付金额'],
					list: []
				},
				performance: {
					tabs: ['日期','业绩','卡耗','操作'],
					list: []
				}
			}
		},
		onLoad(e) {
			this.orderDetail(e.order_id)
			this.paymentGetPayHis(e.order_no)
		},
		methods: {
			tabsClick(e) {
				this.tabs.index = e
			},
			// 订单详情接口
			orderDetail(order_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'order/detail',
					method: 'GET',
					data: {
						order_id: order_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.consume.list = res.data.data.list
						this.data = res.data.data.main
					}
				});
			},
			// 业绩分配接口
			paymentGetPayHis(order_no) {
				uni.request({
					url: uni.getStorageSync('interface') + 'payment/GetPayHis',
					method: 'GET',
					data: {
						order_no: order_no
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res.data.data);
						this.performance.list = res.data.data
					}
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f6f6f6;
	}
	
	.page-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 98upx;
		background: #FFFFFF;
		button {
			width: 178upx;
			height: 66upx;
			border-radius: 100upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #ff0066;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 20upx;
			top: 50%;
			margin-top: -33upx;
		}
	}
	
	.data-info {
		margin-left: 20upx;
		margin-right: 20upx;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 20upx;
		.tabs {
			display: flex;
			height: 72upx;
			border-bottom: solid 2upx #f2f2f2;
			._li {
				flex: 1;
				display: flex;
				height: 100%;
				align-items: center;
				justify-content: center;
				position: relative;
				font-size: 28upx;
				color: #333333;
				&.on {
					color: #ff0066;
					&:after {
						content: '';
						position: absolute;
						width: 78upx;
						height: 4upx;
						background: #ff0066;
						bottom: 0;
						left: 50%;
						margin-left: -39upx;
					}
				}
			}
		}
		table {
			width: 100%;
			border-collapse: collapse;
			tr {
				&:nth-child(even) {
					td {
						background: #f6f7f9;
					}
				}
			}
			th {
				height: 66upx;
				font-size: 22upx;
				font-weight: normal;
				color: #333333;
			}
			td {
				height: 86upx;
				font-size: 24upx;
				color: #949494;
				text-align: center;
				button {
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: solid 1upx #FF0066;
					font-size: 24upx;
					border-radius: 100upx;
					color: #FF0066;
					width: auto;
					padding-left: 5upx;
					padding-right: 5upx;
				}
			}
		}
	}
	
	.order-info {
		margin-left: 20upx;
		margin-right: 20upx;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 20upx;
		.item {
			padding-left: 34upx;
			padding-right: 34upx;
			._li {
				height: 55upx;
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #949494;
				text {
					font-size: 24upx;
					color: #949494;
					width: 186upx;
				}
				.status {
					height: 30upx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 10upx;
					padding-right: 10upx;
					height: 35upx;
					color: #FFFFFF;
					background: #ff0066;
					border-radius: 100upx;
					margin-left: 34upx;
				}
			}
		}
	}
	._title {
		height: 75upx;
		display: flex;
		align-items: center;
		margin-left: 20upx;
		position: relative;
		font-size: 30upx;
		color: #333333;
		padding-left: 14upx;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			width: 4upx;
			height: 28upx;
			background: #ff0066;
			margin-top: -14upx;
		}
	}
	
	.order-money {
		margin-left: 20upx;
		margin-right: 20upx;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 20upx;
		.item {
			display: flex;
			._li {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22upx;
				color: #333333;
				height: 143upx;
				.money {
					font-size: 20upx;
					color: #333333;
					&.red {
						color: #ff0066;
						text {
							color: #ff0066;
						}
					}
					&.green {
						color: #669933;
						text {
							color: #669933;
						}
					}
					text {
						font-size: 30upx;
					}
				}
			}
		}
	}
</style>
