//创建一个angular应用,
var app=angular.module("videoClassifyModule",[]).controller();
//创建控制器
function videoClassController($http){
	self=this;
	this.http = $http;
	this.classlist=[];//初始化分类菜单数组
	this.zNodes=[];//初始化树状菜单数据
    this.getClassifyInfo();//初始化获取分类数据
    this.classifyname=''//初始化分类名
    this.rankVal='';//初始化一级分类选择值
    this.parentList=[];//初始化上级分类选项
    this.parentVal='';//初始化上级分类选择值
    this.brotherList=[];//初始化前置分类选项
    this.brotherVal='';//初始化前置分类选择值
}
//设置获取分类信息方法
videoClassController.prototype.getClassifyInfo = function(){
	//发送获取分类信息请求
	this.http.post("index.php?m=Admin&c=Source&a=getClassify",{}).success(function(response){
		if(response.errorCode == 10000){
            //对分类列表重新排序归属
            self.aclassify=response.data;
			//循环菜单数组，转换菜单树格式
            $.each(self.aclassify,function(index,item){
            	var objNode={
                    id:item.classify_id,
                    pId:item.parent_id,
                    name:item.classify_name,
                    open:true,
            	}
                self.zNodes.push(objNode);//追加进zNodes数组
            });
            //传入节点数据，显示树状菜单
            self.showTree(self.zNodes);
            // console.log(self.zNodes);

		}else{
            $.jq_Alert({message:"分类信息获取请求失败！"});
		}
		console.log(response);
	})
}
//设置分类级别下拉框改变事件
videoClassController.prototype.rankChange=function(){
   this.parentVal='';//初始化上级分类选择值
   this.brotherVal='';//初始化前置分类选择值
   this.parentList=[];//初始化上级分类选项
   this.brotherList=[];//初始化前置分类选项
   //判断是几级分类
   switch(this.rankVal){
   	//选中一级分类
	case "1":
    //获取菜单树对象
    var ZTree=$.fn.zTree.getZTreeObj("treeDemo");
    //获取上级分类信息数组并在上级分类
    this.parentList=ZTree.getNodes();
	break;
	//选中二级分类
	case "2":
    //获取菜单树对象
    var ZTree=$.fn.zTree.getZTreeObj("treeDemo");
    //获取一级分类信息数组并在上级分类显示
    this.parentList=ZTree.getNodes()[0].children;
	break;
   }
}
//设置上级分类下拉框改变事件
videoClassController.prototype.parentChange=function(){
	this.brotherVal='';//初始化前置分类选择值
	this.brotherList=[];//初始化前置分类选项
	if(this.parentVal!=''){
	    //根据上级分类下拉框改变的值获取该分类下所有子节点
	    //获取菜单树对象
	    var ZTree=$.fn.zTree.getZTreeObj("treeDemo");
	    //获取上级分类节点
	    var parentNode=ZTree.getNodeByParam("id",this.parentVal);
	    //判断是否有该分类子节点
	    if(typeof(parentNode.children)!="undefined"){
           	//获取选中的上级分类下所有子节点在前置分类显示
	        this.brotherList=parentNode.children;
	    }
	}
}
//设置添加分类信息方法
videoClassController.prototype.addClassify=function(){
	//输入限制判断
    if(this.classifyname=='' || this.parentVal==''){
    	$.jq_Alert({message:"分类信息必须填写完整！"});
        return;
    }else{
    	if(this.classifyname.length>10){
           $.jq_Alert({message:"分类名超过长度限制！"});
           return;
    	}
    }
    //判断有无子节点
    if(this.brotherList.length!=0){
	    if(this.brotherVal!=''){
		    //获取前置分类的前置id
		    var preid= this.brotherVal;
	    }else{
	    	//设置无选中子节点时默认前置id为0
	        var preid= "0";
	    }
    }else{
    	//设置无子节点时默认前置id为0
	    var preid= "0";
    }
	//发送添加分类信息请求
	this.http.post("index.php?m=Admin&c=Source&a=addClassify",{classifyname:this.classifyname,parentid:this.parentVal,preid:preid}).success(function(response){
		if(response.errorCode == 10000){
            $.jq_Alert({message:"添加分类信息成功！"});
            //关闭窗口
			$.jq_Panel_close();
			window.location.reload();//刷新分类管理页面
		}else{
            $.jq_Alert({message:"添加分类信息请求失败！"});
		}
	});
}
//设置删除分类信息方法
videoClassController.prototype.delClassify=function(){
	//获取菜单树对象
	var ZTree=$.fn.zTree.getZTreeObj("treeDemo");
	//获取选中信息  
	var select=ZTree.getSelectedNodes();
	//判断是否选中
	if(select.length==0){
		$.jq_Alert({message:"请先选中分类进行删除！按住Ctrl可多选！"});
		return;
	}
	//循环选中数组，获取分类id数组
	var aclassifyId=[];
	$.each(select,function(index,item){
        aclassifyId.push(item.id);//追加进新数组
	});
	//新数组用字符串连接
	var str=aclassifyId.join(',');
	$.jq_Confirm({message:"确认是否删除所选分类信息？",btnOkClick:function(){
	    //发送删除分类信息请求
		self.http.post("index.php?m=Admin&c=Source&a=delClassify",{strclassifyId:str}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data==true){
	                window.location.reload();//刷新分类菜单页面
	            }
			}else{
				$.jq_Alert({message:"删除分类信息请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});
}
//设置修改分类信息方法
videoClassController.prototype.updateClassify=function(){
	//获取菜单树对象
	var ZTree=$.fn.zTree.getZTreeObj("treeDemo");
	//获取选中信息  
	var select=ZTree.getSelectedNodes();
	//判断是否选中
	if(select.length==0){
		$.jq_Alert({message:"请先选中分类进行修改！"});
		return;
	}else{
		if(select.length>1){
            $.jq_Alert({message:"修改分类无法多选！请选中单个分类"});
            return;
		}
	}
	//输入限制判断
    if(this.classifyname=='' || this.parentVal==''){
    	$.jq_Alert({message:"分类信息必须填写完整！"});
        return;
    }else{
    	if(this.classifyname.length>10){
           $.jq_Alert({message:"分类名超过长度限制！"});
           return;
    	}
    }
    //判断有无子节点
    if(this.brotherList.length!=0){
	    if(this.brotherVal!=''){
		    //获取前置分类的前置id
		    var preid= this.brotherVal;
	    }else{
	    	//设置无选中子节点时默认前置id为0
	        var preid= "0";
	    }
    }else{
    	//设置无子节点时默认前置id为0
	    var preid= "0";
    }
	//获取分类id
	var classifyId=select[0].id;
	$.jq_Confirm({message:"确认是否修改所选分类信息？",btnOkClick:function(){
	    //发送修改分类信息请求
		self.http.post("index.php?m=Admin&c=Source&a=updateClassify",{classifyId:classifyId,classifyname:self.classifyname,parentid:self.parentVal,preid:preid}).success(function(response){
			if(response.errorCode == 10000){
	            if(response.data==true){
	                window.location.reload();//刷新分类菜单页面
	            }
			}else{
				$.jq_Alert({message:"修改分类信息请求失败！"});
			}
			console.log(response);
		})
	},btnCancelClick:function(){}});	
}
/**
 * 显示树状菜单
 * @param  {[array]} zNodes [树状菜单节点数据]
 * @return {[type]}        [description]
 */
videoClassController.prototype.showTree=function(zNodes){
	$(document).ready(function(){
			var setting = {
				check: {
					enable: false
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