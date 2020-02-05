<template>
	<view class="popup-bg" v-if="show" :class="bgc==true?'show':''" @click.self="clear()">
		<view class="popup_" v-if="popup == 1">
			<view class="title">
				会员筛选
			</view>
			<view class="main">
				<view class="main_time">
					渠道
					<view class="_ul">
						<view class="_li" v-for="(item,index) in qudao.list" :key="index" :class="qudao.index===index?'on':''" @tap="selectClick('qudao',index)">{{item}}</view>
					</view>

				</view>
				<view class="main_time">
					类型
					<view class="_ul">
						<view class="_li" v-for="(item,index) in type.list" :key="index" :class="type.index===index?'on':''" @tap="selectClick('type',index)">{{item}}</view>
					</view>
				</view>
				<view class="main_time">
					会员等级
					<view class="_ul">
						<view class="_li" v-for="(item,index) in vip.list" :key="index" :class="vip.index===index?'on':''" @tap="selectClick('vip',index)">{{item}}</view>
					</view>
				</view>
				<view class="main_time">
					状态
					<view class="_ul">
						<view class="_li" v-for="(item,index) in zhuangtai.list" :key="index" :class="zhuangtai.index===index?'on':''"
						 @tap="selectClick('zhuangtai',index)">{{item}}</view>
					</view>
				</view>
				<view class="main_time">
					地区
					<view class="_ul">
						<view class="_li" v-for="(item,index) in area.list" :key="index" :class="area.index===index?'on':''" @click="selectClick('area',index)">{{item}}</view>
						<view class="showShop">
							<view class="time3" @click="timeClick1()" v-text="area.select.label"></view>
						</view>
					</view>
				</view>
				<view class="main_time">
					门店
					<view class="_ul">
						<view class="_li" v-for="(item,index) in store.list" :key="index" :class="store.index===index?'on':''" @click="selectClick('store',index)">{{item}}</view>
						<view class="showShop">
							<view class="time3" @click="timeClick2('store')" v-text="store.select.label"></view>
						</view>
					</view>
				</view>
				<view class="main_time">
					客户
					<view class="_ul">
						<view class="_li" v-for="(item,index) in customer.list" :key="index" :class="customer.index===index?'on':''" @tap="selectClick('customer',index)">{{item}}</view>
					</view>
				</view>
				<view class="main_time">
					生日时间
					<view class="_ul">
						<view class="_li" v-for="(item,index) in birthday.list" :key="index" :class="birthday.index===index?'on':''" @tap="selectClick('birthday',index)">{{item}}</view>
					</view>
					<view class="ul_time">
						<view class="time" :class="{'active':index==tabIndex}" @tap="toggleTab('start')" v-for="(item,index) in timeList"
						 :key="index">{{item.name}}</view>
						<text>至</text>
						<view class="time2" :class="{'active':index==tabIndex}" @tap="toggleTab('end')" v-for="(item,index) in timeList2"
						 :key="index">{{item.name}}</view>
					</view>
				</view>

				<view class="main_time">
					创建时间
					<view class="_ul">
						<view class="_li" v-for="(item,index) in addDay.list" :key="index" :class="addDay.index===index?'on':''" @tap="selectClick('addDay',index)">{{item}}</view>
					</view>
					<view class="ul_time">
						<view class="time" :class="{'active':index==tabIndex}" @tap="toggleTab('start1')" v-for="(item,index) in timeList3"
						 :key="index">{{item.name}}</view>
						<text>至</text>
						<view class="time2" :class="{'active':index==tabIndex}" @tap="toggleTab('end1')" v-for="(item,index) in timeList4"
						 :key="index">{{item.name}}</view>
					</view>

				</view>
				<view class="main_time">
					近期跟进
					<view class="_ul">
						<view class="_li" v-for="(item,index) in follow.list" :key="index" :class="follow.index===index?'on':''" @tap="selectClick('follow',index)">{{item}}</view>
					</view>
					<view class="ul_time">
						<view class="time" :class="{'active':index==tabIndex}" @tap="toggleTab('start2')" v-for="(item,index) in timeList5"
						 :key="index">{{item.name}}</view>
						<text>至</text>
						<view class="time2" :class="{'active':index==tabIndex}" @tap="toggleTab('end2')" v-for="(item,index) in timeList6"
						 :key="index">{{item.name}}</view>
					</view>

				</view>
				<view class="main_time">
					下次跟进
					<view class="_ul">
						<view class="_li" v-for="(item,index) in follow2.list" :key="index" :class="follow2.index===index?'on':''" @tap="selectClick('follow2',index)">{{item}}</view>
					</view>
					<view class="ul_time">
						<view class="time" :class="{'active':index==tabIndex}" @tap="toggleTab('start3')" v-for="(item,index) in timeList7"
						 :key="index">{{item.name}}</view>
						<text>至</text>
						<view class="time2" :class="{'active':index==tabIndex}" @tap="toggleTab('end3')" v-for="(item,index) in timeList8"
						 :key="index">{{item.name}}</view>
					</view>

				</view>
				<w-picker mode="region" :defaultVal="['福建省','厦门市','思明区']" @confirm="onConfirm2" ref="region" themeColor="#f00">
				</w-picker>
				<w-picker mode="date" startYear="2019" endYear="2022" :defaultVal="[0,9,0]" :current="false" @confirm="onConfirm"
				 ref="yearMonth" themeColor="#f00">
				</w-picker>
				<w-picker mode="selector" @confirm="onConfirm3" ref="selector" themeColor="#f00" :selectList="store.select.list">
				</w-picker>
			</view>
			<view class="main_button">
				<view class="clear" @tap="clear()">清空</view>
				<view class="confirm" @click="childMethod()">确定</view>
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
		props: ['popup', 'bgc'],
		data() {
			return {
				selector: '',
				show: false,
				date: '',
				page: 1,
				pagesize: 16,
				channel_id: 0,
				cus_level: 0,
				last_follow_type: 0,
				last_follow_btime: '',
				last_follow_etime: '',
				next_follow_type: 0,
				next_follow_btime: '',
				next_follow_etime: '',
				add_type: 0,
				add_btime: '',
				add_etime: '',
				birth_type: 0,
				birth_begin: '',
				birth_end: '',
				cus_area: '',
				search_type: 1,
				search_content: ' ',
				dept_id: ' ',
				order_type: 1,
				status: 0,
				have_card: 0,
				cus_grade: 0,
				my_cus: 0,
				qudao: {
					list: ['全部', '平台'],
					index: 0
				},
				type: {
					list: ['全部', '默认'],
					index: 0
				},
				vip: {
					list: ['全部', '普通会员', '白银会员', '黄金会员', '铂金会员', '钻石会员'],
					index: 0
				},
				zhuangtai: {
					list: ['全部', '有效', '无效'],
					index: 0
				},
				birthday: {
					list: ['全部', '今天', '本周', '本月'],
					index: 0
				},
				area: {
					index: 0,
					list: ['全部'],
					select: {
						value: '',
						label: '请选择',
						list: []
					}
				},
				store: {
					index: 0,
					list: ['全部'],
					select: {
						value: '',
						label: '请选择',
						list: [{
							label: "厦门店",
							value: 0
						}, {
							label: "上海店",
							value: 1
						}, {
							label: "北京店",
							value: 2
						}]
					}
				},
				customer: {
					list: ['全部', '我的客户'],
					index: 0
				},
				addDay: {
					list: ['全部', '今天', '昨天', '本周', '上周', '本月', '上月'],
					index: 0
				},
				follow: {
					list: ['全部', '今天', '昨天', '本周', '上周', '本月', '上月'],
					index: 0
				},
				follow2: {
					list: ['全部', '今天', '昨天', '本周', '上周', '本月', '上月'],
					index: 0
				},
				timeList: [{

					mode: "yearMonth",
					name: "10-06"
				}],
				timeList2: [{
					mode: "yearMonth",
					name: "10-26"
				}],
				timeList3: [{
					mode: "yearMonth",
					name: "开始时间"
				}],
				timeList4: [{
					mode: "yearMonth",
					name: "结束时间"
				}],
				timeList5: [{
					mode: "yearMonth",
					name: "开始时间"
				}],
				timeList6: [{
					mode: "yearMonth",
					name: "结束时间"
				}],
				timeList7: [{
					mode: "yearMonth",
					name: "开始时间"
				}],
				timeList8: [{
					mode: "yearMonth",
					name: "结束时间"
				}],
				tabIndex: 0,
				item: []
			}
		},
		methods: {
			clear() {
				this.show = false;
			},
			toggleTab(e) {
				console.log(e)
				this.date = e
				this.$refs.yearMonth.show();
			},
			onConfirm(val) {
				console.log(val);
				if (this.date == 'start') {
					this.timeList[0].name = val.result;
					this.birth_begin = val.result;
				} else if (this.date == 'end') {
					this.timeList2[0].name = val.result;
					this.birth_end = val.result;
				}
				if (this.date == 'start1') {
					this.timeList3[0].name = val.result;
					this.add_btime = val.result;
				} else if (this.date == 'end1') {
					this.timeList4[0].name = val.result;
					this.add_etime = val.result;
				}
				if (this.date == 'start2') {
					this.timeList5[0].name = val.result;
					this.last_follow_btime = val.result;
				} else if (this.date == 'end2') {
					this.timeList6[0].name = val.result;
					this.last_follow_etime = val.result;
				}
				if (this.date == 'start3') {
					this.timeList7[0].name = val.result;
					this.next_follow_btime = val.result;
				} else if (this.date == 'end3') {
					this.timeList8[0].name = val.result;
					this.next_follow_btime = val.result;
				}
			},
			onConfirm2(e) {
				this.area.select.label = e.result
				this.cus_area = e.result
				console.log(this.cus_area)
			},
			onConfirm3(e) {
				this.store.select.label = e.result
			},
			timeClick1() {
				this.$refs.region.show();
			},
			timeClick2(e) {
				this.selector = e
				this.$refs.selector.show()
			},
			itemClick(param) {
				this.show = param
			},
			selectClick(e, index) {
				if (e == 'qudao') {
					this.qudao.index = index
					if (this.qudao.index == 1) {
						this.channel_id = 32
					} else {
						this.channel_id = 0
					}
				} else if (e == 'type') {
					this.type.index = index
					if (this.type.index == 1) {
						this.cus_level = 42
					} else {
						this.cus_level = 0
					}
				} else if (e == 'vip') {
					this.vip.index = index
					if (this.vip.index == 1) {
						this.cus_grade = 42
					} else {
						this.cus_grade = 0
					}
				} else if (e == 'zhuangtai') {
					this.zhuangtai.index = index
				} else if (e == 'birthday') {
					this.birthday.index = index
				} else if (e == 'customer') {
					this.customer.index = index
				} else if (e == 'addDay') {
					this.addDay.index = index
				} else if (e == 'follow') {
					this.follow.index = index
				} else if (e == 'follow2') {
					this.follow2.index = index
					console.log(this.follow2.index)
				}
			},
			childMethod() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/lists', //
					method: 'GET',
					data: {
						page: this.page,
						pagesize: this.pagesize,
						channel_id: this.channel_id,
						cus_level: this.cus_level,
						last_follow_type: this.follow.index,
						last_follow_btime: this.last_follow_btime,
						last_follow_etime: this.last_follow_etime,
						next_follow_type: this.follow2.index,
						next_follow_btime: this.next_follow_btime,
						next_follow_etime: this.next_follow_etime,
						add_type: this.addDay.index,
						add_btime: this.add_btime,
						add_etime: this.add_etime,
						birth_type: this.birthday.index,
						birth_begin: this.birth_begin,
						birth_end: this.birth_end,
						cus_area: this.cus_area,
						search_content: this.search_content,
						status: this.zhuangtai.index,
						order_type: this.order_type,
						cus_grade: this.cus_grade,
						my_cus: this.customer.index,
						dept_id: this.store.select.value,
						search_type: this.search_type,
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res)
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
						this.$emit('pgetuser', res.data.data.data)
						this.show = false
					}
				});

			}
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
		opacity: 0;
	}

	.popup-bg {
		width: 120upx;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	.popup_ {
		position: absolute;
		top: 0;
		left: 120upx;
		width: 630upx;
		height: 100%;
		background-color: #FFFFFF;

		.title {
			position: absolute;
			top: 20upx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 34upx;
			font-weight: 900;
		}

		.main {
			width: 525upx;
			margin: 0 auto;
			z-index: 999;
			margin-top: 84upx;
			color: #444445;
			max-height: 82%;
			margin-bottom: 30upx;
			overflow-x: hidden;
			overflow-y: auto;

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
			position: relative;
			height: 150upx;
			width: 100%;
			align-items: center;
			justify-content: center;
			// padding-top: 10upx;
			background-color: #FFFFFF;

			view {
				width: 240upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				margin-bottom: 20upx;
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
		.time3 {
			position: relative;
			width: 320upx;
			height: 60upx;
			margin-top: 5upx;
			background-color: #007AFF;
			border-radius: 4upx;
			background-color: #ffffff;
			border: 1px solid #ccc;
			text-align: center;
			line-height: 60upx;
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
