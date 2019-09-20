//创建一个angular应用,
var app=angular.module("AdminRoleModule",[]).controller();
//创建控制器
function AdminRoleController($http){
	self=this;
	this.http = $http;
	this.roleid='';//初始化角色id
    this.rolename='';//初始化角色名
	this.rolelist=[];//初始化角色数组
	this.listnum='0';//初始化角色总条数
	this.getRoleInfo(1);//初始化获取角色信息
}
//设置获取角色列表方法
AdminRoleController.prototype.getRoleInfo = function(page){
//发送获取角色列表请求
	this.http.post("index.php?m=Admin&c=User&a=getRoleInfo",{page_:page}).success(function(response){
		if(response.errorCode == 10000){
            self.rolelist=response.data.rolelist;//获取角色列表
            $("#page").html(response.data.page);
            self.listnum=response.data.listnum;//获取数据条数统计
            // console.log(self.rolelist);
            
		}else{
            $.jq_Alert({message:"角色信息获取请求失败！"});
		}
		console.log(response);
	})	
}
//设置删除角色方法
AdminRoleController.prototype.delAdminRole=function(rid){
   	$.jq_Confirm({message:"确认是否删除该角色？",btnOkClick:function(){
	    //发送删除角色请求
		self.http.post("index.php?m=Admin&c=User&a=delAdminRole",{role_id:rid}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data==true){
	                window.location.reload();//刷新角色列表页面
	            }
			}else{
				$.jq_Alert({message:"删除角色请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});
}
//设置调用弹窗方法
AdminRoleController.prototype.showBox = function(title,iframeWidth,iframeHeight,url,roleInfo,type){   
    //判断是增加还是编辑
    if(typeof(roleInfo)!="undefined" && typeof(type)!="undefined"){
        //存入本地存储
 	    window.localStorage.setItem("yk_editrinfo",JSON.stringify({roleInfo:roleInfo,type:type}));
    }
    parent.showBox(title,iframeWidth,iframeHeight,url);//显示弹窗
}
//设置分页跳转方法
function goToPage(page){
	//通过controller来获取Mymodule模块
	var element = document.querySelector('[ng-controller="AdminRoleController as AdminRole"]');
	// console.log(element);
	//获取controller()控制器
	var con = angular.element(element).controller();
	// console.log(con);
	//调用angular内部方法
	con.getRoleInfo(page);
}