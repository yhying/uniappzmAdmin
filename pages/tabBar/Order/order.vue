<template>
	<view class="pages">
		<view class="search">
			<view class="input">
				<image src="../../../static/style/search-icon.png" class="search-icon" mode="widthFix"></image>
				<input type="text" placeholder="手机号" v-model="form.search_content" @input="inputFunc" />
			</view>
			<image v-show="searchShow == false" src="../../../static/style/filter-icon.png" class="filter-icon" mode="widthFix"
			 @click="filterClick()"></image>
			<text v-show="searchShow == true" @click="hideClick()">取消</text>
		</view>
		<view class="list">
			<view class="_li" v-for="(item,index) in list" :key="index">
				<view class="user-title">
					<text v-text="item.projects"></text>
					<view class="money-status red" v-if="item.is_rest == 1 && item.rest_amount > '0'">分期中</view>
					<view class="money-status red" v-if="item.is_rest == 1 && item.rest_amount == '0'">已还清</view>
				</view>
				<view class="user-info">
					<view class="avatar">
						<image src="../../../static/style/avatar.png" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="_h5">{{item.cus_name}}<text>普通会员</text></view>
						<view class="phone" v-text="item.cus_mobile"></view>
						<view class="money">消费:<span v-text="'￥'+item.pay_amount"></span></view>
					</view>
					<view class="status green" v-if="item.status == 0">未付款</view>
					<view class="status red" v-if="item.status == 1">已付款</view>
					<view class="status gray" v-if="item.status == 2">已取消</view>
					<view class="status gray" v-if="item.status == 3">已退款</view>
					<view class="status green" v-if="item.status == 5">付款中</view>
				</view>
				<view class="more-item">
					<view class="date">{{item.appoint_date}} {{item.appoint_btime}}~{{item.appoint_btime}}</view>
					<view class="btn-item">
						<view class="operating" @click="selectClick(item)">
							<text></text>
							<text></text>
							<text></text>
						</view>
						<button v-if="item.status == 0 || item.status == 5" @click="cashClick(item)">收银</button>
					</view>
				</view>
			</view>
		</view>
	   <w-picker mode="selector" @confirm="moreConfirm" ref="moreSelect" :selectList="more.list" themeColor="#f00"></w-picker>
		<page-footer footIndex="1"></page-footer>
		<filter-page ref="filter" @childByValue="childByValue" ></filter-page>
		<popup :popup="popup" ref="popup" :popupPay="payget"></popup>
	</view>
</template>

