<template>
	<view class="page">
		<view class="header">
			<view class="_h1" @click="addressClick">
				{{store.label}}
				<image src="../../../static/home/select-icon.png" mode="widthFix"></image>
			</view>
			<view class="news_">
				<image src="../../../static/home/tabs-icon5.png" class="login-return" mode="widthFix" @click="toRemind()"></image>
				<image src="../../../static/home/tabs-icon6.png" class="login-return" @click="showlist()" mode="widthFix"></image>
				<text>16</text>
			</view>
		</view>
		<view class="main">
			<view class="nums-item">
				<view class="_h2">
					<h2>今日数据</h2>
					<text v-text="data.total_achieve.today"></text>
				</view>
				<view class="nums">
					<view class="_li">
						订单数
						<text v-text="data.order_num.today"></text>
					</view>
					<view class="_li">
						新增会员数
						<text v-text="data.new_user_num.today"></text>
					</view>
					<view class="_li">
						预约数
						<text v-text="data.appoint_num.today"></text>
					</view>
				</view>
				<view class="nums">
					<view class="_li">
						卡耗
						<text v-text="data.total_card_cost.today"></text>
					</view>
					<view class="_li">
						客单
						<text v-text="data.total_per_price.today"></text>
					</view>
					<view class="_li">
						到店数
						<text v-text="data.reach_num.today"></text>
					</view>
				</view>
			</view>
			<view class="tabs-item">
				<view class="_title">常用操作</view>
				<view class="item">
					<view class="_li" @click="tabsClick(0)">
						<image src="../../../static/home/tabs-icon1.png" mode="widthFix"></image>
						快速收银
					</view>
					<view class="_li" @click="tabsClick(1)">
						<image src="../../../static/home/tabs-icon2.png" mode="widthFix"></image>
						新增预约
					</view>
					<view class="_li" @click="tabsClick(2)">
						<image src="../../../static/home/tabs-icon3.png" mode="widthFix"></image>
						新增会员
					</view>
					<view class="_li" @click="tabsClick(3)">
						<image src="../../../static/home/tabs-icon4.png" mode="widthFix"></image>
						新增定金
					</view>
				</view>
			</view>
			<view class="chart-item">
				<view class="_title">数据趋势</view>
				<view class="performance data-item">
					<text>业绩数据</text>
					<view class="select-item">
						<view class="_li" v-for="(item,index) in performance.tabs.list" :key="index" :class="{on:performance.tabs.index==index}"
						 @click="chartTabsClick('performance',index,item)"><span></span>{{item.name}}</view>
					</view>
				</view>
				<performance :chart="performance.chart" ref="chartPerformance"></performance>
				<view class="consumption data-item">
					<text>卡耗数据</text>
					<view class="select-item">
						<view class="_li" v-for="(item,index) in consumption.tabs.list" :key="index" :class="{on:consumption.tabs.index==index}"
						 @click="chartTabsClick('consumption',index,item)"><span></span>{{item.name}}</view>
					</view>
				</view>
				<consumption :chart="consumption.chart" ref="chartConsumption"></consumption>
				<view class="passenger data-item">
					<text>客单数据</text>
					<view class="select-item">
						<view class="_li" v-for="(item,index) in passenger.tabs.list" :key="index" :class="{on:passenger.tabs.index==index}"
						 @click="chartTabsClick('passenger',index,item)"><span></span>{{item.name}}</view>
					</view>
				</view>
				<passenger :chart="passenger.chart" ref="chartPassenger"></passenger>
			</view>
			<!-- 			<view class="list_">
				<text>添加门店</text>
				<text>添加技师</text>
				<text>退出登录</text>
			</view> -->
		</view>
		<w-picker mode="selector" @confirm="storeConfirm" ref="storeSelect" :selectList="store.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="loginConfirm" ref="loginSelect" :selectList="login.list" themeColor="#f00">
		</w-picker>
		<page-footer footIndex="0"></page-footer>
		<popup :popup="popup" ref="popup" :popupList="popupList"></popup>
	</view>
