<?php
   /**
   * 后台报表控制器
   */
   class CountController{
   	    public $obj;//用户操作模型对象
	   	public function __construct(){
            $this->obj = new CountModel();	
	   	}
	   	//按月份段查询客户注册人数
	   	public function getClientMonthRegNum(){
	   		$info = json_decode(file_get_contents("php://input"), true);//文件流转对象
	   		$startMonth=$info["startMonth"];//获取起始年月份
	   		$endMonth=$info["endMonth"];//获取终止年月份
	   		//获取查询结果
	   		$result=$this->obj->CountFieldsByMount("home_user","reg_time",$startMonth,$endMonth);
            $this->obj->sendResult($result,"月份客户注册人数查询");//返回查询结果
	   	}
	}
?>