<script>
	import pageFooter from "@/components/footer.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import filterPage from "@/components/yuyue/orederChoose.vue"
	import popup from '@/components/member/popup'
	
	export default {
		components: {
			pageFooter,wPicker,filterPage,popup
		},
		data() {
			return {
				popup: '',
				payget: {
					list: [],
					data: {}
				},
				order: {},
				searchShow: false,
				list: {},
				more: {
					list: [],
					list1: [
						{
							value: '1',
							label: '还款'
						},{
							value: '2',
							label: '退款'
						},{
							value: '3',
							label: '详情'
						}
					],
					list2: [
						{
							value: '4',
							label: '退单'
						},{
							value: '3',
							label: '详情'
						}
					],
					list3: [
						{
							value: '2',
							label: '退款'
						},{
							value: '3',
							label: '详情'
						}
					],
					list4: [
						{
							value: '2',
							label: '退款'
						}
					],
					list5: [
						{
							value: '3',
							label: '详情'
						}
					]
				},
				form: {
					pagesize: '',
					search_content: ''
				}
			}
		},
		onLoad(e) {
			this.orderLists(this.form.pagesize, '','')
		},
		methods: {
			cashClick(item) {
				uni.request({
					url: uni.getStorageSync('interface') + 'payment/payinfo',
					method: 'GET',
					data: {
						order_no: item.order_no,
						cus_id: item.cus_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.payget.data = res.data.data[0]
						this.payget.list = uni.getStorageSync('setPayment')
						this.popup = 11
						this.$refs.popup.itemClick('true')
					}
				});
			},
			inputFunc(e) {
				this.form.search_content = e.detail.value
				this.orderLists(this.form.pagesize, '',e.detail.value)
				if (e.detail.value.length >= 1) {
					this.searchShow = true
				} else {
					this.searchShow = false
				}
			},
			hideClick() {
				this.form.search_content = ''
				this.searchShow = false
				this.orderLists(this.form.pagesize, '','')
			},
			// 预约列表接口
			orderLists(pagesize, dept_ids, search_content) {
				uni.request({
					url: uni.getStorageSync('interface') + 'order/lists', //
					method: 'GET',
					data: {
						dept_ids: dept_ids,
						pagesize: pagesize,
						search_type: 1,
						search_content: search_content
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						if (res.data.code === 0) {
							uni.setStorage({
								key: 'token',
								data: '',
								success: function() {
									uni.navigateTo({
										url: `/pages/login/index`,
									})
								}
							});
							return
						}
						this.list = res.data.data.data
					}
				});
			},
			selectClick(item) {
				this.order = item
				if (item.status == 1 && item.is_rest == 1 && item.rest_amount > '0') {
					this.more.list = this.more.list1
				} else if (item.status == 0) {
					this.more.list = this.more.list2
				} else if (item.status == 1) {
					this.more.list = this.more.list3
				} else if (item.status == 5) {
					this.more.list = this.more.list4
				} else if (item.status == 2) {
					this.more.list = this.more.list5
				}
				this.$refs.moreSelect.show();
			},
			moreConfirm(e) {
				let _this = this
				if (e.checkArr.value === '4') {
					uni.showModal({
					    title: '提示',
					    content: '确定取消退单吗？',
					    success: function (res) {
					        if (res.confirm) {
								_this.orderCancel()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				} else if (e.checkArr.value === '2') {
					uni.showModal({
					    title: '提示',
					    content: '确定取消退款吗？',
					    success: function (res) {
					        if (res.confirm) {
								_this.orderChargeback()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				} else if (e.checkArr.value === '3') {
					uni.navigateTo({
						url: `/pages/order/detail?order_id=`+ this.order.main_id + '&order_no=' + this.order.order_no
					})
				}
			},
			// 退单接口
			orderCancel() {
				uni.request({
					url: uni.getStorageSync('interface') + 'order/cancel', //
					method: 'POST',
					data: {
						order_id: this.order.main_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						this.orderLists(this.form.pagesize, '','')
					}
				});
			},
			// 退款接口
			orderChargeback() {
				uni.request({
					url: uni.getStorageSync('interface') + 'order/chargeback', //
					method: 'POST',
					data: {
						order_id: this.order.main_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						this.orderLists(this.form.pagesize, '','')
					}
				});
			},
			filterClick(){
				this.$refs.filter.itemClick('true')
			},
			childByValue: function(childValue) {
				this.list = childValue
			},
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
		opacity: 0;
	}
	.search {
		margin-left: 20upx;
		margin-right: 20upx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.input {
			display: flex;
			align-items: center;
			background-color: #F8F8F8;
			height: 70upx;
			width: 620upx;

			input {
				font-size: 24upx;
				margin-left: 20upx;
				width: 500upx;
			}
		}

		text {
			font-size: 28upx;
			color: #333333;
		}

		image {
			height: 100%;

			&.search-icon {
				width: 35upx;
				margin-left: 30upx;
			}

			&.filter-icon {
				width: 60upx;
			}
		}
	}

	.list {
		position: absolute;
		left: 0;
		top: 82upx;
		bottom: 110upx;
		right: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background: #f6f6f6;

		._li {
			width: 710upx;
			margin-left: auto;
			margin-right: auto;
			margin-top: 20upx;
			background: #FFFFFF;
			border-radius: 20upx;
			
			.user-title {
				height: 70upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 20upx;
				margin-right: 20upx;
				border-bottom: solid 2upx #f2f2f2;
				text {
					font-size: 28upx;
					color: #333333;
				}
				
				.money-status {
					width: 130upx;
					height: 50upx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 100upx;
					font-size: 24upx;
					&.red {
						color: #FFFFFF;
						background: #ff0066;
					}
				}
			}

			.user-info {
				height: 166upx;
				display: flex;
				align-items: center;
				margin-left: 20upx;
				margin-right: 20upx;
				border-bottom: solid 2upx #f5f5f5;
				box-sizing: border-box;
				position: relative;

				.avatar {
					width: 110upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.status {
					position: absolute;
					right: 20upx;
					top: 0;
					height: 100%;
					display: flex;
					align-items: center;
					font-size: 22upx;

					&.green {
						color: #4e8912;
					}

					&.red {
						color: #FF0066;
					}

					&.gray {
						color: #949494;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 20upx;

					._h5 {
						font-size: 26upx;
						color: #292929;
						display: flex;
						align-items: center;

						text {
							padding-left: 8upx;
							padding-right: 8upx;
							padding-top: 4upx;
							padding-bottom: 4upx;
							margin-left: 10upx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 18upx;
							color: #9f9f9f;
							border: solid 2upx #ebebeb;
							border-radius: 8upx;
						}
					}

					.phone {
						font-size: 22upx;
						color: #8d8d8d;
						margin-top: 5upx;
					}

					.money {
						font-size: 22upx;
						color: #8d8d8d;
						margin-top: 5upx;
						span {
							font-size: 28upx;
							color: #ff0000;
							margin-left: 10upx;
						}
					}
				}
			}

			.more-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90upx;
				margin-left: 20upx;
				margin-right: 20upx;

				.date {
					font-size: 22upx;
					color: #848484;
				}

				.btn-item {
					display: flex;
					align-items: center;
					height: 100%;

					.operating {
						display: flex;
						align-items: center;
						height: 100%;

						text {
							width: 11upx;
							height: 11upx;
							border-radius: 1000upx;
							overflow: hidden;
							background: #c2c2c2;
							margin-left: 5upx;

							&:first-child {
								margin-left: 0;
							}
						}
					}

					button {
						width: 130upx;
						height: 50upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 26upx;
						border-radius: 200upx;
						color: #ff0066;
						border: solid 2upx #ff0066;
						box-sizing: border-box;
						margin-left: 30upx;
					}
				}
			}
		}
	}
</style>
