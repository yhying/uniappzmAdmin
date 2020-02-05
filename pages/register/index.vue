<template>
	<view class="page">
		<view class="form">
			<view class="input">
				<input type="text" v-model="form.biz_name" placeholder="请填写联系人" />
			</view>
			<view class="input">
				<input type="text" v-model="form.biz_mobile" placeholder="请填写手机号" />
			</view>
			<view class="input code">
				<input type="text" v-model="form.mobile_code" placeholder="请填写验证码" />
				<view class="code-btn">获取验证码</view>
			</view>
			<view class="input">
				<input type="text" v-model="form.biz_contact" placeholder="请填写公司名称" />
			</view>
			<view class="input">
				<text v-text="form.biz_addr" @click="addClick()"></text>
			</view>
		</view>
		<button @click="btnClick">注册</button>
		<popup :popup="popup" ref="popup"></popup>
		<w-picker mode="region" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import request from '@/components/pocky-request/index.js'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import popup from '@/components/member/popup'
	export default {
		components: {
			wPicker,popup
		},
		data() {
			return {
				popup: '',
				form: {
					biz_name: '',
					biz_mobile: '',
					mobile_code: '',
					biz_contact: '',
					biz_addr: '请选择公司所在城市'
				},
				address: []
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {
		},
		methods: {
			addClick() {
				this.$refs.picker.show()
			},
			onConfirm(e) {
				this.form.biz_addr = e.checkArr[0] + e.checkArr[1]
			},
			btnClick() {
				const instance = new request();
				const r = instance.post({
						url: "biz/reg",
						data: this.form,
					})
					.then(res => {
						this.popup = 12
						this.$refs.popup.itemClick('true')
					})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f6f6f6;
	}
	
	.form {
		margin-left: 20upx;
		margin-right: 20upx;
		.input {
			height: 88upx;
			margin-top: 22upx;
			&.code {
				display: flex;
				justify-content: space-between;
				input {
					width: 400upx;
				}
				.code-btn {
					width: 260upx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24upx;
					color: #ff0066;
					background: #FFFFFF;
				}
			}
			input {
				padding-left: 20upx;
				padding-right: 20upx;
				height: 100%;
				background: #FFFFFF;
				font-size: 26upx;
			}
			text {
				padding-left: 20upx;
				padding-right: 20upx;
				height: 100%;
				display: flex;
				align-items: center;
				color: #808080;
				background: #FFFFFF;
				font-size: 26upx;
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
		margin-top: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
