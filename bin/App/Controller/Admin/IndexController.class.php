<?php 
class IndexController{
	/**
	 * 后台页面选择
	 */
	public function admin(){
		//判断登录状态
		session_start();
		if(!empty($_SESSION['admin_nowuser'])){
                require ADMINVIEW."admin.html";//后台管理
		}else{
			require ADMINVIEW."login.html";//后台登录
		}
	}
}
?>