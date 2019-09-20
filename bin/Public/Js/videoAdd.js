//创建一个angular应用,
var app=angular.module("AddVideoModule",[]).controller();
//创建控制器
function AddVideoController($http){
	self=this;
	this.http = $http;
	this.classifyList=[];//初始化资源分类数组
	this.classifyid='';//初始化分类下拉框选中分类id
	this.usertype='';//初始化用户类型
	this.imgfile='';//初始化封面图片文件
    this.videofile='';//初始化资源文件
	this.videoimgsrc='';//初始化视频封面地址
	this.videofilesrc='';//初始化视频文件地址
	this.videoname='';//初始化资源名
    this.director=''//初始化导演名称
    this.actor=''//初始化主演名称
    this.area=''//初始化地区名称
    this.detail=''//初始化简介内容
    this.vid=''//初始化资源id
    this.getClassifyList();//初始化获取分类数据
    this.fileChangeEvent();//初始化安装文件改变事件
    this.getEditId();//初始化获取编辑资源
}
//设置获取用户id并请求获取资源信息
AddVideoController.prototype.getEditId =function(){
   //获取本地存储编辑资源id
   if(window.localStorage.getItem("yk_editvid")){
        var vid=window.localStorage.getItem("yk_editvid");
        this.vid=vid;
	    //发送获取资源信息请求
		this.http.post("index.php?m=Admin&c=Source&a=getVideoOne",{vid:this.vid}).success(function(response){
			if(response.errorCode == 10000){
				var data=response.data;
				self.videoimgsrc=data.video_img;//初始化视频封面地址
				self.videofilesrc=data.video_file;//初始化视频文件地址
				self.classifyid=data.classify_id;//初始化分类下拉框选中分类id
				self.usertype=data.vip_type;//初始化用户类型
				self.videoname=data.video_name;//初始化资源名
			    self.director=data.video_director//初始化导演名称
			    self.actor=data.video_actor//初始化主演名称
			    self.area=data.video_area//初始化地区名称
			    self.detail=data.video_detail//初始化简介内容
	            window.localStorage.removeItem("yk_editvid");//删除本地存储
			}else{
				parent.$.jq_Alert({message:"获取用户信息请求失败！"});
			}
			console.log(response);
		})           
    }
}
//设置获取分类信息方法
AddVideoController.prototype.getClassifyList=function(){
	//发送获取分类信息请求包
	this.http.post("index.php?m=Admin&c=Source&a=getClassify",{}).success(function(response){
		if(response.errorCode == 10000){
            self.classifyList=response.data;//在分类下拉框显示
            // console.log(self.classifyList);
		}else{
            parent.$.jq_Alert({message:"分类信息获取请求失败！"});
		}
		console.log(response);
	})
}
//设置添加资源信息方法
AddVideoController.prototype.addVideo=function(){
	this.imgfile = document.getElementById('imgfile');//获取图片信息
	this.videofile = document.getElementById('videofile');//获取资源信息
	//获取上传文件信息
	if(this.imgfile.value == '' || this.videofile.value == ''){
	     parent.$.jq_Alert({message:"请先选择文件！"});
	}else{
		//判断是否填写完整
		if(this.classifyid=='' && this.usertype=='' && this.videoname=='' && this.director=='' && this.actor=='' && this.area=='' && this.detail==''){
            parent.$.jq_Alert({message:"请完整填写资料！"});
		}else{
			// //设置滚动条位置,显示文件上传进度
	  //       $(".admin-content").scrollTop(100);
	        //发送添加资源请求
		    this.upload();
		}
	}
}
//设置修改资源信息方法
AddVideoController.prototype.editVideo=function(){
	//判断是否填写完整
	if(this.classifyid=='' && this.usertype=='' && this.videoname=='' && this.director=='' && this.actor=='' && this.area=='' && this.detail==''){
        parent.$.jq_Alert({message:"请完整填写资料！"});
	}else{
		// //设置滚动条位置,显示文件上传进度
  //       $(".admin-content").scrollTop(100);
        //发送添加资源请求
	    this.upload();
	}
}
//安装文件上传改变事件
AddVideoController.prototype.fileChangeEvent=function(){
	$('.doc-form-file').on('change', function() {
        if(this.files.length==0){
           return;
        }
        //获取标签
        //进度数字
        var processNum = $(this.parentNode.nextElementSibling.nextElementSibling.children[1]);
        //进度条
        var processBar = $(this.parentNode.nextElementSibling.nextElementSibling.children[0]);
        //获取文件信息
        var fileName = this.files[0].name;
        var fileSize = this.files[0].size;
        processBar.css("width",0);
        //验证要上传的文件
        if(fileSize > 1024*800*1024){
        	//显示错误信息
            $(this.parentNode.nextElementSibling).html("<font>文件过大，请重新选择</font>");
            //设置文件上传值为空
            this.value = '';
            processNum.html('未选择文件');
            return false;
        }else{
        	//创建文件信息标签
            var fileSpan = '<span class="am-badge">' + fileName +' / '+parseInt(fileSize/1024)+'K'+'</span>';
	        //显示文件信息
	        $(this.parentNode.nextElementSibling).html(fileSpan);
            processNum.html('等待上传');
        }
    });
}
//创建ajax对象，发送上传请求
AddVideoController.prototype.upload=function(){
    this.imgfile = document.getElementById('imgfile')//获取图片文件
    this.videofile = document.getElementById('videofile')//获取资源文件
    var form = new FormData();
    //图片
    if(this.imgfile.value!=0){
	    form.append('photofile',this.imgfile.files[0]);//文件
    }else{
    	form.append('photosrc',this.videoimgsrc);//地址
    };
    //资源
    if(this.videofile.value!=0){
        form.append('videofile',this.videofile.files[0]);//文件
    }else{
    	form.append('videosrc',this.videofilesrc);//地址
    };
    //判断是编辑还是增加
    if(this.vid!=''){
        form.append('videoid',this.vid);//资源id
    }
    form.append('classifyid',this.classifyid);//分类id
    form.append('usertype',this.usertype);//用户类型
    form.append('videoname',this.videoname);//资源名称
    form.append('director',this.director);//导演
    form.append('actor',this.actor);//主演
    form.append('area',this.area);//地区
    form.append('detail',this.detail);//简介
    $.ajax({
        url: 'index.php?m=Admin&c=Source&a=addVideo',//上传地址
        async: true,//异步
        type: 'post',//post方式
        data: form,//FormData数据
        processData: false,//不处理数据流 !important
        contentType: false,//不设置http头 !important
        xhr:function(){//获取上传进度           
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',function(e){//监听progress事件
                    var loaded = e.loaded;//已上传
                    var total = e.total;//总大小
                    var percent = Math.floor(100*loaded/total);//百分比
                    $('#processNum').text(percent+"%");//数显进度
                    $('#processBar').css("width",percent+"%");//图显进度}, false);
                })
                return myXhr;
            }
        },
        success: function(response){//上传成功回调
        	var response =JSON.parse(response);
			if(response.errorCode == 10000){
	            parent.$.jq_Alert({message:"资源上传成功！",btnOkClick:function(){
	            	//关闭窗口
			        parent.$.jq_Panel_close();
			        //刷新资源列表
                    parent.document.getElementById("iframeRight").contentWindow.location.reload(true);
	            }});
			}else{
	            parent.$.jq_Alert({message:"文件上传请求失败！请检查上传文件类型"});
			}
			console.log(response);
	    }
    })
}