</template>
<script>
	import pageFooter from "@/components/footer.vue";
	import performance from "@/components/home/performance.vue";
	import consumption from "@/components/home/consumption.vue";
	import passenger from "@/components/home/passenger.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import popup from '@/components/member/popup'
	export default {
		components: {
			pageFooter,
			performance,
			consumption,
			passenger,
			wPicker,
			popup
		},
		data() {
			return {
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				popup: '',
				data: {},
				show: false,
				store: {
					label: '索兰黛',
					value: '',
					list: []
				},
				login: {
					list: [{
							label: "添加门店"
						},
						{
							label: "添加技师"
						},
						{
							label: "退出登录"
						},
					]
				},
				popupList: {
					package: [],
					product: [],
					project: [],
					room: []
				},
				performance: {
					tabs: {
						index: 0,
						value: '6',
						list: [{
							name: '本月',
							value: '6'
						}, {
							name: '本周',
							value: '4'
						}]
					},
					chart: []
				},
				consumption: {
					tabs: {
						index: 0,
						value: '6',
						list: [{
							name: '本月',
							value: '6'
						}, {
							name: '本周',
							value: '4'
						}]
					},
					chart: []
				},
				passenger: {
					tabs: {
						index: 0,
						value: '6',
						list: [{
							name: '本月',
							value: '6'
						}, {
							name: '本周',
							value: '4'
						}]
					},
					chart: []
				}
			}
		},
		onLoad(e) {
			this.deptLists()
			this.userUserList()
			this.getTodayInfo('0')
			this.setPayment()
			this.servicepackageCartlists()
			this.customerConfigGradelist()
			this.connectSocketInit()
		},
		onHide() {
			uni.setStorage({
				key: 'popupList',
				data: this.popupList,
				success: function() {}
			});
			uni.setStorage({
				key: 'room',
				data: this.popupList.room,
				success: function() {}
			});
			this.closeSocket();
		},
		methods: {
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "wss://saas.api.beiface.com:1313",
					success(data) {
						console.log("websocket连接成功");
						console.log(data);
					},
				});

				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					this.socketTask.send({
						data: "uni-app发送一条消息",
						async success() {
							console.log("消息发送成功");
						},
					});
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						console.log("收到服务器内容：" + res.data);
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			clickRequest() {
				if (this.is_open_socket) {
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					this.socketTask.send({
						data: "请求一次发送一次message",
						async success() {
							console.log("消息发送成功");
						},
					});
				}
			},
			leave() {
				// this.$uniReLaunch("/pages/tabbar/wallet/wallet")
			},
			tabsClick(e) {
				if (e === 1) {
					this.popup = 4
					this.$refs.popup.itemClick('true')
				} else if (e === 2) {
					uni.navigateTo({
						url: '/pages/member/addUser'
					});
				} else if (e === 0) {
					uni.navigateTo({
						url: '/pages/tabBar/Price/price'
					});
				} else if (e === 3) {
					this.popup = 7
					this.$refs.popup.itemClick('true')
				}
			},
			showlist() {
				this.$refs.loginSelect.show()
			},
			getTodayInfo(dept_id) {
				let _this = this
				uni.request({
					url: uni.getStorageSync('interface') + 'report/total/getTodayInfo',
					method: 'POST',
					header: {
						token: uni.getStorageSync('token')
					},
					data: {
						dept_id: dept_id
					},
					success: (res) => {
						this.data = res.data.data
						setTimeout(function() {
							_this.$refs.chartPerformance.itemClick('0', '6')
							_this.$refs.chartConsumption.itemClick1('0', '6')
							_this.$refs.chartPassenger.itemClick2('0', '6')
						}, 500)

					}
				});
			},
			// 获取门店列表
			deptLists() {
				uni.request({
					url: uni.getStorageSync('interface') + 'dept/lists',
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						var label = new Array()
						res.data.data.forEach((item, index) => {
							// console.log(item.id)
							label[index] = {
								label: item.dept_name,
								value: item.dept_id
							}
						})
						this.store.list = label
						this.store.list.unshift({
							label: '索兰黛',
							value: '0'
						})
						uni.setStorage({
							key: 'store1',
							data: this.store.list,
							success: function() {}
						});
						uni.setStorage({
							key: 'store',
							data: res.data.data,
							success: function() {}
						});
					},
					fail: (e) => {
						uni.showModal({
							title: '提示',
							content: '您还未登录，请登录！',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.setStorage({
										key: 'token',
										data: '',
										success: function() {
											uni.navigateTo({
												url: `/pages/login/index`,
											})
										}
									});
								}
							}
						});
					}
				});
			},
			// 会员类型
			customerConfigGradelist() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/config/gradelist',
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						var label = new Array()
						res.data.data.forEach((item, index) => {
							// console.log(item.id)
							label[index] = {
								label: item.grade_name,
								value: item.grade_id
							}
						})
						uni.setStorage({
							key: 'gradelist',
							data: label,
							success: function() {}
						});
					}
				});
			},
			// 技师列表接口
			userUserList() {
				uni.request({
					url: uni.getStorageSync('interface') + 'user/userList',
					method: 'GET',
					data: {
						pagesize: '10000',
						status: '1'
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						var label = new Array()
						res.data.data.data.forEach((item, index) => {
							// console.log(item.id)
							label[index] = {
								label: item.user_alias,
								value: item.user_id
							}
						})
						uni.setStorage({
							key: 'technician',
							data: label,
							success: function() {}
						});
					}
				});
			},
			// 支付方式
			setPayment() {
				uni.request({
					url: uni.getStorageSync('interface') + 'setPayment/list',
					method: 'GET',
					data: {},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							this.$set(item, 'money', '')
						})
						uni.setStorage({
							key: 'setPayment',
							data: res.data.data,
							success: function() {}
						});
					}
				});
			},
			addressClick() {
				this.$refs.storeSelect.show();
			},
			// 跳转提示页面
			toRemind() {
				uni.navigateTo({
					url: '/pages/member/myRemind'
				});
			},
			// 退出登录
			returnLogin() {
				uni.setStorage({
					key: 'token',
					data: '',
					success: function() {
						uni.navigateTo({
							url: '/pages/login/index'
						});
					}
				});
			},
			chartTabsClick(e, index, item) {
				if (e === 'performance') {
					this.performance.tabs.index = index
					this.performance.tabs.value = item.value
					this.$refs.chartPerformance.itemClick(this.store.value, item.value)
				} else if (e === 'consumption') {
					this.consumption.tabs.index = index
					this.consumption.tabs.value = item.value
					this.$refs.chartConsumption.itemClick1(this.store.value, item.value)
				} else if (e === 'passenger') {
					this.passenger.tabs.index = index
					this.passenger.tabs.value = item.value
					this.$refs.chartPassenger.itemClick2(this.store.value, item.value)
				}
			},
			storeConfirm(e) {
				this.store.label = e.checkArr.label
				this.store.value = e.checkArr.value
				this.$refs.chartPerformance.itemClick(this.store.value, this.performance.tabs.value)
				this.$refs.chartConsumption.itemClick1(this.store.value, this.consumption.tabs.value)
				this.$refs.chartPassenger.itemClick2(this.store.value, this.passenger.tabs.value)
			},
			loginConfirm(e) {
				console.log(e)
				console.log(e.result)
				if (e.result == "退出登录") {
					this.returnLogin()
				} else if (e.result == "添加门店") {
					uni.navigateTo({
						url: '/pages/member/addShop'
					});
				} else if (e.result == "添加技师") {
					uni.navigateTo({
						url: '/pages/member/addteacher'
					});
				}
			},
			servicepackageCartlists() {
				let _this = this
				// 套餐接口
				uni.request({
					url: uni.getStorageSync('interface') + 'servicepackage/lists',
					method: 'GET',
					data: {
						page: 1,
						pagesize: 15,
						pagedata: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'nums', '1')
							this.$set(item, 'name', item.sp_name)
						})
						this.popupList.package = res.data.data.data
					}
				});
				// 产品接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceproduct/lists',
					method: 'GET',
					data: {
						page: 1,
						pagesize: 15,
						pagedata: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'nums', '1')
							this.$set(item, 'name', item.sr_name)
						})
						this.popupList.product = res.data.data.data
					}
				});
				// 项目接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceitem/lists',
					method: 'GET',
					data: {
						page: 1,
						pagesize: 15,
						pagedata: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.data.forEach((item, index) => {
							this.$set(item, 'status', false)
							this.$set(item, 'nums', '1')
							this.$set(item, 'name', item.si_name)
						})
						this.popupList.project = res.data.data.data
					}
				});
				// 房间接口
				uni.request({
					url: uni.getStorageSync('interface') + 'room/config/lists',
					method: 'GET',
					data: {
						dept_id: ''
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						var label = new Array()
						res.data.data.forEach((item, index) => {
							label[index] = {
								label: item.room_name,
								value: item.room_id
							}
						})
						this.popupList.room = label
					}
				});
			},
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
	}

	.header {
		position: relative;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 40upx;
		background: #FFFFFF;

		._h1 {
			font-size: 42upx;
			font-weight: bold;
			color: #333333;
			display: flex;
			align-items: center;

			image {
				width: 50upx;
				margin-left: 10upx;
			}
		}

		.news_ {
			position: relative;
			align-items: center;
			display: flex;

			image:nth-child(2) {
				margin-left: 50upx;
			}

			text {
				position: absolute;
				top: -2upx;
				left: 36upx;
				width: 36upx;
				height: 24upx;
				border-radius: 15upx;
				background-color: #fe0869;
				z-index: 999;
				font-size: 12upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 5upx;
			}
		}

		.login-return {
			width: 50upx;
		}
	}

	.icon {
		position: absolute;
		bottom: -22upx;
		right: 32upx;
		width: 0;
		height: 0;
		border: 30upx solid transparent;
		border-bottom: 30upx solid #F1F1F1;
	}

	.icon:after {
		content: "";
		z-index: 999;
		position: absolute;
		bottom: -26upx;
		right: -20upx;
		width: 0;
		height: 0;
		border: 20upx solid transparent;
		border-bottom: solid 20upx #CCC
	}

	.main {
		position: absolute;
		left: 0;
		top: 108upx;
		bottom: 110upx;
		right: 0;
		background: #f6f6f6;
		overflow-x: hidden;
		overflow-y: auto;

		.nums-item {
			margin-left: 20upx;
			margin-right: 20upx;
			background: linear-gradient(to bottom, #ff6697 0%, #ff3939 100%);
			border-radius: 18upx;
			padding-top: 26upx;
			padding-bottom: 26upx;
			margin-top: 20upx;

			._h2 {
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;

				h2 {
					font-size: 26upx;
					font-weight: 700;
					height: 65upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				text {
					font-size: 64upx;
					font-weight: bold;
					height: 85upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.nums {
				height: 125upx;
				display: flex;

				._li {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 26upx;
					color: #FFFFFF;

					text {
						font-size: 26upx;
						font-weight: bold;
						margin-top: 20upx;
					}
				}
			}
		}

		.tabs-item {
			margin-left: 20upx;
			margin-right: 20upx;

			.item {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				justify-content: space-between;

				._li {
					height: 110upx;
					width: 340upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26upx;
					color: #151515;
					background: #f2f2f2;
					margin-bottom: 20upx;

					image {
						width: 60upx;
						margin-right: 20upx;
					}
				}
			}
		}

		.chart-item {
			margin-left: 20upx;
			margin-right: 20upx;

			.data-item {
				height: 76upx;
				position: relative;
				display: flex;
				justify-content: flex-end;

				.select-item {
					display: flex;
					align-items: center;

					._li {
						display: flex;
						align-items: center;
						height: 100%;
						font-size: 24upx;
						color: #171717;
						margin-left: 30upx;

						&:first-child {
							margin-left: 0;
						}

						span {
							width: 30upx;
							height: 30upx;
							margin-right: 10upx;
							border-radius: 100upx;
							border: solid 2upx #d4d4d4;
							position: relative;
						}

						&.on {
							span {
								&:after {
									content: '';
									width: 20upx;
									height: 20upx;
									position: absolute;
									left: 50%;
									top: 50%;
									margin-left: -10upx;
									margin-top: -10upx;
									background: #ff0066;
									border-radius: 100upx;
								}
							}
						}
					}
				}

				text {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					color: #252525;
				}
			}
		}

		._title {
			font-size: 26upx;
			color: #1b1b1b;
			height: 90upx;
			display: flex;
			align-items: center;
			padding-left: 30upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				height: 36upx;
				width: 10upx;
				top: 50%;
				margin-top: -18upx;
				background: linear-gradient(to bottom, #ff6697 0%, #ff3939 100%);
			}
		}

		.list_ {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			top: 4upx;
			right: 0;
			width: 250upx;
			height: 330upx;
			box-shadow: 10px -200px 50px #ccc;
			border-radius: 15upx;
			background-color: #FFFFFF;

			text {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 33.33%;
				font-size: 34upx;
			}
		}
	}
</style>
