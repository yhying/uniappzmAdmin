<template>
	<view class="page">
		<view class="form">
			<view class="input" @click="selectClick('date')">
				<text class="important">日期</text>
				<view class="select">
					{{form.date}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('timeStart')">
				<text class="important">开始时间</text>
				<view class="select">
					{{form.timeStart}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('timeEnd')">
				<text class="important">结束时间</text>
				<view class="select">
					{{form.timeEnd}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('room')">
				<text>房间</text>
				<view class="select">
					{{form.room.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.remark" placeholder="请输入备注" />
			</view>
			<view class="input" @click="selectClick('newYuyue')">
				<text class="important">项目</text>
				<view class="select" v-show="addshow">
					请添加
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="project-list" v-if="!(form.project.length == 0)">
				<view class="_li" v-for="(item, index) in form.project" :key="index">
					<text v-text="item.prod_name"></text>
					<image src="../../static/style/popup-del-icon.png" mode="widthFix" @click="delClick(index)"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('technician')">
				<text>技师</text>
				<view class="select">
					{{form.technician.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<w-picker mode="date" startYear="1880" endYear="2030" :defaultVal="[0,0,0]" :current="true" @confirm="birthdayConfirm"
		 ref="range" themeColor="#f00"></w-picker>
		<w-picker mode="dateTime" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirmTime" ref="rangeTime" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm" ref="channelSelect" :selectList="picker" themeColor="#f00">
		</w-picker>
		<popup popup="newYuyue" :popupList="popupList" ref="popup" @func="getMsgFormSon"></popup>
	</view>
</template>

<script>
	import asyncSwitch from "@/components/helang-asyncSwitch/helang-asyncSwitch.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import popup from '@/components/member/popup'
	export default {
		components: {
			wPicker,
			popup
		},
		data() {
			return {
				addshow:true,
				popupList: {},
				dataJson: '',
				picker: [],
				form: {
					cus_id: '',
					dept_id: '',
					project: [],
					date: '',
					timeStart: '',
					timeEnd: '',
					room: {
						list: [],
						value: '',
						label: ''
					},
					remark: '',
					item: [],
					technician: {
						value: '',
						label: '',
						list: []
					}
				}
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {
			this.form.dept_id = e.dept_id
			this.form.cus_id = e.cus_id
			this.form.room.list = uni.getStorageSync('room')
			this.form.technician.list = uni.getStorageSync('technician')
			this.popupList = uni.getStorageSync('popupList')
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
			selectClick(e) {
				this.dataJson = e
				if (e === 'date') {
					this.$refs.range.show()
				} else if (e === 'timeStart') {
					this.$refs.rangeTime.show()
				} else if (e === 'timeEnd') {
					this.$refs.rangeTime.show()
				} else if (e === 'room') {
					this.picker = this.form.room.list
					this.$refs.channelSelect.show()
				} else if (e === 'technician') {
					this.picker = this.form.technician.list
					this.$refs.channelSelect.show()
				} else if (e === 'newYuyue') {
					this.$refs.popup.itemClick('true')
				}
			},
			birthdayConfirm(e) {
				if (this.dataJson === 'date') {
					this.form.date = e.result
				}
			},
			channelConfirm(e) {
				if (this.dataJson === 'room') {
					this.form.room.label = e.checkArr.value
					this.form.room.value = e.checkArr.label
				} else if (this.dataJson === 'technician') {
					this.form.technician.label = e.checkArr.value
					this.form.technician.value = e.checkArr.label
				}
			},
			onConfirmTime(e) {
				if (this.dataJson === 'timeStart') {
					this.form.timeStart = e.checkArr[3] + ':' + e.checkArr[4]
				} else if (this.dataJson === 'timeEnd') {
					this.form.timeEnd = e.checkArr[3] + ':' + e.checkArr[4]
				}
			},
			onNavigationBarButtonTap: function(e) {
				this.cartAdd()
			},
			getMsgFormSon(e) {
				let new_arr =[];
				e.forEach((item, index) => {
					// this.isTrue(item)?:'';
					if (this.isTrue(item)) {
						new_arr.push(item)
					}
					// new_arr.push(this.isTrue(item)?item:)
				})
				this.form.project = new_arr
			},
			delClick(index) {
				this.form.project.splice(index, 1)
			},
			cartAdd() {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/add',
					method: 'POST',
					data: {
						appoint_date: this.form.date,
						appoint_btime: this.form.timeStart,
						appoint_etime: this.form.timeEnd,
						cross_dept: 0,
						cus_id: this.form.cus_id,
						dept_id: this.form.dept_id,
						remarks: this.form.remarks,
						room_id: this.form.room.label,
						items: JSON.stringify(this.form.project)
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						uni.showToast({
							icon: 'none',
						    title: res.data.msg
						});
						uni.navigateTo({
							url: '/pages/tabBar/yuyue/yuyue'
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f6f7f9;
	}

	.page {
		margin-top: 20upx;
	}

	.form {
		background: #FFFFFF;
		
		.project-list {
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			padding-bottom: 30upx;
			border-bottom: solid 1upx #e4e4e4;
			._li {
				position: relative;
				font-size: 24upx;
				color: #fff;
				background: #FF0066;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-left: 20upx;
				padding-right: 20upx;
				border-radius: 100upx;
				margin-left: 30upx;
				margin-top: 30upx;
				image {
					width: 30upx;
					position: absolute;
					right: -15upx;
					top: -15upx;
				}
			}
		}

		.input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 40upx;
			margin-right: 40upx;
			height: 120upx;
			border-bottom: solid 1upx #e4e4e4;

			&:last-child {
				border-bottom: none;
			}

			text {
				font-size: 30upx;
				color: #333333;

				&.important {
					&:after {
						content: '*';
						color: #ff0066;
					}
				}
			}

			input {
				text-align: right;
				font-size: 26upx;
			}

			.select {
				font-size: 26upx;
				color: #949494;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				image {
					width: 30upx;
					height: 100%;
				}

				&.sex {
					uni-radio-group {
						display: flex;

						.uni-list-cell {
							display: flex;
							align-items: center;
							font-size: 26upx;
							color: #333333;
							margin-left: 30upx;

							&:first-child {
								margin-left: 0;
							}
						}
					}
				}
			}
		}
	}

	.more {
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 24upx;
			color: #ff6699;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				width: 200upx;
				height: 2upx;
				background: #c9c9c9;
				top: 50%;
				margin-top: -1upx;
				left: -212upx;
			}

			&:before {
				content: '';
				position: absolute;
				width: 200upx;
				height: 2upx;
				background: #c9c9c9;
				top: 50%;
				margin-top: -1upx;
				right: -212upx;
			}
		}
	}
</style>
