<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			uni.setStorage({
				key: 'interface',
				// 测试
				data: 'http://saas.api.wdtest.com/',
				// 正式
				// data: 'http://saas.api.suolandai.cn/',
				success: function() {}
			});
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	uni-toast {
		z-index: 999999;
	}
	/*每个页面公共css */
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

@font-face {
  font-family: 'iconfont';  /* project id 1451972 */
  src: url('//at.alicdn.com/t/font_1451972_q96ctutw17.eot');
  src: url('//at.alicdn.com/t/font_1451972_q96ctutw17.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1451972_q96ctutw17.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1451972_q96ctutw17.woff') format('woff'),
  url('//at.alicdn.com/t/font_1451972_q96ctutw17.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1451972_q96ctutw17.svg#iconfont') format('svg');
}

	uni-page-head {
		.uni-page-head__title {
			font-weight: normal;
		}
	}
    uni-page-head .uni-page-head {
		padding: 14upx 20upx 14upx 6upx;
	}
	uni-button {
		background-color: #FFFFFF;
	}

	.button-hover {
		background-color: transparent;
	}

	.popup {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.6) none repeat scroll 0 0;
		z-index: 9999;
	}

	.disnone {
		display: none;
	}

	uni-radio {
		.uni-radio-input {
			width: 30upx;
			height: 30upx;

			&.uni-radio-input-checked {
				background-color: #ff6699 !important;
				border-color: #ff6699 !important;

				&:before {
					font-size: 30upx;
				}
			}
		}
	}
	
</style>
