<template>
	<view class="pages">
		<view class="search-item">
			<view class="select" @click="selectClick()" v-text="search.dept_id.label"></view>
			<view class="search">
				<input type="text" placeholder="客户名称/手机号" v-model="search.search_content" @input="inputFunc" />
				<image src="../../../static/style/search-icon.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list">
			<view class="no-data" v-if="list.length == 0">
				<image src="../../../static/style/no-data.png" mode="widthFix"></image>
				<view class="_h6">
					没有选择会员
				</view>
				<text>请选择会员后进行下一步操作</text>
			</view>
			<view class="_li" v-for="(item,index) in list" :key="index" @click="detailClick(item)">
				<view class="user-info">
					<view class="avatar">
						<image src="../../../static/images/genteravator.png" mode="widthFix"></image>
						<image v-if="item.cus_sex == 1" src="../../../static/style/sex-icon1.png" class="sex" mode="widthFix"></image>
						<image v-if="item.cus_sex == 2" src="../../../static/style/sex-icon2.png" class="sex" mode="widthFix"></image>
						<image v-if="item.cus_sex == 3" src="../../../static/style/sex-icon3.png" class="sex" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="_h5">{{item.cus_name}}<text v-text="item.cus_grade_name"></text></view>
						<view class="phone" v-text="item.cus_mobile"></view>
					</view>
				</view>
				<view class="status" v-if="item.cart_num == 0">无预约</view>
				<view class="status red" v-if="item.cart_num >= 1">有预约</view>
			</view>
		</view>
		<page-footer footIndex="2" iconShow="false"></page-footer>
		<w-picker mode="selector" @confirm="formConfirm" ref="transferSelect" :selectList="search.dept_id.list"
		 themeColor="#f00">
		 </w-picker>
	</view>
</template>

<script>
	import pageFooter from "@/components/footer.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			pageFooter,wPicker
		},
		data() {
			return {
				search: {
					dept_id: {
						list: [],
						value: '',
						label: '请选择'
					},
					search_content: ''
				},
				list: []
			}
		},
		onLoad(e) {
			var label = new Array()
			uni.getStorageSync('store').forEach((item, index) => {
				// console.log(item.id)
				label[index] = {label:item.dept_name,value: item.dept_id}
			})
			this.search.dept_id.list = label
			this.list=label
			this.search.search_content = ''
			this.search.dept_id.label = this.list[0].label
			this.search.dept_id.value = this.list[0].value
			this.customerLists()
		
		},
		methods: {
			selectClick() {
				this.$refs.transferSelect.show()
			},
			formConfirm(e) {
				this.search.search_content = ''
				this.search.dept_id.label = e.result
				this.search.dept_id.value = e.checkArr.value
				this.customerLists()
			},
			customerLists () {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/lists',
					data: {
						search_type: 3,
						page: 0,
						dept_id: this.search.dept_id.value,
						search_content: this.search.search_content
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						this.list = res.data.data.data
					}
				});
			},
			detailClick(item) {
				uni.navigateTo({
					url: '/pages/price/detail?cus_id=' +  item.cus_id + '&dept_id=' + item.dept_id
				});
			},
			inputFunc(e) {
				this.search.dept_id.value = ''
				this.search.dept_id.label = '请选择'
				this.search.search_content = e.detail.value
				this.customerLists()
			}
		}
	}
</script>

<style lang="less">
	.search-item {
		padding-left: 20upx;
		padding-right: 20upx;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.select {
			width: 260upx;
			height: 68upx;
			background: #f9f9f9;
			font-size: 24upx;
			color: rgb(51, 51, 51);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.search {
			width: 445upx;
			height: 68upx;
			background: #f9f9f9;
			display: flex;
			align-items: center;
			justify-content: space-between;

			input {
				width: 355upx;
				height: 100%;
				padding-left: 18upx;
				font-size: 24upx;
			}

			image {
				width: 35upx;
				height: 100%;
				margin-right: 20upx;
			}
		}
	}

	.list {
		position: absolute;
		left: 0;
		top: 90upx;
		bottom: 110upx;
		right: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background: #f6f6f6;
		
		.no-data {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 120upx;
			._h6 {
				font-size: 24upx;
				margin-top: 20upx;
				color: #949494;
			}
			
			text {
				font-size: 20upx;
				margin-top: 20upx;
				color: #CCCCCC;
			}
			
			image {
				width: 376upx;
			}
		}

		._li {
			margin-left: 20upx;
			margin-right: 20upx;
			padding-left: 20upx;
			padding-right: 20upx;
			height: 165upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin-top: 20upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.user-info {
				display: flex;
				align-items: center;

				.avatar {
					width: 112upx;
					height: 112upx;
					position: relative;

					image {
						width: 100%;
						height: 100%;

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
				}
			}
				
			.status {
				color: #949494;
				font-size: 22upx;
				&.red {
					color: #ff0c6d;
				}
			}
		}
	}
</style>
