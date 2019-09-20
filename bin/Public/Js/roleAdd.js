//创建一个angular应用,
var app=angular.module("AddRoleModule",[]).controller();
//创建控制器
function AddRoleController($http){
	self=this;
	this.http = $http;
	this.rolelist=[];//初始化角色列表
	this.menulist=[];//初始化菜单列表
	this.zNodes=[];//初始化树状菜单数据
	this.checkedList=[];//初始化菜单树选择结果
	this.rolename='';//初始化角色名
	this.rolepow='';//初始化角色权限
	this.rid='';//初始化被编辑角色id
	this.tag=''//初始化显示div标记
	this.getEditId();//初始化获取被编辑角色id
	this.getRoleMenu();//初始化获取权限菜单
}
//设置添加角色方法
AddRoleController.prototype.addAdminRole =function(){
	//获取菜单树勾选值并转化为存储数据
    this.getzTreeValue();
    //输入限制判断
    if(this.rolename==''){
    	parent.$.jq_Alert({message:"必须填写完整！"});
        return;
    }else{
    	if(this.rolename.length>10){
           parent.$.jq_Alert({message:"角色名超过长度限制！"});
           return;
    	}
    	if(this.rolepow==''){
           parent.$.jq_Alert({message:"必须设置角色权限！"});
           return;
    	}
    }
    //构造角色信息包
    var roleInfo={
    	role_name:this.rolename,
        role_pow:this.rolepow,
    }
    // console.log(roleInfo);
    //发送添加角色信息请求
	this.http.post("index.php?m=Admin&c=User&a=addAdminRole",{roleInfo}).success(function(response){
		if(response.errorCode == 10000){
			parent.$.jq_Alert({message:"添加用户成功！"});
			//关闭窗口
			parent.$.jq_Panel_close();
		}else{
			parent.$.jq_Alert({message:"添加用户请求失败！"});
		}
		console.log(response);
	})    
}
//设置修改角色信息方法
AddRoleController.prototype.editAdminRole =function(){
	switch(this.tag){
       case "editname":
       //发送修改角色名请求
       this.editRoleName();
       break;
       case "editpow":
       //发送修改角色权限请求
       this.editRolePow();
       break;
	}
}
//设置修改角色名方法
AddRoleController.prototype.editRoleName=function(){
    //输入限制判断
    if(this.rolename==''){
    	parent.$.jq_Alert({message:"角色名不能为空！"});
        return;
    }else{
    	if(this.rolename.length>10){
           parent.$.jq_Alert({message:"角色名超过长度限制！"});
           return;
    	}
    }
    //发送修改角色名请求
	this.http.post("index.php?m=Admin&c=User&a=editAdminRole",{role_id:this.rid,role_name:this.rolename}).success(function(response){
		if(response.errorCode == 10000){
			parent.$.jq_Alert({message:"修改角色名成功！"});
			//关闭窗口
			parent.$.jq_Panel_close();   
		}else{
			parent.$.jq_Alert({message:"修改角色名请求失败！"});
		}
		console.log(response);
	})
}
//设置修改角色权限方法
AddRoleController.prototype.editRolePow =function(){
	//获取菜单树勾选值并转化为存储数据
    this.getzTreeValue();
    //输入限制判断
	if(this.rolepow==''){
       parent.$.jq_Alert({message:"必须设置角色权限！"});
       return;
	}
    //发送修改角色权限请求
	this.http.post("index.php?m=Admin&c=User&a=editAdminRole",{role_id:this.rid,role_pow:this.rolepow}).success(function(response){
		if(response.errorCode == 10000){
			parent.$.jq_Alert({message:"角色权限修改成功！"});
			//关闭窗口
			parent.$.jq_Panel_close();    
		}else{
			parent.$.jq_Alert({message:"修改角色权限请求失败！"});
		}
		console.log(response);
	})    
}
//设置获取编辑角色id
AddRoleController.prototype.getEditId =function(){
   //获取本地存储用户id
   if(window.localStorage.getItem("yk_editrinfo")){
   	    //获取本地存储角色信息和编辑类型
        var rInfo=JSON.parse(window.localStorage.getItem("yk_editrinfo"));
        this.tag=rInfo.type;//获取编辑类型
        this.rid=rInfo.roleInfo.role_id;//获取角色id
        this.rolepow=rInfo.roleInfo.role_pow//获取权限信息
        this.rolename=rInfo.roleInfo.role_name//获取角色名
        window.localStorage.removeItem("yk_editrinfo");//删除本地存储            
    }
}
//获取菜单树勾选值并转化为存储数据
AddRoleController.prototype.getzTreeValue=function(){
	//获取菜单树选择结果
	this.checkedList = $.fn.zTree.getZTreeObj("treeDemo").getCheckedNodes();
	//循环获取选择结果中的菜单id
	var listid=[];
	$.each(this.checkedList,function(index,item){
        listid.push(item.id);
	});
	this.rolepow=listid.join(',');//通过,连接组合成字符串	
}
//设置获取权限菜单方法
AddRoleController.prototype.getRoleMenu=function(){
	//判断是否为编辑姓名，不获取权限菜单，阻止获取不到权限菜单标签报错
	if(this.tag=='editname'){
		return;
	}
	//发送获取权限菜单请求
	this.http.post("index.php?m=Admin&c=User&a=getAllMenu",{}).success(function(response){
		if(response.errorCode == 10000){
			self.menulist=response.data;//获取菜单数组
			//循环菜单数组，转换菜单树格式
            $.each(self.menulist,function(index,item){
            	var objNode={
                    id:item.menu_id,
                    pId:item.parent_id,
                    name:item.menu_name,
                    open:true,
            	}
                self.zNodes.push(objNode);//追加进zNodes数组
            });
            //传入节点数据，显示树状菜单
            self.showTree(self.zNodes);
            //判断编辑类型，如果为权限编辑则打钩显示原来的数据
            if(self.tag=="editpow"){
                //获取用户权限并分割成数组
            	self.checkedList=self.rolepow.split(',');
            	//循环权限数组显示原有权限
            	var zTree=$.fn.zTree.getZTreeObj("treeDemo");
            	$.each(self.checkedList,function(index,item){
                    var node = zTree.getNodeByParam("id",item);//获取节点
            	    zTree.checkNode(node,true,true);//设置节点选中
            	});	
            }
		}else{
			parent.$.jq_Alert({message:"获取权限菜单请求失败！"});
		}
		console.log(response);
	});
}
/**
 * 显示树状菜单
 * @param  {[array]} zNodes [树状菜单节点数据]
 * @return {[type]}        [description]
 */
