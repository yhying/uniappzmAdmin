<template>
	<view>
		<!-- 搜索条 -->
		<view class="search searchTopBox">
			<i class="iconfont">&#xe619;</i>
		  <input type="search" class="input searchBoxIpt" v-model="ipt" @confirm="searchNow($event)"  @blur="open()" @focus="close()"
		  placeholder="会员名、手机号和会员编号"/>
			<!-- <text @tap="toback(aa)">取消</text> -->
			<!-- <text @tap="toopen()" v-show="true" class="quxiao">确定</text> -->
		</view>
		<!-- 搜索历史 -->
		<!-- <view class="searchBotBox">
			<view class="ov">
				<view class="fl">历史记录</view>
				<view @tap="clearKey" class="fr grace-more-r grace-search-remove"></view>
			</view>
			<view class="searchHistoryBox">
				
				<view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' v-if="show" >
					{{item}}
					<i class="iconfont" @tap="clear(item,index)">&#xe617;</i>
				</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		props:['aa'],
		data() {
			return {
				searchKey: ['15870256399','索兰黛','SLD0001'],
				ipt: '',
				searchClose: true,
				show:true,
				clearindex:' ',
				searchValue:'',
			}
		},
		onReady() {
			var vv = uni.getStorageSync('searchLocal');
			var arr = vv.split("-");
			this.searchKey = arr;
		},
		methods: {

			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];
							uni.setStorage({
								key: 'searchLocal',
								data: that.searchKey
							});
							
						} else if (res.cancel) {

						}
					}
				});

			},
			searchNow: function(e) {
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				var that = this;
				var newArr = that.searchKey;
				newArr.push(this.ipt);
				this.searchKey = newArr;
				var newStr = newArr.join('-');
				uni.setStorage({
					key: 'searchLocal',
					data: newStr
				});
			},
			clear(item,index){
				console.log(index)
				console.log(item)
				this.clearindex=index;
				console.log(this.searchKey)
				
			},
            open(){
				this.searchValue=0;
				// console.log(this.searchValue)
				this.$emit('func',this.searchValue,this.ipt)
			    console.log(this.ipt)
			},
			close(){
				this.searchValue=1;
				this.$emit('func',this.searchValue)
			}
		}
	}
</script>
<style lang="less">
	   .search {
	   		 margin:20upx 0 20upx 0;
	   		 width: 600upx;
	   		 height: 70upx;
	         line-height: 70upx;
	   		 text-indent: 2em;
	   		 background-color:#F8F8F8;
	   		 margin-left: 40upx;
	   		 position:relative;
	   		 i:first-child{
	   			 position: absolute;
	   			 top: 6upx;
	   			 left: -55upx;
	   			 font-size: 45upx;
	   		 }
	   		  i:last-child{
	   			 position: absolute;
	   			 top: 0;
	   			 right: -71upx;
	   			 font-size: 54upx;
	   			 color:#ff0066 ;
	   		 }
	   		 .input{
	   			  height: 100%;
	   			  font-size: 24upx;  
	   		 }
	   }
	   .searchBotBox {
		   margin-left: 40upx;
		   
		   .fl {
		   	  font-size: 22upx !important;
		   		  margin: 30upx 0;
		   }
		    .searchHistoryBox {
				flex-wrap: wrap;
				display: flex;
				.searchHistoryBoxItem{
				   position: relative;
				   width: 180upx;
				   height: 50upx;
				   border: 1px solid #eee;
				   text-align: center;
				   line-height: 50upx;
				   color: #ccc;
				   font-size:24upx;
				   border-radius: 10upx;
				   margin-right: 52upx;
				   margin-bottom: 20upx;
				   i {
					   position: absolute;
					   top: -20upx;
					   right: -20upx;
					   font-size: 30upx;
				   }
				   }
				 .searchHistoryBoxItem:nth-child(3n){
					 margin-right: 0;
				 }
			}
	   }

</style>
