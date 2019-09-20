//创建一个angular应用,
var app=angular.module("clientListModule",[]).controller();
//创建控制器
function ClientListController($http){
	self=this;
	this.http = $http;
	this.userid='';//用户ID
	this.username='';//用户名
	this.userpwd='';//密码
	this.userhead='';//用户头像
	this.userstate='';//用户状态
	this.regtime='';//注册时间
	this.clientlist=[];//用户列表初始化
	this.listnum=0;//初始化数据总条数
	this.keyword='';//用户搜索关键词框初始化
	this.getClientInfo(1);//初始化获取第一页
}
//设置获取用户信息表方法
ClientListController.prototype.getClientInfo = function(page){
	if(this.keyword!=''){
		//发送关键词搜索请求
		this.http.post("index.php?m=Admin&c=Client&a=getClient",{page_:page,keyword_:this.keyword.split(" ")}).success(function(response){
			if(response.errorCode == 10000){
	            self.showClientList(response);//显示用户列表
			}else{
				$.jq_Alert({message:"搜索用户请求失败！"});
			}
			console.log(response);
		})
	}else{
	    //发送员工信息请求包
		this.http.post("index.php?m=Admin&c=Client&a=getClient",{page_:page}).success(function(response){
			if(response.errorCode == 10000){
	            self.showClientList(response);//显示用户列表
	            // console.log(self.userlist);
			}else{
	            $.jq_Alert({message:"客户信息获取请求失败！"});
			}
			console.log(response);
		})
	}	
}
//设置更改用户状态方法
ClientListController.prototype.setClientState = function(userid,state){
	$.jq_Confirm({message:"确认是否改变该用户状态？",btnOkClick:function(){
		//判断锁定状态
	    if(state=="锁定"){
	    	state="false";
	    }else{
	        state="true";
	    }
	    console.log(userid,state);
	    //发送状态请求
		self.http.post("index.php?m=Admin&c=Client&a=setClientState",{user_id:userid,user_state:state}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data==true){
	                window.location.reload();//刷新员工列表页面
	            }
			}else{
				$.jq_Alert({message:"更改用户状态请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});	    
}
//设置重置密码方法
ClientListController.prototype.reSetClientPwd = function(userid){
	$.jq_Confirm({message:"确认是否重置该用户密码？",btnOkClick:function(){
	    //发送状态请求
		self.http.post("index.php?m=Admin&c=Client&a=reSetClientPwd",{user_id:userid}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data){
	                $.jq_Alert({message:"该用户密码已重置为："+response.data});
	            }
			}else{
				$.jq_Alert({message:"重置用户密码请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});	    
}
//设置调用弹窗方法
// ClientListController.prototype.showBox = function(title,iframeWidth,iframeHeight,url,uid){   
//     //判断是增加还是编辑
//     if(typeof(uid)!="undefined"){
//     	//存入本地存储
//     	window.localStorage.setItem("yk_edituid",uid);
//     }
//     parent.showBox(title,iframeWidth,iframeHeight,url);//显示弹窗
// }
//设置显示用户列表
ClientListController.prototype.showClientList=function (response){
	$("#page").html(response.data.page);
    self.clientlist=response.data.userlist;//获取用户列表
    var length=self.clientlist.length;
    for(var i=0;i<length;i++){
    	if(self.clientlist[i].user_state=="true"){
    		self.clientlist[i].user_state="锁定";
    	}else{
    		self.clientlist[i].user_state="解锁";
    	}
    }
    self.listnum=response.data.listnum;//获取数据条数统计
}
//设置分页跳转方法
function goToPage(page){
	//通过controller来获取Mymodule模块
	var element = document.querySelector('[ng-controller="ClientListController as ClientList"]');
	// console.log(element);
	//获取controller()控制器
	var con = angular.element(element).controller();
	// console.log(con);
	//调用angular内部方法
	con.getClientInfo(page);
}