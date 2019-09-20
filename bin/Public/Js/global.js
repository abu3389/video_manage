//获取验证码
function getCode(imgId,codeNum,codeImgWith,codeImgHeight){
   $("#"+imgId).attr("src","./index.php?m=Admin&c=Code&a=getCode&codeNum="+codeNum+"&codeImgWith="+codeImgWith+"&codeImgHeight="+codeImgHeight+"&id="+Math.random());
}
//设置cookie
function setCookie(name, value) {
            var exp = new Date();
            exp.setTime(exp.getTime() + 6 * 24 * 60 * 60 * 1000); //6天过期
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            return true;
        };
//读取cookie
function getCookie(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]); return null;
};
//添加编辑弹出层
function showBox(title,iframeWidth,iframeHeight,url,type,uid) {
	$.jq_Panel({
		title: title,
		iframeWidth: iframeWidth==''?500:iframeWidth,
		iframeHeight: iframeHeight==''?300:iframeHeight,
		url: url,
	});
}