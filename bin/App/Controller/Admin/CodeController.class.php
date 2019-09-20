<?php
	/**
	* 验证码控制器
	*/
	class CodeController{
		public $obj;		
		public function __construct(){
			$this->obj = new CodeModel(intval($_GET["codeNum"]),intval($_GET["codeImgWith"]),intval($_GET["codeImgHeight"]));
		}
		public function getCode(){
			$codestr=$this->obj->createCode();
			//存入session,登录比对用
        	//创建验证码数组
        	$acode=array("code"=>$codestr,"id"=>$_GET["id"]);
        	//存入session
        	session_start();
            $_SESSION['code']=$acode;
		}
	}
?>