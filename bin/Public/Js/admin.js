//创建一个angular应用,
var app=angular.module("AdminModule",[]).controller();
//创建控制器
function AdminController($http){
	self=this;
	this.http = $http;
	this.username='';//初始化用户昵称
	this.userhead='';//初始化用户头像
    this.rolename='';//用户身份权限
	this.menulist=[];//初始化菜单数组
	this.getLoginInfo();//初始化获取session
}
//设置获取session登录信息方法
AdminController.prototype.getLoginInfo = function(){
	//发送登录包
	this.http.post("index.php?m=Admin&c=User&a=loginGet",{}).success(function(response){
		if(response.errorCode == 10000){
			self.username=response.data.nowUserName;//加载用户名
			self.userhead=response.data.nowUserHead;//加载头像
            self.rolename=response.data.nowUserRole.role_name;//加载用户身份
            //对菜单列表重新排序归属
            var amenu=response.data.menuList;
            for(var i=0;i<amenu.length;i++){
            	var menuObj=[];//创建临时数组
            	//查找一级菜单
                if(amenu[i].parent_id=="0"){
                	menuObj.push(amenu[i]);//追加一级菜单进临时数组
                	//查找二级菜单
                    for(var j=0;j<amenu.length;j++){
                   	    if(amenu[i].menu_id==amenu[j].parent_id){
                            menuObj.push(amenu[j]);//追加二级菜单进临时数组
                   	    }
                    }
                    self.menulist.push(menuObj);//追加临时数组进新数组
                }
            }
            // console.log(self.menulist);
            console.log(response);
		}else{
            $.jq_Alert({message:"登录信息获取请求失败！"});
		}
	})	
}