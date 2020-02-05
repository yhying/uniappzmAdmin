<template>
	<view class="page">
		<view class="form">
			<view class="input">
				<text class="important">姓名</text>
				<input type="text" v-model="form.name" placeholder="请输入..." />
			</view>
			<view class="input">
				<text class="important">花名</text>
				<input type="text" v-model="form.jianname" placeholder="请输入..." />
			</view>
			<view class="input">
				<text class="important">性别</text>
				<view class="select sex">
					<radio-group @change="sexRadioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in form.sex.items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === form.sex.current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="input">
				<text class="important">手机号</text>
				<input type="text" v-model="form.phone" maxlength="11" placeholder="请输入..." />
			</view>
			<view class="input">
				<text class="important">登录密码</text>
				<input type="text" v-model="form.password" maxlength="11" minlength="6" placeholder="请输入..." />
			</view>
			<view class="input">
				<text class="important">所属门店</text>
				<view class="select" @click="selectClick('shop')">
					{{form.shop.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">权限组</text>
				<view class="select" @click="selectClick('quanxian')">
					{{form.quanxian.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">入职时间</text>
				<view class="select" @click="selectClick('job')">
					{{form.job.value}}
					<image src="../../static/member/select-right-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="input">
				<text class="important">负责人</text>
				<input type="text" v-model="form.bossname" placeholder="请输入..." />
			</view>
			<view class="input">
				<text>备注</text>
				<input type="text" v-model="form.remark" placeholder="请输入备注" />
			</view>
		</view>
		<w-picker mode="selector" @confirm="Confirm" ref="shop" :selectList="form.shop.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="Confirm1" ref="qaunxian" :selectList="form.quanxian.list" themeColor="#f00">
		</w-picker>
		<w-picker mode="date" startYear="1880" endYear="2030" :defaultVal="[0,0,0]" :current="true" @confirm="birthdayConfirm"
		 ref="range" themeColor="#f00"></w-picker>
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
					shop: {
						value: '请选择',
						list: [{
							label: '厦门店'
						}]
					},
					quanxian: {
						value: '请选择',
						list: [{
							label: '无'
						}]
					},
					job: {
						value: '请选择',
						list: [{
							label: '无'
						}]
					},
					sex: {
						items: [{
								value: '1',
								name: '男'
							},
							{
								value: '2',
								name: '女',
								checked: 'true'
							},
							{
								value: '0',
								name: '未知'
							}
						],
						current: 2
					}
				}
			}
		},
		methods: {
			selectClick(e) {
                if(e==='shop'){
					this.$refs.shop.show()
				}else if(e==='quanxian'){
					this.$refs.qaunxian.show()
				}else if(e==='job'){
					this.$refs.range.show()
				}
			},
			Confirm(e){
				this.form.shop.value=e.result
			},
			Confirm1(e){
				this.form.quanxian.value=e.result
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

</style>
