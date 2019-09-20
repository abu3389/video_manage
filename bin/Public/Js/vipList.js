//创建一个angular应用,
var app=angular.module("AdminVipModule",[]).controller();
//创建控制器
function AdminVipController($http){
	self=this;
	this.http = $http;
	this.viplist=[];//初始化等级数组
	this.listnum="0";//初始化条数统计
	this.getVipInfo(1);//初始化获取VIP等级信息
}
//设置获取VIP等级列表方法
AdminVipController.prototype.getVipInfo = function(page){
    //发送获取VIP等级列表请求
	this.http.post("index.php?m=Admin&c=Client&a=getVipInfo",{page_:page}).success(function(response){
		if(response.errorCode == 10000){
            self.viplist=response.data.viplist;//获取VIP等级列表
            $("#page").html(response.data.page);
            self.listnum=response.data.listnum;//获取数据条数统计
            // console.log(self.rolelist);
            
		}else{
            $.jq_Alert({message:"VIP等级获取请求失败！"});
		}
		console.log(response);
	})	
}
//设置VIP等级删除方法
AdminVipController.prototype.delVip=function(vipid){
	$.jq_Confirm({message:"确认是否删除该VIP等级？",btnOkClick:function(){
	    //发送删除VIP等级请求
		self.http.post("index.php?m=Admin&c=Client&a=delVip",{vip_id:vipid}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data==true){
	                window.location.reload();//刷新资源列表页面
	            }
			}else{
				$.jq_Alert({message:"删除资源请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});	 	
}
//设置调用弹窗方法
AdminVipController.prototype.showBox = function(title,iframeWidth,iframeHeight,url,vipid){   
    //判断是增加还是编辑
    if(typeof(vipid)!="undefined"){
    	//存入本地存储
    	window.localStorage.setItem("yk_editvipid",JSON.stringify(vipid));
    }
    parent.showBox(title,iframeWidth,iframeHeight,url);//显示弹窗
}
//设置分页跳转方法
function goToPage(page){
	//通过controller来获取Mymodule模块
	var element = document.querySelector('[ng-controller="AdminVipController as AdminVip"]');
	// console.log(element);
	//获取controller()控制器
	var con = angular.element(element).controller();
	// console.log(con);
	//调用angular内部方法
	con.getVipInfo(page);
}