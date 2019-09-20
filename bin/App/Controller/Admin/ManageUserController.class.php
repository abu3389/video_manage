<?php 
class ManageUserController{
	/**
	 * 后台用户管理
	 */
	public function adminMain(){
		require ADMINVIEW."adminMain.html";//后台主页
	}
	public function videoList(){
	    require ADMINVIEW."videoList.html";//资源列表
	}
	public function videoAdd(){
	    require ADMINVIEW."videoAdd.html";//资源添加
	}
	public function videoLook(){
	    require ADMINVIEW."videoLook.html";//资源添加
	}
	public function videoClassifyList(){
	    require ADMINVIEW."videoClassifyList.html";//分类管理
	}
	public function videoCommentList(){
	    require ADMINVIEW."videoCommentList.html";//分类管理
	}
	public function adminList(){
	    require ADMINVIEW."adminList.html";//员工列表
	}
	public function adminAdd(){
	    require ADMINVIEW."adminAdd.html";//员工添加
	}
	public function adminRoleList(){
	    require ADMINVIEW."adminRoleList.html";//权限管理
	}
	public function roleAdd(){
	    require ADMINVIEW."roleAdd.html";//权限管理
	}
	public function clientList(){
		require ADMINVIEW."clientList.html";//客户列表
	}
	public function clientAdd(){
		require ADMINVIEW."clientAdd.html";//客户添加
	}
	public function vipList(){
	    require ADMINVIEW."vipList.html";//VIP等级管理
	}
	public function vipAdd(){
	    require ADMINVIEW."vipAdd.html";//VIP等级管理
	}
	public function adminChat(){
	    require ADMINVIEW."adminChat.html";//平台客服
	}
	public function adminCount(){
	    require ADMINVIEW."adminCount.html";//报表统计
	}		
}
?>