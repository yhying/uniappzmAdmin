<template>
	<view class="page">
		<view class="form">
			<view class="input">
				<text class="important">全称</text>
				<input type="text" v-model="form.name" placeholder="请输入店名" />
			</view>
			<view class="input">
				<text class="important">简称</text>
				<input type="text" v-model="form.jianname" placeholder="请输入名称" />
			</view>
			<view class="input">
				<text class="important">运营类型</text>
				<view class="select" @click="selectClick('type2')">
					{{form.type2.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">负责人</text>
				<input type="text" v-model="form.bossname" placeholder="请输入..." />
			</view>
			<view class="input">
				<text class="important">负责人电话</text>
				<input type="text" v-model="form.phone" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="input">
				<text class="important">状态</text>
				<view class="select" @click="selectClick('status2')">
					{{form.status2.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text>详细地址</text>
				<input type="text" v-model="form.address" placeholder="请输入详细地址" />
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.remark" placeholder="请输入备注" />
			</view>
		</view>
		<w-picker mode="selector" @confirm="Confirm" ref="type2" :selectList="form.type2.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="Confirm1" ref="status2" :selectList="form.status2.list" themeColor="#f00">
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
				form: {
					name: '',
					jianname: '',
					bossname: '',
					phone: '',
					remark: '',
					address: '',
					type2: {
						value: '请选择',
						list: [{
							label: '索兰黛'
						}]
					},
					status2: {
						value: '请选择',
						list: [{
							label: '无'
						}]
					},
				}
			}
		},
		methods: {
			selectClick(e) {
                if(e==='type2'){
					this.$refs.type2.show()
				}else if(e==='status2'){
					this.$refs.status2.show()
				}
			},
			Confirm(e){
				this.form.type2.value=e.result
			},
			Confirm1(e){
				this.form.status2.value=e.result
			}
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
