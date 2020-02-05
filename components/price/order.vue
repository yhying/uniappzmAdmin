<template>
	<view class="page" v-show="show">
		<view class="list">
			<view class="_li" v-for="(item, index) in order.entire" :key="index">
				<image src="../../static/style/popup-del-icon.png" class="del" mode="widthFix" @click="delClick(item,index)"></image>
				<view class="user-item">
					<view class="_h6" v-text="item.name"></view>
					<view class="compute">
						<view class="jian item" @click="computeClick('jian',index,item)">
							<image src="../../static/home/increa.png"></image>
						</view>
						<text v-text="item.buy_num"></text>
						<view class="jia item" @click="computeClick('jia',index,item)">
							<image src="../../static/home/add.png"></image>
						</view>
					</view>
					<view class="money">
						￥
						<text v-text="item.money"></text>
					</view>
				</view>
				<view class="user-info">
					<view class="money">
						￥<input type="text" v-model="item.money" />
						<image src="../../static/style/money-edit-icon.png" mode="widthFix"></image>
					</view>
					<view class="select" @click="selectCard()">选择卡</view>
				</view>
			</view>
		</view>
		<view class="user-order">
			<view class="_li" @click="userClick('technician')">
				<view class="_h7">技师：</view>
				<text v-text="form.technician.label"></text>
			</view>
			<view class="_li" @click="userClick('date')">
				<view class="_h7">时间：</view>
				<text>{{form.time.label}}</text>
			</view>
			<view class="_li">
				<view class="_h7">备注：</view>
				<input type="text" v-model="form.remark" placeholder="请输入备注信息" />
			</view>
			<view class="tig">请注意！确认收款后，订单将不能修改</view>
		</view>
		<view class="btn-item">
			<view class="info">
				<view class="nums-item">
					项目: <text v-text="order.entire.length"></text>
					数量: <text v-text="form.nums"></text>
				</view>
				<view class="money">
					￥
					<text v-text="form.money"></text>
				</view>
			</view>
			<button @click="btnClick">确认收款</button>
		</view>
		<w-picker mode="selector" @confirm="technicianConfirm" ref="technicianSelect" :selectList="form.technician.list"
		 themeColor="#f00"></w-picker>
		<w-picker mode="limit" :defaultVal="[0,0,0]" dayStep="60" afterStep="0" minuteStep="1" @confirm="dateTimeConfirm" ref="dateTimeSelect"
		 themeColor="#f00"></w-picker>
		<popup :popup="popup" ref="popup" :popupPay="payget"></popup>
	</view>
</template>

<script>
	import popup from '@/components/member/popup'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			popup,
			wPicker
		},
		props: [],
		data() {
			return {
				popup: '',
				show: false,
				order: {
					entire: []
				},
				payget: {
					list: [],
					data: {}
				},
				form: {
					nums: 0,
					money: 0,
					technician: {
						list: [],
						value: '',
						label: '请选择技师'
					},
					time: {
						list: [],
						value: '',
						label: ''
					},
					remark: ''
				}
			}
		},
		onLoad(e) {
			
		},
		methods: {
			isEmpty(obj) {
			  let key
			  let empty = true
			  if (obj instanceof Object) {
			    for (key in obj) {
			      if (empty && obj.hasOwnProperty(key)) {
			        empty = false
			      }
			    }
			  }
			  return empty
			},
			isTrue(data) {
			  switch (typeof data) {
			    //对象，数组，null
			    case 'object':
			      return !this.isEmpty(data)
			      break
			    case 'number':
			      return data == 0 ? false : true //不等于0 都为真
			      break
			    case 'string':
			      return data.trim().length > 0 ? true : false
			      break
			    case 'boolean':
			      return data
			      break
			    case 'undefined':
			      return false
			    default:
			      return false
			  }
			},
			selectCard() {
				this.popup = 13
				this.$refs.popup.itemClick('true')
			},
			delClick(item, index) {
				if (this.order.entire.length < 2) {
					uni.showToast({
						icon: 'none',
						title: '至少保留一个！'
					});
					return
				}
				this.order.entire.splice(index, 1)
				this.calculate()
			},
			itemClick(e) {
				this.show = e
				this.order.entire = uni.getStorageSync('orderListCentent')
				let new_arr =[];
				this.order.entire.forEach((item, index) => {
					// this.isTrue(item)?:'';
					if (this.isTrue(item)) {
						new_arr.push(item)
						item.money = item.unit_price
					}
					// new_arr.push(this.isTrue(item)?item:)
				})
				this.order.entire = new_arr
				this.calculate()
				this.form.technician.list = uni.getStorageSync('technician')
				this.timer = setInterval(() => {
					this.formatDateTime(new Date())
				}, 1000);
			},
			computeClick(type, index, item) {
				if (type === 'jia') {
					this.order.entire[index].buy_num = item.buy_num + 1
					this.order.entire[index].money = parseInt(item.unit_price) * item.buy_num
				} else if (type === 'jian') {
					if (item.buy_num === 1) {
						return
					}
					this.order.entire[index].buy_num = item.buy_num - 1
					this.order.entire[index].money = parseInt(item.unit_price) * item.buy_num
				}
				this.calculate()
			},
			// 计算金额以及项目
			calculate() {
				var nums = 0,
					money = 0;
				this.order.entire.forEach((item, index) => {
					console.log(item);
					nums += item.buy_num
					money += parseInt(item.unit_price * item.buy_num)
				})
				this.form.nums = nums //数量
				this.form.money = money //金额
			},
			userClick(e) {
				if (e === 'technician') {
					this.$refs.technicianSelect.show();
				} else if (e === 'date') {
					clearInterval(this.timer)
					this.$refs.dateTimeSelect.show();
				}
			},
			technicianConfirm(e) {
				console.log(e)
				this.form.technician.label = e.checkArr.label
				this.form.technician.value = e.checkArr.value
				this.order.entire.forEach((item, index) => {
					this.$set(item, 'teacher_id', e.checkArr.value)
				})
			},
			btnClick() {
				if (this.form.technician.value === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择技师！'
					});
					return
				}
				uni.request({
					url: uni.getStorageSync('interface') + 'order/add',
					method: 'POST',
					data: {
						appoint_time: this.form.time.label,
						dept_id: this.form.technician.value,
						remarks: this.form.remarks,
						items: JSON.stringify(this.order.entire)
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.payget.data = res.data.data
						this.payget.list = uni.getStorageSync('setPayment')
						this.popup = 11
						this.$refs.popup.itemClick('true')
					}
				});
			},
			dateTimeConfirm(e) {
				this.form.time.label = e.result
			},
			formatDateTime(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? "0" + MM : MM;
				let d = date.getDate();
				d = d < 10 ? "0" + d : d;
				let h = date.getHours();
				h = h < 10 ? "0" + h : h;
				let m = date.getMinutes();
				m = m < 10 ? "0" + m : m;
				let s = date.getSeconds();
				s = s < 10 ? "0" + s : s;
				this.form.time.label = y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s; //修改数据date
			}
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
			}
		}
	}
