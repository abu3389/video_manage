//创建一个angular应用,
var app=angular.module("videoListModule",[]).controller();
//创建控制器
function VideoListController($http){
	self=this;
	this.http = $http;
	this.keyword='';//初始化多关键词
	this.videoList=[];//初始化资源列表
	this.listnum=0;//初始化资源列表
	this.getVideoList(1);//初始化默认获取第一页资源
	this.classifyList=[];//初始化分类数组
	this.classifyVal=''//初始化分类下拉框值
	this.getClassifyList();//初始化获取分类数据
}
//设置获取资源列表方法
VideoListController.prototype.getVideoList = function(page){
	if(this.keyword!='' || this.classifyVal!=''){
		//发送关键词搜索请求
		this.http.post("index.php?m=Admin&c=Source&a=getVideoList",{page_:page,keyword_:this.keyword.split(" "),classify_:this.classifyVal}).success(function(response){
			if(response.errorCode == 10000){
	            self.showVideoList(response);//显示资源列表
			}else{
				$.jq_Alert({message:"搜索资源请求失败！"});
			}
			console.log(response);
		})
	}else{
	    //发送资源信息请求包
		this.http.post("index.php?m=Admin&c=Source&a=getVideoList",{page_:page}).success(function(response){
			if(response.errorCode == 10000){
	            self.showVideoList(response);//显示资源列表
	            // console.log(self.showVideoList);
			}else{
	            $.jq_Alert({message:"资源信息获取请求失败！"});
			}
			console.log(response);
		})
	}
}
//设置获取分类信息方法
VideoListController.prototype.getClassifyList=function(){
	//发送获取分类信息请求包
	this.http.post("index.php?m=Admin&c=Source&a=getClassify",{}).success(function(response){
		if(response.errorCode == 10000){
            self.classifyList=response.data;//在分类下拉框显示
            // console.log(self.classifyList);
		}else{
            $.jq_Alert({message:"分类信息获取请求失败！"});
		}
		console.log(response);
	})
}
//设置下拉框改变事件
VideoListController.prototype.classifyChange=function(){
	//判断是否为空
	if(this.classifyVal==''){
		return;
	}
    //获取资源列表
    this.getVideoList(1);
}
//设置删除资源方法
VideoListController.prototype.delVideo=function(videoid){
	$.jq_Confirm({message:"确认是否删除该资源？",btnOkClick:function(){
	    //发送删除资源请求
		self.http.post("index.php?m=Admin&c=Source&a=delVideo",{video_id:videoid}).success(function(response){
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
//设置显示资源列表
VideoListController.prototype.showVideoList=function (response){
	$("#page").html(response.data.page);//添加分页
    self.videoList=response.data.videolist;//获取用户列表
    self.listnum=response.data.listnum;//获取数据条数统计
}
//设置调用弹窗方法
VideoListController.prototype.showBox = function(title,iframeWidth,iframeHeight,url,vid){   
    //判断是增加还是编辑
    if(typeof(vid)!="undefined"){
    	//存入本地存储
    	window.localStorage.setItem("yk_editvid",vid);
    }
    parent.showBox(title,iframeWidth,iframeHeight,url);//显示弹窗
}
//设置分页跳转方法
function goToPage(page){
	//通过controller来获取Mymodule模块
	var element = document.querySelector('[ng-controller="VideoListController as VideoList"]');
	// console.log(element);
	//获取controller()控制器
	var con = angular.element(element).controller();
	// console.log(con);
	//调用angular内部方法
	con.getVideoList(page);
}
