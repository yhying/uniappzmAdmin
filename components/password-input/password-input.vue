<template>
	<view class="box">
		<view :class="['item',list.length===index?'fakecursor':'']" v-for="(item,index) in length" :key="item" :style="{margin:formatMargin(gutter)}">
			<view :class="['circle',(index<list.length)?'dot':'']"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			length:{//长度只允许为6和4
				type:Number,
				default:6,
				validator(val){
					if(val!==6 && val !==4){
						return false;
					}
					return true;
				}
			},
			gutter:{
				type:Number,
				default:0
			},
			list:{
				type:Array,
				default:function(){
					return [];
				}
			}
		},
		data() {
			return {
			};
		},
		computed:{
			
		},
		methods:{
			formatMargin(gutter){
				return 0 + ' ' + gutter+'rpx';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #F5F5F5;
		padding: 20rpx;
		display: flex;
		.item{
			position: relative;
			background-color: #FFFFFF;
			height: 100rpx;
			flex-grow: 1;
			flex-shrink: 0;
			border: 1px solid #F5F5F5;
			display: flex;
			justify-content: center;
			align-items: center;
			.circle{
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background-color: #fff;
				&.dot{
					background-color: #000;
				}
			}
		}
	}

	.fakecursor::after {
		content: '';
		display: block;
		width: 1px;
		height: 32rpx;
		animation: blink 1s infinite steps(1, start);
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -16rpx;
	}

	@keyframes blink {
		0% {
			background-color: white;
		}

		50% {
			background-color: black;
		}

		100% {
			background-color: white;
		}
	}
</style>
