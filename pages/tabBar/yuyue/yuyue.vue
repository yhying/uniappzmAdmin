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
				<view class="user-info" @click="detailClick(item)">
					<view class="avatar">
						<image src="../../../static/style/avatar.png" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="_h5">{{item.cus_name}}<text>普通会员</text></view>
						<view class="phone" v-text="item.cus_mobile"></view>
						<view class="remark">备注:</view>
					</view>
					<view class="status green" v-if="item.status == 1">生效中</view>
					<view class="status red" v-if="item.status == 2">已开单</view>
					<view class="status gray" v-if="item.status == 4">已取消</view>
				</view>
				<view class="more-item">
					<view class="date">预约时间：{{item.appoint_date}} {{item.appoint_btime}}~{{item.appoint_etime}}</view>
					<view class="btn-item">
						<view class="operating" v-if="item.status != 4 && item.status != 2" @click="selectClick(item)">
							<text></text>
							<text></text>
							<text></text>
						</view>
						<button v-if="item.status != 2 && item.status != 4" @click="cashClick(item)">收银</button>
					</view>
				</view>
			</view>
		</view>
		<page-footer footIndex="3"></page-footer>
		<filter-page ref="filter" v-on:childByValue="childByValue"></filter-page>
		<popup :popup="popup" :yuyueDetail="yuyueDetail" :popupList="popupList" v-on:childPopup="childPopup" ref="popup"></popup>
		<w-picker mode="selector" @confirm="reserveFormConfirm" ref="reserveSelect" :selectList="select.list" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import pageFooter from "@/components/footer.vue";
	import filterPage from "@/components/yuyue/yuyueChoose.vue";
	import popup from '@/components/member/popup'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			pageFooter,
			filterPage,
			popup,
			wPicker
		},
		data() {
			return {
				yuyueDetail: {},
				popupList: {
					package: [],
					product: [],
					project: [],
					room: []
				},
				popup: '',
				searchShow: false,
				list: [],
				cart_id: '',
				dept_id: '',
				select: {
					label: '',
					list: [{
						value: 0,
						label: '修改信息'
					}, {
						value: 1,
						label: '取消预约'
					}],
					value: '',
				},
				page: {
					page: 1,
					pagesize: 200
				},
				form: {
					cus_type: 0,
					status: 0,
					time_type: 0,
					btime: '',
					etime: '',
					search_type: 1,
					search_content: '',
					dept_id: ''
				}
			}
		},
		onLoad(e) {
			this.cartLists(this.page.page, this.page.pagesize, this.form.cus_type, this.form.status, this.form.time_type, this.form
				.btime, this.form.etime, this.form.search_type, this.form.search_content, this.form.dept_id)
		},
		methods: {
			cashClick(item) {
				console.log(item.cart_id)
				uni.navigateTo({
					url: '/pages/price/detail?cus_id=' +  item.cus_id + '&dept_id=' + item.dept_id + '&cart_id=' + item.cart_id+'&teachers='+item.teachers
				});
			},
			hideClick() {
				this.searchShow = false
				this.form.search_content = ''
				this.cartLists(this.page.page, this.page.pagesize, this.form.cus_type, this.form.status, this.form.time_type, this.form
					.btime, this.form.etime, this.form.search_type, '', this.form.dept_id)
			},
			inputFunc(e) {
				if (e.detail.value.length === 0) {
					this.hideClick()
					return
				}
				this.form.search_content = e.detail.value
				this.searchShow = true
				this.cartLists(this.page.page, this.page.pagesize, this.form.cus_type, this.form.status, this.form.time_type, this.form
					.btime, this.form.etime, this.form.search_type, e.detail.value, this.form.dept_id)
			},
			reserveFormConfirm(e) {
				let _this = this
				if (e.result === '取消预约') {
					uni.showModal({
					    title: '提示',
					    content: '确定取消预约吗？',
					    success: function (res) {
					        if (res.confirm) {
								_this.cartDel()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				} else if (e.result === '修改信息') {
					this.popup = 10
					this.$refs.popup.itemClick('true')
					this.servicepackageCartlists(this.dept_id)
					this.cartDetail(this.cart_id)
				}
			},
			selectClick(item) {
				this.cart_id = item.cart_id
				this.dept_id = item.dept_id
				this.$refs.reserveSelect.show()
			},
			filterClick() {
				this.$refs.filter.itemClick('true')
			},
			childByValue: function(childValue) {
				this.list = childValue
			},
			childPopup: function(childValue) {
				this.cart_id = childValue.cart_id
				this.cartDel()
			},
			detailClick(item) {
				this.popup =15
				this.$refs.popup.itemClick('true')
				this.cartDetail(item.cart_id)
			},
			// 取消预约接口
			cartDel() {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/del',
					method: 'POST',
					data: {
						cart_id: this.cart_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						this.cartLists(this.page.page, this.page.pagesize, this.form.cus_type, this.form.status, this.form.time_type,
							this.form.btime, this.form.etime, this.form.search_type, this.form.search_content, this.form.dept_id)
					}
				});
			},
			// 详情接口
			cartDetail(cart_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/detail',
					method: 'POST',
					data: {
						cart_id: cart_id
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res)
						this.yuyueDetail = res.data.data
					}
				});
			},
			servicepackageCartlists(dept_id) {
				// 套餐接口
				uni.request({
					url: uni.getStorageSync('interface') + 'servicepackage/cartlists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						page: this.page.page,
						pagesize: this.page.pagesize
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							 this.$set(item, 'status', false)
							 this.$set(item, 'nums', '1')
						})
						this.popupList.package = res.data.data
					}
				});
				// 产品接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceproduct/cartlists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						page: this.page.page,
						pagesize: this.page.pagesize
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							 this.$set(item, 'status', false)
							 this.$set(item, 'nums', '1')
						})
						this.popupList.product = res.data.data
					}
				});
				// 项目接口
				uni.request({
					url: uni.getStorageSync('interface') + 'serviceitem/cartlists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						page: this.page.page,
						pagesize: this.page.pagesize
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						res.data.data.forEach((item, index) => {
							 this.$set(item, 'status', false)
							 this.$set(item, 'nums', '1')
						})
						this.popupList.project = res.data.data
					}
				});
				// 房间接口
				uni.request({
					url: uni.getStorageSync('interface') + 'room/config/lists',
					method: 'GET',
					data: {
						dept_id: dept_id,
						status: 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						var label = new Array()
						res.data.data.forEach((item, index) => {
							 label[index] = {label:item.room_name,value: item.room_id}
						})
						this.popupList.room = label
					}
				});
			},
			// 预约列表接口
			cartLists(page, pagesize, cus_type, status, time_type, btime, etime, search_type, search_content, dept_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/lists', //
					method: 'GET',
					data: {
						page: page,
						pagesize: pagesize,
						cus_type: cus_type,
						status: status,
						time_type: time_type,
						btime: btime,
						etime: etime,
						search_type: search_type,
						search_content: search_content,
						dept_id: dept_id
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
						// console.log(this.list)
					}
				});
			}
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
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

					.remark {
						font-size: 22upx;
						color: #8d8d8d;
						margin-top: 5upx;
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
						color: #FFFFFF;
						border-radius: 200upx;
						background: #ff0066;
						margin-left: 30upx;
					}
				}
			}
		}
	}
</style>
