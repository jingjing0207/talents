(function(){
	function resizeBaseFontSize(){
		var rootHtml = document.documentElement,
			deviceWidth = rootHtml.clientWidth;
			
		if(deviceWidth > 640){
			deviceWidth = 640;
		}
		
		rootHtml.style.fontSize = deviceWidth / 7.5 + "px";
	}
	
	resizeBaseFontSize();
	
	window.addEventListener("resize", resizeBaseFontSize, false);
	window.addEventListener("orientationchange", resizeBaseFontSize, false);
	
	// 取消浏览器默认事件 
	document.addEventListener('touchstart',function(){
	    return false;
	},true);
}())