</script>

<style lang="less">
	.list {
		position: absolute;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 380upx;
		overflow-x: hidden;
		overflow-y: auto;

		._li {
			height: 170upx;
			width: 690upx;
			margin-left: auto;
			margin-right: auto;
			background: #FFFFFF;
			margin-top: 38upx;
			border-radius: 20upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			position: relative;

			.del {
				width: 30upx;
				position: absolute !important;
				right: -10upx;
				top: -10upx;
			}

			.user-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 20upx;
				margin-right: 20upx;

				._h6 {
					color: #333333;
					font-size: 28upx;
				}

				.compute {
					height: 50upx;
					display: flex;
					align-items: center;

					text {
						height: 50upx;
						width: 86upx;
						// border-top: solid 1upx #d7d7d7;
						// border-bottom: solid 1upx #d7d7d7;
						box-sizing: border-box;
						font-size: 30upx;
						color: #333333;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.item {
						width: 50upx;
						height: 100%;
						background: #f9fafc;
						position: relative;
						// border: solid 1upx #d7d7d7;
						box-sizing: border-box;
                        image {
							width: 100%;
							height: 100%;
						}
						&:after {
							content: '';
							position: absolute;
							width: 33upx;
							height: 3upx;
							background: #c9c9c9;
							left: 50%;
							top: 50%;
							margin-left: -16.5upx;
							margin-top: -1.5upx;
						}

						&.jia {
							&:before {
								content: '';
								position: absolute;
								width: 3upx;
								height: 33upx;
								background: #c9c9c9;
								left: 50%;
								top: 50%;
								margin-top: -16.5upx;
								margin-left: -1.5upx;
							}
						}
					}
				}

				.money {
					font-size: 20upx;
					color: #333333;
					display: flex;
					align-items: center;

					text {
						font-size: 36upx;
						// width: 130upx;
					}
				}
			}

			.user-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 20upx;
				margin-right: 20upx;
				margin-top: 20upx;

				.money {
					font-size: 20upx;
					color: #ff0066;
					display: flex;
					align-items: center;

					input {
						font-size: 36upx;
						width: 130upx;
					}

					image {
						width: 40upx;
					}
				}

				.select {
					width: 128upx;
					height: 48upx;
					border-radius: 100upx;
					background: #ff0066;
					font-size: 24upx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.user-order {
		position: absolute;
		left: 0;
		right: 0;
		height: 274upx;
		bottom: 87upx;

		._li {
			background: #FFFFFF;
			padding-left: 15upx;
			padding-right: 15upx;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			._h7 {
				font-size: 26upx;
				color:#808080;
			}

			text {
				font-size: 26upx;
				color: #cccccc;
			}

			input {
				font-size: 26upx;
				text-align: right;
				width: 445upx;
			}
			.uni-input-placeholder {
				color: #cccccc;
			}
		}

		.tig {
			font-size: 26upx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 34upx;
			background: #ff9933;
			color: #333333;
		}
	}

	.btn-item {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 87upx;
		background: #FFFFFF;

		button {
			width: 240upx;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			font-size: 28upx;
			color: #FFFFFF;
			background: #ff0066;
			border-radius: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.info {
			position: absolute;
			left: 0;
			right: 240upx;
			top: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 20upx;
			padding-right: 20upx;

			.nums-item {
				font-size: 27upx;
				color: #949494;
				display: flex;
				align-items: center;

				text {
					font-size: 27upx;
					color: #333333;
					margin-right: 25upx;
					margin-left: 5upx;
				}
			}

			.money {
				font-size: 27upx;
				color: #ff0066;
				display: flex;
				align-items: center;

				text {
					font-size: 36upx;
				}
			}
		}
	}
</style>
