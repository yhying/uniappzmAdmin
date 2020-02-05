<template>
	<view class="page">
		<view class="user-head">
			<view class="user-info">
				<view class="avatar">
					<image src="../../static/style/avatar.png" class="avatar-pic" mode="widthFix"></image>
					<view class="sex">
						<image src="../../static/style/sex-icon1.png" mode="widthFix" v-if="form.cus_sex == 1"></image>
						<image src="../../static/style/sex-icon2.png" mode="widthFix" v-if="form.cus_sex == 2"></image>
						<image src="../../static/style/sex-icon3.png" mode="widthFix" v-if="form.cus_sex == 3"></image>
					</view>
				</view>
				<view class="info">
					<view class="title">
						{{form.cus_name}}
						<text v-text="form.cus_grade_name"></text>
					</view>
					<view class="phone" v-text="form.cus_mobile"></view>
					<view class="date">最近到店：{{form.addtime}}</view>
				</view>
			</view>
			<image src="../../static/member/edit-icon.png" class="edit-icon" mode="widthFix" @click="editClick()"></image>
		</view>
		<view class="nav">
			<text v-for="(item, index) in nav.list" :key="index" :class="nav.index==index ? 'on' : ''" v-text="item" @click="navClick(index)"></text>
		</view>
		<operating v-show="nav.index == 1" :form="form" class="page-centent"></operating>
		<dynamic v-show="nav.index == 2" :form="form" :list="list" class="page-centent"></dynamic>
		<distribution v-show="nav.index == 3" class="page-centent"></distribution>
		<account v-show="nav.index == 0" :form="form" class="page-centent"></account>
	</view>
</template>

<script>
	// 操作
	import operating from '@/components/member/operating'
	// 动态
	import dynamic from '@/components/member/dynamic'
	// 分销
	import distribution from '@/components/member/distribution'
	// 账户
	import account from '@/components/member/account'
	export default {
		components: {
			operating,
			dynamic,
			distribution,
			account
		},
		data() {
			return {
				cus_id: '',
				nav: {
					list: ['账户', '操作', '动态', '分销'],
					index: 0,
				},
				form: {},
				list: {},
				page: {
					page: '0',
					pagesize: '20'
				}
			}
		},
		onReady() {
		},
		onShow() {},
		onLoad(e) {
			this.cus_id = e.cus_id
			this.getcusinfo(e.cus_id)
		},
		methods: {
			navClick(e) {
				this.nav.index = e
				if (e === 2) {
					this.zone(this.page.page, this.page.pagesize)
				}
			},
			editClick() {
				uni.navigateTo({
					url: `/pages/member/editUser?cus_id=` + this.cus_id,
				})
			},
			getcusinfo(cus_id) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/getcusinfo', //
					method: 'GET',
					data: {
						cus_id: cus_id
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
						uni.setStorage({
							key: 'dept_id',
							data: res.data.data.info.dept_id,
							success: function() {}
						});
						uni.setStorage({
							key: 'cus_id',
							data: res.data.data.info.cus_id,
							success: function() {}
						});
						this.form = res.data.data.info
					}
				});
			},
			zone(page, pagesize) {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/zone', //
					method: 'GET',
					data: {
						page: page,
						pagesize: pagesize,
						type: 0,
						cus_id: this.cus_id
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
						this.list = res.data.data.data[0].data
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.page {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #f6f7f9;
	}

	.user-head {
		left: 30upx;
		right: 30upx;
		position: absolute;
		top: 20upx;
		background: #FFFFFF;
		height: 318upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30upx;
		padding-right: 30upx;
		border-radius: 30upx;

		.edit-icon {
			width: 46upx;
			position: absolute;
			right: 30upx;
			height: 46upx;
			top: 50%;
			margin-top: -23upx;
		}

		.user-info {
			display: flex;
			width: 545upx;

			.avatar {
				width: 150upx;
				position: relative;
				
				.sex {
					position: absolute;
					width: 30upx;
					right: 0;
					bottom: 0;
					image {
						width: 100%;
					}
				}

				.avatar-pic {
					width: 100%;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 30upx;

				.title {
					display: flex;
					align-items: center;
					font-size: 36upx;
					color: #151515;

					text {
						font-size: 22upx;
						color: #FFFFFF;
						margin-left: 22upx;
						height: 40upx;
						display: flex;
						align-items: center;
						padding-left: 12upx;
						padding-right: 12upx;
						background: #ff0066;
						border-radius: 8upx;
					}
				}

				.phone {
					font-size: 26upx;
					color: #121212;
					margin-top: 25upx;
				}

				.date {
					font-size: 20upx;
					color: #a1a1a1;
					margin-top: 15upx;
				}
			}
		}
	}

	.nav {
		display: flex;
		height: 130upx;
		position: absolute;
		left: 0;
		right: 0;
		top: 358upx;
		background: #FFFFFF;

		text {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
			color: #959595;
			position: relative;

			&.on {
				color: #272727;

				&:after {
					content: '';
					width: 14upx;
					height: 10upx;
					position: absolute;
					left: 50%;
					margin-left: -7upx;
					bottom: 24upx;
					background: #272727;
					border-radius: 100upx;
				}
			}
		}
	}

	.page-centent {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 508upx;
	}
</style>
