<script>
	import request from './common/lib/request.js';
	import helper from './common/lib/helper.js';
	import utils from './common/lib/utils.js';
	import GoEasy from './common/js/goEasy/goeasy-1.0.3.js';
	
	export default {
		// 定义全局变量 (任何页面都可以获取和修改)
		globalData: {
			appName: "nvue测试名"
		},
		
		onLaunch: function() {
			// 在nvue uni-app编译模式下 因为无法挂载对象或方法到Vue原型上
			// 替代方案是 把对象或方法挂载在globalData上面 达到类似的全局使用效果
			var app = this.globalData;
			
			app.logo = "mp-logo"
			
			app.$api = request
			app.$help = helper
			app.utils = utils
			
			// 初始化全局的GoEasy对象
			app.goEasy = new GoEasy({
				host: "hangzhou.goeasy.io", // 应用所在的区域地址: 【hangzhou.goeasy.io | singapore.goeasy.io】
				appkey: "BC-d6c6d2c2b30d45298e709d6531e2848d", // 应用appkey
				onConnected: function() {
					console.log('连接成功！')
				},
				onDisconnected: function() {
					console.log('连接断开！')
				},
				onConnectFailed: function(error) {
					console.log('连接失败或错误！')
				}
			});
			
			// 登录权限跳转
			// 自定义一个跳转方法 挂载到Vue上，该跳转方法提供对登录权限的验证
			// 即跳转前判断用户是否处于登录状态: 已经登录就进行正常跳转，没有登录则提示并跳到登录页面 
			app.navigateTo = (options) => {
				// this.$store.commit('initUserStatus')
				// 判断用户是否登录
				if (!this.$store.state.user.loginStatus) {
					uni.showToast({title: '请先登录', icon: 'none'});
					return
					// return uni.navigateTo({url: '/pages/login/login'});
				}
				// 用户处于登录中 则正常跳转
				uni.navigateTo(options);
			}
			
			// 判断用户是否处于登录状态
			app.isLogin = () => {
				if (this.$store.state.user.loginStatus && this.$store.state.user.loginStatus === true) return true
				return false
			}
			
			
			console.log('App Launch')
			// app平台 则使用weex dom模块引入本地(网络)ttf资源
			// 非app平台 则在下面style里使用import方式引入本地css文件 (@import "./common/icon.css";)
			// #ifdef APP-PLUS
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {  
			    'fontFamily': "iconfont2",  
				// 'src': "url('https://at.alicdn.com/t/font_1494388_6p8busou8bx.ttf')"
				'src': "url('"+"file://" + plus.io.convertLocalFileSystemURL("_www/static/iconfont.ttf") +"')"
			});
			// #endif
			
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
			console.log('App Hide2')
		}
	}
</script>

<style>
	/* 每个页面公共css */
	/* 引入nvue专用的公共UI基础库 */
	@import "./common/zcm-main-nvue.css";
	
	/* #ifndef APP-PLUS */
	@import "./common/icon.css";
	/* #endif */
</style>


<!-- 
屏幕高度=状态栏高度+原生导航栏高度+可使用窗口高度+原生tabbar高度
H5端，windowHeight不包含NavigationBar和TabBar的高度，windowTop等于NavigationBar高度，windowBottom等于TabBar高度，statusBarHeight为0
APP端windowTop和windowBottom都是0，注意区分与H5端的差异 
 -->