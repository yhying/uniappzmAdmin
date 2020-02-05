<template>
	<view class="async-switch">
		<switch :checked="checked" :disabled="disabled" :color="changeColor" />
		<button @click="onChange"></button>
	</view>
</template>

<script>
	export default {
		name:'async-switch',
		props:{
			checked: {
				type: Boolean,
				default: false
			},
			disabled:{
				type: Boolean,
				default: false
			},
			color:{
				type:String,
				default:'#007aff'
			},
			disabledColor:{
				type:String,
				default:'#e5e5e5'
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			changeColor(){
				return (this.disabled ? this.disabledColor : this.color)
			}
		},
		methods:{
			onChange(){
				/* 禁用状态不返回事件 */
				if(this.disabled){
					return;
				}
				this.$emit("change");
			}
		}
	}
</script>

<style scoped lang="scss">
.async-switch{
	display: inline-block;
	position: relative;
	
	&>switch{
		margin: 0;
	}
	&>button{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
