<template>
	<view class="popup-bg" v-show="show" @click.self="clear()">
		<view class="popup">
			<view class="title">
				<span>预约筛选</span>
			</view>
			<view class="main">
				<view class="main-item">
					<view class="main_time">
						预约类型
						<view class="_ul">
							<view class="_li" v-for="(item,index) in type.list" :key="index" :class="type.index===index?'on':''" @click="tabClick('type',index)">{{item}}</view>
						</view>
					</view>
					<view class="main_time">
						预约状态
						<view class="_ul">
							<view class="_li" v-for="(item,index) in status.list" :key="index" :class="status.index===index?'on':''" @click="tabClick('status',index)">{{item}}</view>
						</view>
					</view>
					<view class="main_time">
						预约时间
						<view class="_ul">
							<view class="_li" v-for="(item,index) in time.list" :key="index" :class="time.index===index?'on':''" @click="tabClick('time',index)">{{item}}</view>
						</view>
						<view class="ul_time">
							<view class="time" @click="timeClick('start')">{{time.start}}</view>
							<text>至</text>
							<view class="time2" @click="timeClick('end')">{{time.end}}</view>
						</view>
					</view>
					<view class="main_time">
						预约门店
						<view class="_ul">
							<view class="_li" v-for="(item,index) in store.list" :key="index" :class="store.index===index?'on':''" @click="tabClick('store',index)">{{item}}</view>
							<view class="showShop">
								<view class="time3" @click="timeClick('store')" v-text="store.select.label"></view>
							</view>
						</view>
					</view>
				</view>
				<w-picker mode="date" startYear="2019" endYear="2022" :defaultVal="[0,9,0]" :current="false" @confirm="onConfirm"
				 ref="yearMonth" themeColor="#f00">
				</w-picker>
				<w-picker mode="selector" @confirm="onConfirm2" ref="selector" themeColor="#f00" :selectList="store.select.list">
				</w-picker>
			</view>
			<view class="main_button">
				<view class="clear" @tap="clear()">取消</view>
				<view class="confirm" @click="cartLists()">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker,
		},
		data() {
			return {
				statusTime: '',
				show: false,
				type: {
					index: 0,
					list: ['全部','新客','老客','老转新']
				},
				status: {
					index: 0,
					list: ['全部','生效中','已开单','已取消']
				},
				time: {
					index: 0,
					list: ['全部','今天','昨天','本周','上周','本月','上月'],
					start: '选择日期',
					end: '选择日期'
				},
				store: {
					index: 0,
					list: ['全部'],
					select: {
						value: '',
						label: '选择门店',
						list: []
					}
				},
				page: {
					page: '1',
					pagesize: '200'
				}
			}
		},
		onReady() {
		},
		methods: {
			tabClick(e,index) {
				if (e === 'type') {
					this.type.index = index
				} else if (e === 'status') {
					this.status.index = index
				} else if (e === 'time') {
					this.time.index = index
					this.time.start = '选择日期'
					this.time.end = '选择日期'
				} else if (e === 'store') {
					this.store.index = index
					this.store.select.label = '选择门店'
					this.store.select.value = ''
				}
			},
			timeClick(e) {
				this.statusTime = e
				if (e === 'store') {
					this.$refs.selector.show()
					return
				}
				this.$refs.yearMonth.show()
			},
			onConfirm(e) {
				this.time.index = 99
				if (this.statusTime === 'start') {
					this.time.start = e.result
				} else if (this.statusTime === 'end') {
					this.time.end = e.result
				}
			},
			onConfirm2(e) {
				this.store.index = -1
				this.store.select.label = e.result
				this.store.select.value = e.checkArr.value
			},
			itemClick(e) {
				this.show = e
				var label = new Array()
				uni.getStorageSync('store').forEach((item, index) => {
					label[index] = {label:item.dept_alias,value: item.dept_id}
				})
				this.store.select.list = label
			},
			clear() {
				this.show = false
			},
			cartLists() {
				var start = '',
					end = '';
				if (this.time.start === '选择日期') {
					start = ''
				} else {
					start = this.time.start
				}
				if (this.time.end === '选择日期') {
					end = ''
				} else {
					end = this.time.end
				}
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/lists', //
					method: 'GET',
					data: {
						page: this.page.page,
						pagesize: this.page.pagesize,
						cus_type: this.type.index,
						status: this.status.index,
						time_type: this.time.index,
						btime: start,
						etime: end,
						dept_id: this.store.select.value,
						search_type: 1
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
						this.$emit('childByValue', res.data.data.data)
						this.show = false
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.popup-bg {
		width: 120upx;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6) none repeat scroll 0 0;
	}

	.popup {
		position: absolute;
		top: 0;
		left: 120upx;
		width: 630upx;
		background-color: #FFFFFF;
				// z-index: 9999;
        .title {
        	position: absolute;
        	top: 20upx;
        	left: 50%;
        	transform: translateX(-50%);
        	font-size: 34upx;
        	font-weight: 900;
        }
		.main {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 150upx;
			display: flex;
						// z-index: 999;
			align-items: center;
			justify-content: center;
			.main-item {
				width: 525upx;
				color: #444445;
			}

			.main_time:first-child {
				margin-top: 0upx;
			}

			.main_time {
				font-size: 28upx;
				margin-top: 60upx;
				position: relative;

				.ul_time {
					position: absolute;
					bottom: 0;
					left: 180upx;
					display: flex;
					align-items: center;
					margin-top: 20upx;

					view {
						width: 140upx;
					}

					text {
						margin: 0 15upx;
					}
				}

				._ul {
					display: flex;
					// justify-content: space-between;
					flex-wrap: wrap;
					margin-top: 20upx;

					._li {
						width: 157upx;
						height: 60upx;
						background-color: #f6f7f9;
						margin-top: 20upx;
						margin-right: 25upx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 4upx;
						box-sizing: border-box;

						&.on {
							border: 1upx solid #ff0066;
							color: #ff0066;
							font-size: 28upx;
						}
					}

					._li:nth-child(-n+3) {
						margin-top: 5upx;
					}

					._li:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.ul_time {
				display: flex;
				align-items: center;
				margin-top: 20upx;

				view {
					width: 157upx;
					height: 60upx;
					background-color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #ccc;
					font-size: 24upx;
					color: #c2c2c2;
					box-sizing: border-box;
				}

				text {
					margin: 0 17upx;
					font-size: 28upx;
				}
			}
		}

		.main_button {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 150upx;
			background-color: #FFFFFF;

			view {
				width: 240upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 10upx;
				font-size: 28upx;
			}

			.clear {
				margin-right: 35upx;
				background-color: #f9fafc;
			}

			.confirm {
				background-color: #ff6699;
				color: #FFFFFF;
			}
		}
	}

	.showShop {
		position: relative;

		.time3 {
			position: relative;
			width: 333upx;
			height: 60upx;
			margin-top: 5upx;
			background-color: #007AFF;
			border-radius: 4upx;
			background-color: #ffffff;
			border: 1px solid #ccc;
			text-align: center;
			line-height: 60upx;
			font-size: 28upx;
			box-sizing: border-box;
			color: #ccc;

			&:after {
				content: '';
				position: absolute;
				border-left: 10upx solid transparent;
				border-right: 10upx solid transparent;
				border-top: 10upx solid #ccc;
				border-bottom: 0;
				left: 69%;
				transform: translateX(-50%);
				top: 28upx;
			}
		}
	}
</style>
