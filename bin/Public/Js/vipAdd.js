//创建一个angular应用,
var app=angular.module("AddVipModule",[]).controller();
//创建控制器
function AddVipController($http){
	self=this;
	this.http = $http;
	this.vipname='';//初始化VIP等级名称
	this.viptime='';//初始化VIP时效
	this.vipcost='';//初始化VIP费用
	this.viptype=''//初始化VIP类型
	this.vipid=''//初始化VIPid
	this.getEditId();//初始化获取编辑VIP等级id
}
//设置VIP等级添加方法
AddVipController.prototype.addVip=function(){
	//输入限制判断
	if(this.vipname=='' || this.viptime=='' || this.vipcost=='' || this.viptype==''){
        parent.$.jq_Alert({message:"必须填写完整！"});
        return;
	}
	//构造VIP等级信息包
    var vipInfo={
    	vip_name:this.vipname,
		vip_time:this.viptime,
		vip_cost:this.vipcost,
		vip_type:this.viptype,
    }
	//发送VIP等级添加请求
	this.http.post("index.php?m=Admin&c=Client&a=addVip",{vipInfo}).success(function(response){
		if(response.errorCode == 10000){
            parent.$.jq_Alert({message:"添加VIP等级成功！",btnOkClick:function(){
            	//关闭窗口
		        parent.$.jq_Panel_close();
		        //刷新资源列表
                parent.document.getElementById("iframeRight").contentWindow.location.reload(true);
            }});
		}else{
			parent.$.jq_Alert({message:"添加VIP等级失败！"});
		}
		console.log(response);
	})	
}
//设置VIP等级修改方法
AddVipController.prototype.editVip=function(){
	//输入限制判断
	if(this.vipname=='' || this.viptime=='' || this.vipcost=='' || this.viptype==''){
        parent.$.jq_Alert({message:"必须填写完整！"});
        return;
	}
    //发送修改VIP等级请求
	this.http.post("index.php?m=Admin&c=Client&a=editVip",{vip_id:this.vipid,vip_name:this.vipname,vip_time:this.viptime,vip_cost:this.vipcost,vip_type:this.viptype}).success(function(response){
		if(response.errorCode == 10000){
			parent.$.jq_Alert({message:"VIP等级修改成功！",btnOkClick:function(){
            	//关闭窗口
		        parent.$.jq_Panel_close();
		        //刷新资源列表
                parent.document.getElementById("iframeRight").contentWindow.location.reload(true);
			}});		   
		}else{
			parent.$.jq_Alert({message:"修改VIP等级请求失败！"});
		}
		console.log(response);
	})
}
//设置获取编辑VIP等级id
AddVipController.prototype.getEditId =function(){
   //获取本地存储VIP等级id
   if(window.localStorage.getItem("yk_editvipid")){
   	    //获取本地存储角色信息和编辑类型
        var vInfo=JSON.parse(window.localStorage.getItem("yk_editvipid"));
        this.vipid=vInfo.vip_id;//获取VIP等级id
        this.vipname=vInfo.vip_name;//获取VIP等级名称
        this.viptime=Number(vInfo.vip_time);//获取时效
        this.vipcost=Number(vInfo.vip_cost);//获取费用
        this.viptype=vInfo.vip_type;//获取VIP类型
        window.localStorage.removeItem("yk_editvipid");//删除本地存储            
    }
}