<template>
	<view class="page">
		<view class="form">
			<view class="input">
				<text class="important">姓名</text>
				<input type="text" v-model="form.name" placeholder="请输入姓名" />
			</view>
			<view class="input">
				<text class="important">手机</text>
				<input type="text" v-model="form.phone" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="input">
				<text class="important">来源</text>
				<view class="select" @click="selectClick('channel')">
					{{form.source.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">门店</text>
				<view class="select" @click="selectClick('shop')">
					{{form.store.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>性别</text>
				<view class="select sex">
					<radio-group @change="sexRadioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in form.sex.items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === form.sex.current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.remark" placeholder="请输入备注" />
			</view>
		</view>
		<view class="more">
			<text v-show="!status" @click="statusClick()">完善更多</text>
			<text v-show="status" @click="statusClick()">收起</text>
		</view>
		<view v-show="status" class="form">
			<view class="input">
				<text>生日</text>
				<view class="select" @click="selectClick('birthday')">
					{{form.birthday}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>类型</text>
				<view class="select" @click="selectClick('type')">
					{{form.type.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>会员等级</text>
				<view class="select">
					{{form.grade.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>微信号</text>
				<input type="text" v-model="form.weChat" placeholder="请输入微信号" />
			</view>
			<view class="input">
				<text>QQ</text>
				<input type="text" v-model="form.QQ" placeholder="请输入QQ号" />
			</view>
			<view class="input">
				<text>邮箱</text>
				<input type="text" v-model="form.mailbox" placeholder="请输入邮箱号" />
			</view>
			<view class="input">
				<text>详细地址</text>
				<input type="text" v-model="form.address" placeholder="请输入详细地址" />
			</view>
			<view class="input" @click="selectClick('next')">
				<text>下次跟进</text>
				<view class="select">
					{{form.next.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="input">
				<text>同步预约</text>
				<async-switch color="#4dd865" :checked="form.synchronous.checked" @change="synchronousChange"></async-switch>
			</view>
		</view>
		<view class="form" v-show="form.synchronous.checked">
			<view class="input">
				<text class="important">日期</text>
				<view class="select" @click="selectClick('date')">
					{{form.synchronous.date}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">时间</text>
				<view class="select" @click="selectClick('time')">
					{{form.synchronous.time}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>房间</text>
				<view class="select" @click="selectClick('room')">
					{{form.synchronous.room.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.synchronous.remark" placeholder="请输入备注" />
			</view>
			<view class="input" @click="selectClick('newYuyue')" :class="{on:form.project.length != 0}">
				<text class="important">项目</text>
				<view class="select">
					<image src="../../static/style/style-jia-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="project-list" v-if="!(form.project.length == 0)">
				<view class="_li" v-for="(item, index) in form.project" :key="index">
					<text v-text="item.prod_name"></text>
					<image src="../../static/style/popup-del-icon.png" mode="widthFix" @click="delClick(index)"></image>
				</view>
			</view>
			<view class="input">
				<text>技师</text>
				<view class="select" @click="selectClick('technician')">
					{{form.synchronous.technician.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<w-picker mode="date" startYear="1880" endYear="2030" :defaultVal="[0,0,0]" :current="true" @confirm="birthdayConfirm"
		 ref="range" themeColor="#f00"></w-picker>
		<w-picker mode="dateTime" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirmTime" ref="rangeTime" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm" ref="channelSelect" :selectList="form.source.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm1" ref="room" :selectList="form.synchronous.room.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm2" ref="shop" :selectList="form.store.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm3" ref="type" :selectList="form.type.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm4" ref="technician" :selectList="form.synchronous.technician.list"
		 themeColor="#f00">
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
			"async-switch": asyncSwitch,
			popup
		},
		data() {
			return {
				status: false,
				picker: '',
				channel_id: '',
				room_id: '',
				sex: 0,
				cus_grade: '',
				cus_level: '',
				add_dept_id: '',
				teacher_id:'',
				popupList: {},
				form: {
					name: '',
					phone: '',
					remark: '',
					project: [],
					source: {
						value: '请选择',
						id: '',
						list: []
					},
					type: {
						value: '请选择',
						list: []
					},
					grade: {
						value: '请选择',
						list: []
					},
					next: {
						value: '请选择',
						list: []
					},
					store: {
						value: '请选择',
						list: []
					},
					birthday: '请选择',
					sex: {
						items: [{
								value: '1',
								name: '男'
							},
							{
								value: '2',
								name: '女',
								checked: 'true'
							},
							{
								value: '0',
								name: '未知'
							}
						],
						current: 2
					},
					item:[],
					weChat: '',
					QQ: '',
					mailbox: '',
					address: '',
					synchronous: {
						checked: false,
						date: '请选择',
						time: '请选择',
						room: {
							value: '请选择',
							list: []
						},
						project: {
							value: '请添加',
							list: []
						},
						technician: {
							value: '请选择',
							list: []
						},
						remark: ''
					}
				}
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {
			this.customerConfigChannellist()
			this.form.synchronous.room.list = uni.getStorageSync('room')
			this.form.store.list = uni.getStorageSync('store1')
			this.form.type.list = uni.getStorageSync('gradelist')
			this.form.synchronous.technician.list = uni.getStorageSync('technician')
			this.popupList = uni.getStorageSync('popupList')
		},
		methods: {isEmpty(obj) {
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
			sexRadioChange: function(evt) {
				this.sex = evt.detail.value
				console.log(this.sex)
				for (let i = 0; i < this.form.sex.items.length; i++) {
					if (this.form.sex.items[i].value === evt.target.value) {
						this.form.sex.current = i;
						break;
					}
				}
			},
			synchronousChange() {
				this.form.synchronous.checked = !this.form.synchronous.checked
			},
			selectClick(e) {
				this.picker = e
				if (e === 'birthday') {
					this.$refs.range.show()
				} else if (e === 'date') {
					this.$refs.range.show()
				} else if (e === 'time') {
					this.$refs.rangeTime.show()
				} else if (e === 'channel') {
					this.$refs.channelSelect.show()
				} else if (e === 'next') {
					this.$refs.range.show()
				} else if (e === 'room') {
					this.$refs.room.show()
				} else if (e === 'shop') {
					this.$refs.shop.show()
				} else if (e === 'type') {
					this.$refs.type.show()
				} else if (e === 'technician') {
					this.$refs.technician.show()
				} else if (e === 'newYuyue') {
					this.$refs.popup.itemClick('true')
				}
			},
			birthdayConfirm(e) {
				if (this.picker === 'birthday') {
					this.form.birthday = e.result
				} else if (this.picker === 'date') {
					this.form.synchronous.date = e.result
				} else if (this.picker === 'next') {
					this.form.next.value = e.result
				}
			},
			channelConfirm(e) {
				this.channel_id = e.checkArr.value
				this.form.source.value = e.result
			},
			channelConfirm1(e) {

				this.form.synchronous.room.value = e.result
				this.room_id = e.checkArr.value
			},
			channelConfirm2(e) {
				this.form.store.value = e.result
				this.add_dept_id = e.checkArr.value
			},
			channelConfirm3(e) {
				this.form.type.value = e.result
				this.cus_level = e.checkArr.value
			},
			channelConfirm4(e) {
				this.form.synchronous.technician.value = e.result
				this.teacher_id=e.checkArr.value
			},
			onConfirmTime(e) {
				this.form.synchronous.time = e.checkArr[3] + ':' + e.checkArr[4]
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
			statusClick() {
				this.status = !this.status
			},
			onNavigationBarButtonTap: function(e) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/add',
					method: 'POST',
					data: {
						cus_name: this.form.name,
						cus_mobile: this.form.phone,
						channel_id: this.channel_id,
						add_dept_id: this.add_dept_id,
						dept_id:this.add_dept_id,
						cus_sex: this.sex,
						add_remarks: this.form.remark,
						cus_addr: this.form.mailbox,
						cus_birthday: this.form.birthday,
						cus_level: this.cus_level,
						cus_wx: this.form.weChat,
						cus_qq: this.form.QQ,
						cus_email: this.form.mailbox,
						cus_addr: this.form.address,
						next_follw: this.form.next.value,
						appoint_date: this.form.synchronous.date,
						appoint_btime: this.form.synchronous.time,
						room_id: this.room_id,
						remarks: this.form.synchronous.remark,
						items: JSON.stringify(this.form.project),
						teacher_id:this.teacher_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						uni.showToast({
							icon: 'none',
						    title: res.data.msg
						});
					},
					fail:error=>{
						uni.showToast({
							icon: 'none',
						    title: res.data.msg
						});
					}
				});
			},
			customerConfigChannellist() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/config/channellist',
					method: 'GET',
					data: {},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res)
						var label = new Array()
						res.data.data.forEach((item, index) => {
							// console.log(item.id)
							label[index] = {
								label: item.channel_name,
								value: item.channel_id
							}
						})
						this.form.source.list = label
					}
				});
			},
		},

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
			
			&.on {
				border: none;
			}

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
