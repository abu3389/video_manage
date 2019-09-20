<?php 
class Frework{
	/**
	 * 定义常用常量
	 */
	public static function path(){
		define("APP", 'App');
		define("CONTROLLER", 'Controller');
		define("MODEL", 'Model');
		define("VIEW", 'View');
		define("CURRENTMODEL", APP.'/'.MODEL.'/');
		define("ADMINVIEW", APP.'/'.VIEW.'/Admin/');
		define("HOMEVIEW", APP.'/'.VIEW.'/Home/');
		define("LIBS", 'Frework/Libs/');
		define("PUBLICLOG",'Public/Log/');
	}
	/**
	 * 获取参数
	 * @return [type] [description]
	 */
	public static function getParame(){
		define("MODULE", !empty($_GET['m']) ? $_GET['m'] : 'Home');
		define("CONTROLLERNAME", !empty($_GET['c']) ? $_GET['c'] : 'Index');
		define("ACTION", !empty($_GET['a']) ? $_GET['a'] : 'index');
		define("CURRENTCONTROLLER", APP.'/'.CONTROLLER.'/'.MODULE.'/');
	}
	/**
	 * 路由分发
	 */
	public static function router(){
		$contollName = CONTROLLERNAME.'Controller';
		$obj = new $contollName();
		$actionName = ACTION;
		$obj->$actionName();
	}
	/**
	 * 自动加载类文件
	 */
	public static function autoLoad(){
		function __autoload($classname){
			if(file_exists(CURRENTCONTROLLER.$classname.'.class.php')){
				require CURRENTCONTROLLER.$classname.'.class.php';	
			}
			if(file_exists(CURRENTMODEL.$classname.'.class.php')){
				require CURRENTMODEL.$classname.'.class.php';
			}
		}
	}
	/**
	 * 引入常用类文件
	 */
	public static function loadLibs(){
		require LIBS.'Core_Page.class.php';
	}

	/**
	 * 启动框架
	 * @return [type] [description]
	 */
	public static function run(){
		self::path();
		self::getParame();
		self::autoLoad();
		self::loadLibs();
		self::router();
	}
}
?>