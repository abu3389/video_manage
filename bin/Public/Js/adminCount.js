//创建一个angular应用,
var app=angular.module("CountModule",[]).controller();
//创建控制器
function CountController($http){
	self=this;
	this.http = $http;
	this.startTime='';//初始化起始时间
	this.endTime='';//初始化结束时间
	this.UserRegNum=[];//统计用户注册量
}
//设置获取统计用户注册量
CountController.prototype.getUserRegNum = function(){
	//清空图表显示容器
	$('#ichart-render').html('');
    //获取设置起始时间
    this.startTime=$('#my-start-2').val();
    //获取设置结束时间
    this.endTime= $('#my-end-2').val();
    //判断是否为空
    if(this.startTime=='' || this.endTime==''){
       $.jq_Alert({message:"请选择起始时间和结束时间！"});
       return;
    }
    //发送用户注册统计查询请求
	this.http.post("index.php?m=Admin&c=Count&a=getClientMonthRegNum",{startMonth:this.startTime,endMonth:this.endTime}).success(function(response){
		if(response.errorCode == 10000){
			//循环结果数组，构建统计图表对象数组
			self.UserRegNum=[];
			$.each(response.data,function(index,item){
				var color="rgb"+"("+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+")";
                var obj={
                	name:item.month,//月份名称
                	value:item.sum,//该月统计数据
                	color:color//随机颜色
                }
                self.UserRegNum.push(obj);//对象追加进数组
			});
			//显示统计图表
			showCountTable("ichart-render","用户注册量报表","按月统计",self.UserRegNum);
            console.log(response.data);
		}else{
			$.jq_Alert({message:"该时间段无数据！"});
		}
		console.log(response);
	})
}
/**
	* 显示统计图表
	* @param  string showid   [显示位置的id]
	* @param  string title    [标题]
	* @param  string subtitle [子标题]
	* @param  array data{name,value,color}    [显示数据]
	*
**/
function showCountTable(showid,title,subtitle,data){
	$(function(){
	      var chart = iChart.create({
	            render:showid,
	            width:1200,
	            height:600,
	            background_color:"#2e3b4e",
	            gradient:false,
	            color_factor:0.2,
	            border:{
	                color:"#404c5d",
	                width:1
	            },
	            align:"center",
	            offsetx:0,
	            offsety:-20,
	            sub_option:{
	                  border:{
	                        color:"#fefefe",
	                        width:1
	                  },
	                  label:{
	                        fontweight:600,
	                        fontsize:20,
	                        color:"#f5f5f5",
	                        sign:"square",
	                        sign_size:12,
	                        border:{
	                              color:"#BCBCBC",
	                              width:1
	                        },
	                        background_color:"#fefefe"
	                  }
	            },
	            shadow:true,
	            shadow_color:"#fafafa",
	            shadow_blur:10,
	            showpercent:false,
	            column_width:"70%",
	            bar_height:"70%",
	            radius:"90%",
	            title:{
	                  text:title,
	                  color:"#f5f5f5",
	                  fontsize:24,
	                  font:"Verdana",
	                  textAlign:"left",
	                  height:30,
	                  offsetx:36,
	                  offsety:0
	            },
	            subtitle:{
	                  text:subtitle,
	                  color:"#8d9db5",
	                  fontsize:24,
	                  font:"微软雅黑",
	                  textAlign:"left",
	                  height:50,
	                  offsetx:36,
	                  offsety:6
	            },
	            footnote:{
	                  text:"",
	                  color:"#8d9db5",
	                  fontsize:14,
	                  font:"微软雅黑",
	                  textAlign:"right",
	                  height:30,
	                  offsetx:-32,
	                  offsety:0
	            },
	            legend:{
	                  enable:true,
	                  background_color:"rgba(254,254,254,0.2)",
	                  color:"#c1cdde",
	                  fontsize:13,
	                  border:{
	                        color:"#85898f",
	                        width:0
	                  },
	                  column:5,
	                  align:"right",
	                  valign:"top",
	                  offsetx:-32,
	                  offsety:-40
	            },
	            coordinate:{
	                  width:"92%",
	                  height:"80%",
	                  background_color:"rgba(246,246,246,0.05)",
	                  axis:{
	                        color:"#bfbfc3",
	                        width:["","",6,""]
	                  },
	                  grid_color:"#c0c0c0",
	                  label:{
	                        fontweight:500,
	                        color:"#f5f5f5",
	                        fontsize:0
	                  }
	            },
	            label:{
	                  fontweight:600,
	                  color:"#f5f5f5",
	                  fontsize:18
	            },
	            type:"column2d",
	            data:data
	      });
	      chart.draw();
	});
}