AddRoleController.prototype.showTree=function(zNodes){
	$(document).ready(function(){
			var setting = {
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				}
		    };
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);//初始化并加载树状菜单
			setCheck("p","s","p","s");//设置树状菜单勾选方法（此设置为父子节点互相关联）
	});
}
/**
 * 设置树状菜单勾选方法
 * @param {[string]} py [子节点被勾选时，关联父节点,传入固定字符p开启]
 * @param {[string]} sy [父节点被勾选时，关联子节点,传入固定字符s开启]
 * @param {[string]} pn [子节点取消勾选时，关联父节点,传入固定字符p开启]
 * @param {[string]} sn [父节点取消勾选时，关联子节点,传入固定字符s开启]
 */
function setCheck(py,sy,pn,sn) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	type = { "Y":py + sy, "N":pn + sn};
	zTree.setting.check.chkboxType = type;
}

//zNodes数据格式参考
// var zNodes =[
// 	{ id:1, pId:0, name:"随意勾选 1", open:true},
// 	{ id:11, pId:1, name:"随意勾选 1-1", open:true},
// 	{ id:111, pId:11, name:"随意勾选 1-1-1"},
// 	{ id:112, pId:11, name:"随意勾选 1-1-2"},
// 	{ id:12, pId:1, name:"随意勾选 1-2", open:true},
// 	{ id:121, pId:12, name:"随意勾选 1-2-1"},
// 	{ id:122, pId:12, name:"随意勾选 1-2-2"},
// 	{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
// 	{ id:21, pId:2, name:"随意勾选 2-1"},
// 	{ id:22, pId:2, name:"随意勾选 2-2", open:true},
// 	{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},

// ];
		
		
