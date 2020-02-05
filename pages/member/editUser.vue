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
			<view class="input" @click="selectClick('channel')">
				<text class="important">来源</text>
				<view class="select">
					{{form.source.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('store')">
				<text class="important">门店</text>
				<view class="select">
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
								<radio :value="item.value" :checked="item.value === form.sex.current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.remark" placeholder="客户备注信息" />
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
				<view class="select">
					{{form.cus_level.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input" @click="selectClick('grade')">
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
				<text>详情地址</text>
				<input type="text" v-model="form.mailbox" placeholder="请输入详情地址" />
			</view>
		</view>
		<w-picker mode="date" startYear="1880" endYear="2030" :defaultVal="[0,0,0]" :current="true" @confirm="birthdayConfirm"
		 ref="range" themeColor="#f00"></w-picker>
		<w-picker mode="dateTime" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirmTime" ref="rangeTime" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="channelConfirm" ref="channelSelect" :selectList="pickerList"
		 themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				pickerList: [],
				status: false,
				picker: '',
				form: {
					name: '',
					phone: '',
					remark: '',
					source: {
						value: '请选择',
						id: '',
						list: []
					},
					grade: {
						value: '请选择',
						id: '',
						list: []
					},
					next: {
						value: '请选择',
						list: []
					},
					store: {
						value: '请选择',
						list: [],
						id: ''
					},
					birthday: '请选择',
					sex: {
						items: [{
								value: 1,
								name: '男'
							},
							{
								value: 2,
								name: '女',
								checked: 'true'
							},
							{
								value: 3,
								name: '未知'
							}
						],
						current: 3
					},
					weChat: '',
					QQ: '',
					mailbox: '',
					address: '',
					cus_level: {
						id: '',
						value: ''
					},
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
			this.cus_id = e.cus_id
			this.customerConfigChannellist()
			this.customerGetcusinfo(e.cus_id)
			var label = new Array()
			uni.getStorageSync('store').forEach((item, index) => {
				// console.log(item.id)
				label[index] = {
					label: item.dept_name,
					value: item.dept_id
				}
			})
			this.form.store.list = label
			this.form.grade.list = uni.getStorageSync('gradelist')
		},
		methods: {
			customerGetcusinfo(cus_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/getcusinfo',
					method: 'GET',
					data: {
						cus_id: cus_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						let _data = res.data.data.info
						this.form.name = _data.cus_name
						this.form.phone = _data.cus_mobile
						this.form.source.value = _data.channel_name
						this.form.source.id = _data.channel_id
						this.form.store.value = _data.dept_name
						this.form.store.id = _data.dept_id
						this.form.sex.current = _data.cus_sex
						this.form.remarks = _data.remarks
						this.form.grade.value = _data.cus_grade_name
						this.form.grade.id = _data.cus_grade
						this.form.weChat = _data.cus_wx
						this.form.QQ = _data.cus_qq
						this.form.mailbox = _data.cus_email
						this.form.address = _data.cus_addr
						this.form.cus_level.id = _data.cus_level
					}
				});
			},
			customerEdit() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/edit',
					method: 'POST',
					data: {
						cus_id: this.cus_id,
						add_remarks: this.form.remarks,
						cus_addr: this.form.address,
						cus_birthday: this.form.birthday,
						cus_email: this.form.mailbox,
						cus_mobile: this.form.phone,
						cus_name: this.form.name,
						cus_qq: this.form.QQ,
						cus_sex: this.form.sex.current,
						cus_wx: this.form.weChat,
						cus_level: this.form.cus_level.id,
						cus_grade: this.form.grade.id,
						dept_id: this.form.store.id,
						channel_id: this.form.source.label
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res);
					}
				});
			},
			sexRadioChange: function(evt) {
				for (let i = 0; i < this.form.sex.items.length; i++) {
					if (this.form.sex.items[i].value === evt.target.value) {
						this.form.sex.current = i;
						break;
					}
				}
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
					this.pickerList = this.form.source.list
					this.$refs.channelSelect.show()
				} else if (e === 'next') {
					this.$refs.range.show()
				} else if (e === 'store') {
					this.pickerList = this.form.store.list
					this.$refs.channelSelect.show()
				} else if (e === 'grade') {
					this.pickerList = this.form.grade.list
					this.$refs.channelSelect.show()
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
				if (this.picker === 'channel') {
					this.form.source.value = e.result
					this.form.source.id = e.checkArr.value
				} else if (this.picker === 'store') {
					this.form.store.value = e.result
					this.form.store.id = e.checkArr.value
				} else if (this.picker === 'grade') {
					this.form.grade.value = e.result
					this.form.grade.id = e.checkArr.value
				}
			},
			onConfirmTime(e) {
				this.form.synchronous.time = e.checkArr[3] + ':' + e.checkArr[4]
			},
			statusClick() {
				this.status = !this.status
			},
		    onNavigationBarButtonTap: function (e) {
                this.customerEdit()
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
						var label = new Array()
						res.data.data.forEach((item, index) => {
							// console.log(item.id)
							label[index] = {label:item.channel_name,value: item.channel_id}
						})
						this.form.source.list = label
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
