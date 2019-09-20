//获取验证码
getCode("loginCodeImg","4","100","32");
//创建一个angular应用,
var app=angular.module("LoginModule",[]).controller();
//创建控制器
function LoginController($http){
	this.http = $http;
	this.username='';//用户名
	this.userpwd='';//密码
	this.code='';//验证码
}
//设置发送登录包方法
LoginController.prototype.loginCheck = function(){
	//获取验证码标识
    var codetag=$("#loginCodeImg").attr("src").split("=")[$("#loginCodeImg").attr("src").split("&").length];
	//创建登录包
	var loginbag={
		username_:this.username,
		userpwd_:this.userpwd,
		code_:this.code,
		codetag_:codetag,
	}
	//发送登录包
	this.http.post("index.php?m=Admin&c=User&a=loginCheck",loginbag).success(function(response){
		if(response.errorCode == 10000){
			switch(response.data){
				case "010":
                // alert("登陆成功！");
                location.reload();//刷新页面
                console.log(getCookie('admin_nowuser'));
                break;
                case "011":
                $.jq_Alert({message:"验证码错误！"});
                break;
                case "012":
                $.jq_Alert({message:"用户名或密码错误！"});
                break;
                case "013":
                $.jq_Alert({message:"用户已被锁定，暂时无法登录！"});
                break;
			}
		}else{
			alert("登录请求失败");
		}
	})	
}