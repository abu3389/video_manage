//创建一个angular应用,
var app=angular.module("AddAdminModule",[]).controller();
//创建控制器
function AddAdminController($http){
	self=this;
	this.http = $http;
	this.rolelist=[];//初始化角色列表
	this.username='';//初始化用户名
	this.oldusername='';//初始化旧用户名
	this.userpwd='';//初始化用户密码
	this.roleid="0";//初始化用户角色
	this.uid='';//初始化被编辑用户id
	this.getRoleInfo();//初始化获取角色信息
	this.getEditId();//初始化获取编辑用户
}
//设置获取角色信息方法
AddAdminController.prototype.getRoleInfo =function(){
    //请求角色信息
	this.http.post("index.php?m=Admin&c=User&a=getAllRole",{}).success(function(response){
		if(response.errorCode == 10000){
            self.rolelist=response.data;//加载角色列表
            console.log(response);
		}else{
            parent.$.jq_Alert({message:"登录信息获取请求失败！"});
		}
	})
}
//设置添加管理用户方法
AddAdminController.prototype.addAdminUser =function(){
    //构造用户信息包
    var userInfo={
    	user_name:this.username,
    	user_pwd:this.userpwd,
        role_id:this.roleid,
        user_head:"Public/Images/admin_head1.jpg",
    }
    //输入限制判断
    if(this.username=='' || this.userpwd=='' || this.roleid=="0"){
    	parent.$.jq_Alert({message:"必须填写完整！"});
        return;
    }else{
    	if(this.username.length>10){
           parent.$.jq_Alert({message:"用户名超过长度限制！"});
           return;
    	}
    	if(this.userpwd.length>16){
		   parent.$.jq_Alert({message:"密码超过长度限制！"});
           return;
    	}
    }
    console.log(userInfo);
    //发送添加用户信息请求
	this.http.post("index.php?m=Admin&c=User&a=addAdminUser",{userInfo}).success(function(response){
		if(response.errorCode == 10000){
			switch(response.data){
				case "1":
				parent.$.jq_Alert({message:"添加成功！"});
				//关闭窗口
				parent.$.jq_Panel_close();
				break;
				case "2":
				parent.$.jq_Alert({message:"已存在该用户,请重新添加！"});
				self.username='';//初始化用户名
				break;
			}
            console.log(response);
		}else{
			parent.$.jq_Alert({message:"添加用户请求失败！"});
		}
	})    
}
//设置修改管理用户方法
AddAdminController.prototype.editAdminUser =function(){
    //构造用户信息包
    var userInfo={
    	user_id:this.uid,
    	user_name:this.username,
    	user_oldname:this.oldusername,
        role_id:this.roleid,
    }
    //输入限制判断
    if(this.username=='' || this.roleid=="0"){
    	parent.$.jq_Alert({message:"必须填写完整！"});
        return;
    }else{
    	if(this.username.length>10){
           parent.$.jq_Alert({message:"用户名超过长度限制！"});
           return;
    	}
    }
    console.log(userInfo);
    //发送修改用户信息请求
	this.http.post("index.php?m=Admin&c=User&a=editAdminUser",{userInfo}).success(function(response){
		if(response.errorCode == 10000){
			switch(response.data){
				case "1":
				parent.$.jq_Alert({message:"修改成功！"});
				//关闭窗口
				parent.$.jq_Panel_close();
				break;
				case "2":
				parent.$.jq_Alert({message:"已存在该用户名,请重新修改！"});
				self.username='';//初始化用户名
				break;
			}
            console.log(response);
		}else{
			parent.$.jq_Alert({message:"修改用户请求失败！"});
		}
	})    
}
//设置获取用户id并请求获取用户信息
AddAdminController.prototype.getEditId =function(){
   //获取本地存储用户id
   if(window.localStorage.getItem("yk_edituid")){
        var uid=window.localStorage.getItem("yk_edituid");
        this.uid=uid;
	    //发送获取用户信息请求
		this.http.post("index.php?m=Admin&c=User&a=getAdminUserOne",{uid}).success(function(response){
			if(response.errorCode == 10000){
                self.username=response.data.user_name;//显示用户名
	            self.roleid=response.data.role_id;//显示角色id
	            self.oldusername=response.data.user_name;//获取原先用户名
	            window.localStorage.removeItem("yk_edituid");//删除本地存储
			}else{
				parent.$.jq_Alert({message:"获取用户信息请求失败！"});
			}
			console.log(response);
		})            
    }
}

