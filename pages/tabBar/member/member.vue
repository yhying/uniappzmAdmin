<template>
	<view class="pages">
		<view class="page-member-content" v-if="hidenSearch">
			<view class="search">
				<view class="input">
					<image src="../../../static/style/search-icon.png" class="search-icon" mode="widthFix"></image>
					<input type="text" placeholder="会员名、手机号" v-model="form.search_content" @input="inputFunc" />
				</view>
				<image v-show="searchShow == false" src="../../../static/style/filter-icon.png" class="filter-icon" mode="widthFix"
				 @tap="show()"></image>
				<text v-show="searchShow == true" @click="hideClick()">取消</text>
			</view>
			<view class="page_body">
				<view class="_ul">
					<view class="_li" v-for="(item,index) in tabs.list" :key="index">
						<view class="li_2" @click="detailClick(item)">
							<view class="icon">
								<image :src="item.cus_sex==1?'/static/images/manavator.png':''||item.cus_sex==2?'/static/images/womenavator.png':''||item.cus_sex==3?'/static/images/genteravator.png':''"></image>
								<i class="iconfont" style="color:#9addff;transform:rotate(214deg)" v-if="item.cus_sex==1">&#xe603;</i>
								<i class="iconfont" style="color:#ff99cc; transform:rotate(90deg)" v-if="item.cus_sex==2">&#xe602;</i>
								<i class="iconfont" style="color:#d7d7d7; transform:rotate(196deg);" v-if="item.cus_sex==3">&#xe606;</i>
							</view>
							<view class="person">
								<view class="info">
									<view class="title">
										<view class="name">{{item.cus_name}}</view>
										<text class="vip">{{item.cus_grade_name}}</text>
									</view>
								</view>
								<view class="phone">{{item.cus_mobile}}</view>
								<view class="money">
									累计消费
									<text>￥</text>
									<text>{{item.paid_amount}}</text>
								</view>
							</view>
						</view>
						<view class="yuyue">
							<view class="date">最近到店：{{item.last_shop}}</view>
							<button @click="yuyueClick(item)">预约</button>
						</view>
					</view>
				</view>
			</view>
					<popup :popup="popup" :bgc="bgc" ref="popup" @pgetuser="pgetuser(arguments)" @func2="getselect"></popup>
		</view>
		<page-footer footIndex="4"></page-footer>
		<search v-if="showSearch" ref="headerChild" @func="getMsgFormSon(arguments)"></search>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import pageFooter from "@/components/footer.vue";
	import search from "@/components/jm-search/jm-search.vue"
	import request from '@/components/pocky-request/index.js'
	import popup from "@/components/member/choose.vue";
	export default {
		components: {
			wPicker,
			search,
			pageFooter,
			popup
		},
		data() {
			return {
				searchShow: false,
				searchValue: '',
				page: 1,
				pagesize: 16,
				channel_id: 0,
				cus_level: 0,
				last_follow_type: 0,
				next_follow_type: 0,
				add_type: 0,
				add_btime: '',
				add_etime: '',
				birth_type: 0,
				cus_area: '',
				search_type: 1,
				search_content: '',
				dept_id: '',
				order_type: 2,
				status: 0,
				have_card: 0,
				cus_grade: 0,
				my_cus: 0,
				bgc: '',
				tabIndex: 0,
				hidenSearch: true,
				showSearch: false,
				showback: false,
				shownext: false,
				tabs: {
					list: []
				},
				cus_info: {
					cus_photo: ''
				},
				selector: [],
				ipt: '',
				form: {
					cus_type: 0,
					status: 0,
					time_type: 0,
					btime: '',
					etime: '',
					search_type: 1,
					search_content: '',
					dept_id: '',
				}
			}
		},
		onReady() {
			this.getuser(this.page, this.pagesize, this.search_type, this.search_content, this.dept_id, this.my_cus, this.cus_grade,
				this.order_type)
		},
		methods: {
			show() {
				this.popup = 1
				this.$refs.popup.itemClick('true')
				this.bgc = true;
			},
			hideClick() {
				this.searchShow = false
				this.form.search_content = ''
				this.search_type = 1
				this.search_content = ' '
				this.getuser(this.page, this.pagesize, this.search_type, this.search_content, this.dept_id, this.my_cus, this.cus_grade,
					this.order_type)
			},
			inputFunc(e) {
				if (e.detail.value.length === 0) {
					this.hideClick()
					return
				}
				this.ipt = e.detail.value
				this.searchShow = true
				this.search_content = this.ipt
				this.tabs.list.forEach((item, index) => {
					if (this.ipt.indexOf(item.cus_name)) {
						this.search_content = this.ipt
						this.search_type = 2
					}
					if (this.ipt == item.cus_mobile) {
						this.search_content = this.ipt
						this.search_type = 1
						this.order_type = 1
					}
				})
				this.getuser(this.page, this.pagesize, this.search_type, this.search_content, this.dept_id, this.my_cus, this.cus_grade,
					this.order_type)
				this.search_type = 2
				this.order_type = 2
			},
			pgetuser(pgetuser) {
				this.tabs.list = pgetuser;
			},
			getMsgFormSon(data) {
				this.ipt = data[1]
				this.search_content = this.ipt
				if (data[0] == 0) {
					this.showback = false;
					this.shownext = true;
				} else if (data[0] == 1) {
					this.showback = true;
					this.shownext = false;
				}
			},
			getuser(page, pagesize, search_type, search_content, dept_id, my_cus, cus_grade, order_type) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/lists',
					data: {
						page: page,
						pagesize: pagesize,
						search_type: search_type,
						search_content: search_content,
						dept_id: dept_id,
						my_cus: my_cus,
						cus_grade: cus_grade,
						order_type: order_type,
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						this.tabs.list = res.data.data.data

					}
				});
			},
			detailClick(item) {
				uni.navigateTo({
					url: '/pages/member/detail?cus_id=' + item.cus_id
				});
			},
			yuyueClick(item) {
				uni.navigateTo({
					url: '/pages/member/reserve?cus_id=' + item.cus_id + '&dept_id=' + item.dept_id
				});
			},
			onNavigationBarButtonTap: function(e) {
				if (e.index === 0) {
					uni.navigateTo({
						url: '/pages/member/addUser'
					});
				}
			},
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
		opacity: 0;
	}

	.show {
		background-color: rgba(0, 0, 0, 0.6);
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

	.page_body {

		._ul {
			position: absolute;
			left: 0;
			top: 82upx;
			bottom: 110upx;
			right: 0;
			overflow-x: hidden;
			// overflow-y: auto;
			background: #f6f6f6;
		}

		._li {
			width: 710upx;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
			background: #FFFFFF;
			border-radius: 20upx;
			position: relative;
			margin-bottom: 18upx;
			box-sizing: border-box;


			.li_2 {
				height: 166upx;
				display: flex;
				align-items: center;
				margin-left: 20upx;
				margin-right: 20upx;
				border-bottom: solid 2upx #f5f5f5;
				box-sizing: border-box;
				position: relative;
			}

			.yuyue {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90upx;
				margin-left: 20upx;
				margin-right: 20upx;
				color: #848484;

				.date {
					font-size: 22upx;
				}

				button {
					width: 130upx;
					height: 50upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26upx;
					color: #FFFFFF;
					border-radius: 200upx;
					background: #ff0066;
					margin-right: 30upx;
				}
			}

			.icon {
				width: 110upx;
				height: 110upx;
				margin-right: 30upx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				i {
					position: absolute;
					bottom: -10upx;
					right: -5upx;
					font-size: 30upx;
				}

			}

			.person {
				display: flex;
				margin-top: 10upx;
				flex-direction: column;
				justify-content: center;

				.phone {
					margin: 4upx 0;
					color: #808080;
					font-size: 22upx;
				}

				.money {
					font-size: 20upx;
					color: #C0C0C0;

					text {
						color: #333333;
					}

					text:first-child {
						margin: 0 10upx;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;

					.title {
						display: flex;
						align-items: center;

					}

					.vip {
						border: 1px solid #ccc;
						box-sizing: border-box;
						font-size: 18upx;
						color: #afafaf;
						display: flex;
						padding-left: 8upx;
						padding-right: 8upx;
						justify-content: center;
						align-items: center;
						margin-left: 10upx;
						border-radius: 8upx;
					}
				}

				.name {
					position: relative;
					font-size: 26upx;
					color: #555555;

				}
			}
		}
	}
</style>
