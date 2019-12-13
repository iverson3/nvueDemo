export default {
	onLoad: function() {
		// #ifdef APP-PLUS
		const domModule = weex.requireModule('dom')
		domModule.addRule('fontFace', {  
		    'fontFamily': "iconfont2",  
			'src': "url('https://at.alicdn.com/t/font_1494388_6p8busou8bx.ttf')"
			// 'src': "url('"+"file://" + plus.io.convertLocalFileSystemURL("_www/static/iconfont.ttf") +"')"
		});
		// #endif
	}
}