<script>
	export default {
		// 定义全局变量 (任何页面都可以获取和修改)
		globalData: {
			appName: "nvue测试名"
		},
		
		onLaunch: function() {
			console.log('App Launch')
			
			uni.getSystemInfoSync({
				success: (res) => {
					console.log(res);
				},
				fail: (err) => {
					console.log(err);
				}
			})
			
			// 获取当前设备网络状态
			uni.getNetworkType({
				success: (res) => {
					uni.showToast({title: res.networkType, icon: 'none'});
				},
				fail: (err) => {
					console.log('getNetworkType fail');
				}
			})
			
			// #ifdef APP-PLUS
			// 监听网络状态的变化
			plus.globalEvent.addEventListener('netchange', () => {
				// 获取设备当前的网络状态 plus.networkinfo.getCurrentType() 或 plus.networkinfo.CONNECTION_TYPE
				let netStatus = plus.networkinfo
				switch(netStatus.CONNECTION_TYPE) {
					case netStatus.CONNECTION_NONE:
						plus.nativeUI.toast('没有网络');
						break;
					case netStatus.CONNECTION_WIFI:
						plus.nativeUI.alert('wifi');
						break;
					case netStatus.CONNECTION_CELL4G:
						plus.nativeUI.alert('4G');
						break;
					case netStatus.CONNECTION_CELL3G:
						plus.nativeUI.alert('3G');
						break;
					case netStatus.CONNECTION_CELL2G:
						plus.nativeUI.alert('2G');
						break;
					case netStatus.CONNECTION_ETHERNET:
						plus.nativeUI.alert('有线网络');
						break;
					case netStatus.CONNECTION_UNKNOW:
						plus.nativeUI.alert('网络状态未知');
						break;
					default:
						plus.nativeUI.alert('网络状态未知');
						break;
				}
			})
			// #endif
			// #ifndef APP-PLUS
			uni.onNetworkStatusChange((res) => {
				console.log(res.isConnected);
				console.log(res.networkType);
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面公共css */
	/* 引入nvue专用的公共UI基础库 */
	@import "./common/zcm-main-nvue.css";
	
	/* 非app平台 使用下面的方式引入ttf文件 */
	/* app平台 则在mixin-importIcon中使用weex dom模块引入网络ttf资源 */
	/* #ifndef APP-PLUS */
	@import "./common/icon.css";
	/* #endif */
</style>


<!-- 
屏幕高度=状态栏高度+原生导航栏高度+可使用窗口高度+原生tabbar高度
H5端，windowHeight不包含NavigationBar和TabBar的高度，windowTop等于NavigationBar高度，windowBottom等于TabBar高度，statusBarHeight为0
APP端windowTop和windowBottom都是0，注意区分与H5端的差异 
 -->