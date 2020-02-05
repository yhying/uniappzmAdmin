<template>
	<view class="page">
		<view class="user-info-data">
			<view class="user-info">
				<view class="user-data">
					<view class="avatar">
						<image src="../../static/images/genteravator.png" mode="widthFix"></image>
						<image v-if="detail.info.cus_sex == 1" src="../../static/style/sex-icon1.png" class="sex" mode="widthFix"></image>
						<image v-if="detail.info.cus_sex == 2" src="../../static/style/sex-icon2.png" class="sex" mode="widthFix"></image>
						<image v-if="detail.info.cus_sex == 3" src="../../static/style/sex-icon3.png" class="sex" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="_h5">{{detail.info.cus_name}}<text v-text="detail.info.cus_grade_name"></text></view>
						<text class="phone" v-text="detail.info.cus_mobile"></text>
						<text class="remark">备注：{{detail.info.remarks}}</text>
					</view>
				</view>
				<view class="store">门店：{{detail.info.dept_name}}</view>
			</view>
			<view class="data-item">
				<view class="_li">
					<text v-text="detail.info.balance"></text>
					余额
				</view>
				<view class="_li">
					<text v-text="detail.info.rest_amount"></text>
					欠款
				</view>
				<view class="_li">
					<text v-text="detail.info.scores"></text>
					积分
				</view>
			</view>
		</view>
		<view class="page-list">
			<view class="nav">
				<text v-for="(item,index) in list.nav.list" :key="index" v-text="item" :class="{on:list.nav.index==index}" @click="navClick(index)"></text>
			</view>
			<view class="centent">
				<view class="search">
					<input type="text" placeholder="名称" />
					<image src="../../static/style/search-icon.png" mode="widthFix"></image>
				</view>
				<view class="list" v-show="list.nav.index == 0">
					<view class="_li" v-for="(item, index) in list.centent.project" :key="index" :class="{on:item.status==true}"
					 @click="listClick('project',item,index)">
						{{item.si_name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="list" v-show="list.nav.index == 1">
					<view class="_li" v-for="(item, index) in list.centent.product" :key="index" :class="{on:item.status==true}"
					 @click="listClick('product',item,index)">
						{{item.sr_name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="list" v-show="list.nav.index == 2">
					<view class="_li" v-for="(item, index) in list.centent.package" :key="index" :class="{on:item.status==true}"
					 @click="listClick('package',item,index)">
						{{item.sp_name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="list" v-show="list.nav.index == 3">
					<view class="_li" v-for="(item, index) in list.centent.card" :key="index" :class="{on:item.status==true}" @click="listClick('card',item,index)">
						{{item.sc_name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="list" v-show="list.nav.index == 4">
					<view class="_li" v-for="(item, index) in list.centent.cardlist" :key="index" :class="{on:item.status==true}"
					 @click="listClick('cardlist',item,index)">
						{{item.card_name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.card_balance"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-btn">
			<view class="btn-info">
				<text class="nums">已选择 {{btn.nums}} 件</text>
				<view class="money">
					￥<text v-text="btn.money"></text><text class="unit">元</text>
				</view>
			</view>
			<button @click="btnClick()">确认</button>
		</view>
		<page-order ref="order"></page-order>
	</view>
</template>

<script>
	import pageOrder from "@/components/price/order.vue";
	export default {
		components: {pageOrder},
		data() {
			return {
				detail: {},
				list: {
					nav: {
						index: 0,
						list: ['服务', '产品', '套餐', '办卡', '卡充值', '余额充值']
					},
					centent: {
						project: [],
						product: [],
						package: [],
						card: [],
						cardlist: [],
						entire: []
					}
				},
				btn: {
					nums: 0,
					money: 0
				}
			}
		},
		onLoad(e) {
			this.customerDetail(e.cus_id)
			this.cententGet(e.dept_id, e.cus_id)
			if (e.cart_id) {
				this.cartDetail(e.cart_id)
			}
		},
		methods: {
			navClick(e) {
				this.list.nav.index = e
			},
			btnClick() {
				let _this = this
				var project = new Array(),
					product = new Array(),
					packageList = new Array(),
					card = new Array(),
					cardlist = new Array()
				this.list.centent.project.forEach((item, index) => {
					if (item.status === true) {
						project[index] = {
							prod_id: item.si_id,
							prod_type: item.prod_type,
							unit_price: item.price,
							money: item.card_balance,
							name: item.si_name,
							buy_num: 1
						}
					}
				})
				this.list.centent.product.forEach((item, index) => {
					if (item.status === true) {
						product[index] = {
							prod_id: item.sr_id,
							prod_type: item.prod_type,
							unit_price: item.price,
							money: item.card_balance,
							name: item.sr_name,
							buy_num: 1
						}
					}
				})
				this.list.centent.package.forEach((item, index) => {
					if (item.status === true) {
						packageList[index] = {
							prod_id: item.sp_id,
							prod_type: item.prod_type,
							unit_price: item.price,
							money: item.card_balance,
							name: item.sp_name,
							buy_num: 1
						}
					}
				})
				this.list.centent.card.forEach((item, index) => {
					if (item.status === true) {
						card[index] = {
							prod_id: item.sc_id,
							prod_type: item.prod_type,
							unit_price: item.price,
							money: item.card_balance,
							name: item.sc_name,
							buy_num: 1
						}
					}
				})
				this.list.centent.cardlist.forEach((item, index) => {
					if (item.status === true) {
						cardlist[index] = {
							prod_id: item.card_id,
							prod_type: item.prod_type,
							unit_price: item.card_balance,
							money: item.card_balance,
							name: item.card_name,
							buy_num: 1
						}
					}
				})
				this.list.centent.entire = []
				// 合并勾选后的数组
				this.list.centent.entire = this.list.centent.entire.concat(project,product,packageList,card,cardlist).sort()
				if (this.list.centent.entire.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品或者服务！'
					});
					return
				}
				uni.setStorage({
				    key: 'orderListCentent',
				    data: this.list.centent.entire,
				    success: function () {
						_this.$refs.order.itemClick('true')
				    }
				});
			},
			customerDetail(cus_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/detail',
					data: {
						cus_id: cus_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						this.detail = res.data.data
					}
				});
			},
			cartDetail(cart_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/detail',
					data: {
						cart_id: cart_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						this.list.centent.project.forEach((item1, index1) => {
							res.data.data.items.forEach((item, index) => {
								if (item1.si_id === item.prod_id) {
									item1.status = true
								}
							})
						})
						this.list.centent.product.forEach((item1, index1) => {
							res.data.data.items.forEach((item, index) => {
								if (item1.sr_id === item.prod_id) {
									item1.status = true
								}
							})
						})
						this.list.centent.package.forEach((item1, index1) => {
							res.data.data.items.forEach((item, index) => {
								if (item1.sp_id === item.prod_id) {
									item1.status = true
								}
							})
						})
						this.list.centent.card.forEach((item1, index1) => {
							res.data.data.items.forEach((item, index) => {
								if (item1.sc_id === item.prod_id) {
									item1.status = true
								}
							})
						})
						this.listClick()
					}
				});
			},
			// 计算数量、金额
			listClick(e, item, index) {
				var projectNums = 0,
					productNums = 0,
					packageNums = 0,
					cardNums = 0,
					cardlistNums = 0,
					projectMoney = 0,
					productMoney = 0,
					packageMoney = 0,
					cardlistMoney = 0,
					cardMoney = 0;
				if (e === 'project') {
					this.list.centent.project[index].status = !this.list.centent.project[index].status
				} else if (e === 'product') {
					this.list.centent.product[index].status = !this.list.centent.product[index].status
				} else if (e === 'package') {
					this.list.centent.package[index].status = !this.list.centent.package[index].status
				} else if (e === 'card') {
					this.list.centent.card[index].status = !this.list.centent.card[index].status
				} else if (e === 'cardlist') {
					this.list.centent.cardlist[index].status = !this.list.centent.cardlist[index].status
				}
				this.list.centent.project.forEach((item, index) => {
					if (item.status === true) {
						projectNums += parseInt(item.nums)
						projectMoney += parseInt(item.price)
					}
				})
				this.list.centent.product.forEach((item, index) => {
					if (item.status === true) {
						productNums += parseInt(item.nums)
						productMoney += parseInt(item.price)
					}
				})
				this.list.centent.package.forEach((item, index) => {
					if (item.status === true) {
						packageNums += parseInt(item.nums)
						packageMoney += parseInt(item.price)
					}
				})
				this.list.centent.card.forEach((item, index) => {
					if (item.status === true) {
						cardNums += parseInt(item.nums)
						cardMoney += parseInt(item.vprice)
					}
				})
				this.list.centent.cardlist.forEach((item, index) => {
					if (item.status === true) {
						cardlistNums += parseInt(item.nums)
						cardlistMoney += parseInt(item.vprice)
					}
				})
				this.btn.money = projectMoney + productMoney + packageMoney + cardlistMoney + cardMoney
				this.btn.nums = projectNums + packageNums + productNums + cardNums + cardlistNums
			},
			cententGet(dept_id, cus_id) {
				// 服务接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceitem/lists',
					data: {
						dept_id: dept_id,
						status: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						res.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'prod_type', 1)
							this.$set(item, 'nums', '1')
						})
						this.list.centent.project = res.data.data
					}
				});
				// 产品接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceproduct/lists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						status: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'prod_type', 2)
							this.$set(item, 'nums', '1')
						})
						this.list.centent.product = res.data.data
					}
				});
				// 套餐接口
				uni.request({
					url: uni.getStorageSync('interface') + 'servicepackage/lists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						status: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'prod_type', 3)
							this.$set(item, 'nums', '1')
						})
						this.list.centent.package = res.data.data
					}
				});
				// 办卡接口
				uni.request({
					url: uni.getStorageSync('interface') + 'servicecard/lists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						status: 1,
						expired: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'prod_type', 4)
							this.$set(item, 'nums', '1')
						})
						this.list.centent.card = res.data.data
					}
				});
				// 卡充值接口
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/cardlist',
					method: 'GET',
					data: {
						cus_id: cus_id,
						pagesize: 1000,
						status: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'prod_type', 5)
							this.$set(item, 'nums', '1')
						})
						this.list.centent.cardlist = res.data.data.data
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.page {
		background: #f6f6f6;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.page-list {
		position: absolute;
		left: 0;
		right: 0;
		top: 307upx;
		background: #FFFFFF;
		bottom: 90upx;

		.nav {
			position: absolute;
			left: 0;
			width: 170upx;
			bottom: 0;
			top: 0;
			background: #f9fafc;
			overflow-x: hidden;
			overflow-y: auto;

			text {
				display: flex;
				height: 90upx;
				font-size: 26upx;
				color: #1d1c1c;
				justify-content: center;
				align-items: center;

				&.on {
					background: #FFFFFF;
				}
			}
		}

		.centent {
			position: absolute;
			left: 170upx;
			bottom: 0;
			top: 0;
			right: 0;

			.search {
				margin-left: 30upx;
				margin-right: 30upx;
				margin-top: 30upx;
				height: 68upx;
				background: #f9f9f9;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					height: 100%;
					padding-left: 30upx;
					width: 410upx;
					font-size: 24upx;
				}

				image {
					width: 35upx;
					height: 100%;
					margin-right: 30upx;
				}
			}

			.list {
				position: absolute;
				left: 30upx;
				right: 30upx;
				top: 128upx;
				bottom: 0;
				overflow-x: hidden;
				overflow-y: auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: flex-start;
				align-items: flex-start;

				._li {
					width: 246upx;
					height: 120upx;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					flex-direction: column;
					font-size: 26upx;
					color: #1b1b1b;
					background: #f6f7f9;
					border: solid 2upx #e8e8e9;
					box-sizing: border-box;
					margin-bottom: 30upx;
					position: relative;
					padding-left: 20upx;

					&.on {
						border: solid 2upx #ff0056;
					}

					.info {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 10upx;

						.money {
							font-size: 20upx;
							color: #ff0062;
							display: flex;
							align-items: center;

							text {
								font-size: 28upx;
								color: #ff0062;

								&.unit {
									font-size: 22upx;
									color: #1b1b1b;
									margin-left: 10upx;
								}
							}
						}

						image {
							width: 30upx;
							height: 100%;
							margin-left: 40upx;
							position: absolute;
							right: 20upx;
						}
					}
				}
			}
		}
	}

	.page-btn {
		position: absolute;
		height: 90upx;
		left: 0;
		right: 0;
		bottom: 0;

		.btn-info {
			position: absolute;
			right: 240upx;
			left: 0;
			top: 0;
			bottom: 0;
			background: #f9fafc;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 40upx;
			padding-right: 40upx;

			text {
				font-size: 36upx;
				color: #ff0066;

				&.nums {
					font-size: 22upx;
					color: #868686;
				}

				&.unit {
					font-size: 22upx;
					color: #ff0066;
				}
			}

			.money {
				font-size: 20upx;
				color: #ff0066;
			}
		}

		button {
			width: 240upx;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			background: #ff0066;
			font-size: 22upx;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0;
		}
	}

	.user-info-data {
		height: 267upx;
		border-radius: 20upx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		left: 20upx;
		right: 20upx;
		top: 20upx;
		overflow: hidden;

		.user-info {
			height: 152upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20upx;
			padding-right: 20upx;

			.user-data {
				display: flex;
				align-items: center;

				.avatar {
					width: 112upx;
					height: 112upx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						border-radius: 100upx;

						&.sex {
							width: 35upx;
							position: absolute;
							right: 0;
							bottom: 0;
						}
					}
				}

				.info {
					display: flex;
					justify-content: center;
					flex-direction: column;
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

					text {
						font-size: 22upx;
						color: #8d8d8d;
						margin-top: 5upx;

						&.phone {
							color: #898989;
						}

						&.remark {
							color: #c7c7c7;
						}
					}
				}
			}

			.store {
				color: #ff0061;
				font-size: 22upx;
			}
		}

		.data-item {
			height: 115upx;
			background: #ff0066;
			display: flex;

			._li {
				flex: 1;
				display: flex;
				height: 100%;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22upx;
				color: #FFFFFF;
				position: relative;

				&:first-child {
					&:after {
						height: 0;
					}
				}

				&:after {
					position: absolute;
					height: 50upx;
					top: 50%;
					margin-top: -25upx;
					width: 2upx;
					background: #FFFFFF;
					left: 0;
					content: '';
				}

				text {
					font-size: 30upx;
					color: #FFFFFF;
					margin-bottom: 10upx;
				}
			}
		}
	}
</style>
