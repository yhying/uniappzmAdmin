<template>
	<view class="operating-list">
		<view class="_li" v-for="(item, index) in list" :key="index" @click="navClick(item)">
			<image :src="'../../static/member/operating-icon'+index+'.png'" class="pic"></image>
			<text v-text="item"></text>
		</view>
		<popup :popup="popup" ref="popup" :popupList="popupList" :transferForm="transferForm"></popup>
	</view>
</template>

<script>
	import popup from '@/components/member/popup'
	export default {
		components: {
			popup
		},
		data() {
			return {
				popup: '',
				list: ['新定金', '新收银', '新预约', '新跟进', '提醒', '回访', '送积分', '送余额', '客户转交'],
				transferForm: {
					data: {},
					list: []
				},
				popupList: []
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {},
		methods: {
			navClick(e) {
				if (e === '回访') {
					this.popup = 1
					this.$refs.popup.itemClick('true')
				} else if (e === '送余额') {
					this.popup = 2
					this.$refs.popup.itemClick('true')
				} else if (e === '送积分') {
					this.popup = 3
					this.$refs.popup.itemClick('true')
				} else if (e === '新预约') {
					this.popup = 4
					this.$refs.popup.itemClick('true')
					this.popupList = uni.getStorageSync('popupList')
				} else if (e === '提醒') {
					this.popup = 5
					this.$refs.popup.itemClick('true')
				} else if (e === '新跟进') {
					this.popup = 6
					this.$refs.popup.itemClick('true')
				} else if (e === '新定金') {
					this.popup = 7
					this.$refs.popup.itemClick('true')
				} else if (e === '客户转交') {
					this.popup = 8
					this.$refs.popup.itemClick('true')
					this.transferForm.list = uni.getStorageSync('technician')
					this.customerAscrinfo()
				}else if(e === '新收银'){
					uni.navigateTo({
						url: `/pages/tabBar/Price/price`,
					})
				}
			},
			customerAscrinfo() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/ascrinfo',
					method: 'GET',
					data: {
						cus_id: uni.getStorageSync('cus_id')
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
						this.transferForm.data = res.data.data
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.operating-list {
		display: flex;
		flex-wrap: wrap;
		padding-top: 33upx;
		background: #FFFFFF;

		._li {
			width: 25%;
			height: 172upx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.pic {
				width: 70upx;
				height: 70upx;
			}

			text {
				font-size: 26upx;
				color: #282828;
				margin-top: 20upx;
			}
		}
	}
</style>
