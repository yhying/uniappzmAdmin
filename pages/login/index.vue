<template>
	<view class="page">
		<view class="form">
			<view class="logo">
				<image src="../../static/login/logo.png" mode="widthFix"></image>
				智美·美业管理系统
			</view>
			<view class="input" v-if="step == 1">
				<image src="../../static/login/phone-icon.png" mode="widthFix" class="icon"></image>
				<text v-text="form.mobile" @click="phoneClick"></text>
			</view>

			<view class="input" v-if="step == 2">
				<image src="../../static/login/company-icon.png" mode="widthFix" class="icon"></image>
				<text v-text="user_id.label" @click="companyClick()"></text>
			</view>
			<view class="input code" v-if="step == 2">
				<image src="../../static/login/code-icon.png" mode="widthFix" class="icon"></image>
				<input type="password" v-model="form.user_pass" placeholder="请输入密码" />
			</view>
		</view>
		<button v-if="step == 1" @click="bindLogin">下一步</button>
		<button v-if="step == 2" @click="bindLogin">登录</button>
		<view class="register">
			没有账号？<span @click="registerClick">申请入驻</span>
		</view>
		<w-picker mode="selector" @confirm="userConfirm" ref="storeUser" :selectList="user_id.list" themeColor="#f00">
		</w-picker>
		<keyboard-package ref="number" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" :disableDot="true" />
	</view>
</template>

<script>
	import request from '@/components/pocky-request/index.js'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import keyboardPackage from "@/components/keyboard-package/keyboard-package.vue"
	export default {
		components: {
			wPicker,
			keyboardPackage
		},
		data() {
			return {
				step: 1,
				form: {
					phoneStr: [],
					mobile: '请输入手机号',
					user_pass: '',
					user_id: ''
				},
				user_id: {
					list: [],
					label: '请选择管理公司'
				}
			}
		},
		onReady() {},
		onShow() {
			let _this = this
			uni.getStorage({
				key: 'token',
				success: function(res) {
					if (!(res.data === '')) {
						setTimeout(function() {
							_this.step = 1
							uni.navigateTo({
								url: '/pages/tabBar/home/home'
							});
						}, 500)
					}
				}
			});
		},
		onLoad(e) {},
		computed: {
			passStr() {
				return str;
			}
		},
		methods: {
			// 键盘事件
			onInput(key) {
				if (this.form.mobile.length === 11) {
					return
				}
				this.form.phoneStr.push(key);
				this.calculate()
			},
			calculate() {
				this.form.mobile = ''
				let str = '';
				this.form.phoneStr.forEach(item => {
					str += item.toString();
				})
				this.form.mobile = str
			},
			onDelete() {
				if (this.form.mobile.length === 1) {
					this.form.mobile = '请输入手机号'
				}
				this.form.phoneStr.pop();
				this.calculate()
			},
			onConfirm() {},
			phoneClick() {
				this.$refs['number'].open();
			},
			companyClick() {
				this.$refs.storeUser.show();
			},
			userConfirm(e) {
				this.user_id.label = e.checkArr.label
				this.form.user_id = e.checkArr.value
			},
			bindLogin() {
				if (this.step === 1) {
					const instance = new request();
					const r = instance.post({
							url: "user/searchMobile",
							data: {
								mobile: this.form.mobile
							},
							// contentType: 'form',
						})
						.then(res => {
							var label = new Array()
							res.data.data.forEach((item, index) => {
								// console.log(item.id)
								label[index] = {
									label: item.biz_name,
									value: item.user_id
								}
							})
							this.user_id.list = label
							this.user_id.label = label[0].label
							this.form.user_id = label[0].value
							this.step = 2
						})
				} else if (this.step === 2) {
					const instance = new request();
					const r = instance.post({
							url: "user/saveLogin",
							data: this.form,
							// contentType: 'form',
						})
						.then(res => {
							uni.setStorage({
								key: 'token',
								data: res.data.data.token,
								success: function() {
									uni.navigateTo({
										url: '/pages/tabBar/home/home'
									})
									_this.step = 1
								}
							});
						})
						.catch(res => {
							uni.showToast({
								icon: 'none',
								title: '密码错误！'
							});
						})
				}
			},
			registerClick() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
			}
		}
	}
</script>

<style lang="less">
	.page {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: url(../../static/login/bj.jpg) no-repeat;
		background-size: 100% 100%;

		.form {
			width: 600upx;

			.logo {
				font-size: 30upx;
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				margin-bottom: 100upx;

				image {
					width: 120upx;
					margin-bottom: 20upx;
				}
			}

			.input {
				background: #FFFFFF;
				height: 88upx;
				display: flex;
				align-items: center;
				position: relative;
				border-radius: 100upx;
				margin-top: 20upx;

				&:first-child {
					margin-top: 0;
				}

				&.code {
					text {
						font-size: 22upx;
						color: #FFFFFF;
						width: 150upx;
						height: 68upx;
						position: absolute;
						right: 10upx;
						top: 50%;
						margin-top: -34upx;
						background: #ff0066;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100upx;
					}

					input {
						width: 290upx;
					}
				}

				input {
					height: 100%;
					font-size: 26upx;
					padding-left: 47upx;
					width: 430upx;
				}

				text {
					height: 100%;
					font-size: 26upx;
					padding-left: 47upx;
					width: 430upx;
					color: #999;
					display: flex;
					align-items: center;
				}

				.icon {
					height: 100%;
					width: 50upx;
					margin-left: 50upx;
				}
			}
		}

		button {
			width: 600upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #ff0066;
			border-radius: 100upx;
			height: 88upx;
			margin-top: 20upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.register {
			height: 50upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 28upx;
			color: #FFFFFF;
			width: 600upx;
			margin-left: auto;
			margin-right: auto;

			span {
				text-decoration: underline;
			}
		}
	}
</style>
