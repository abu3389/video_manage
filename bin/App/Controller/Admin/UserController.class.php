<?php
   /**
   * 后台用户类控制器
   */
   class UserController{
   	    public $username;//用户名
   	    public $userpwd;//密码
   	    public $code;//验证码
   	    public $codetag;//验证码标识
   	    public $obj;//用户操作模型对象
	   	public function __construct(){
            $this->obj = new UserModel();
            session_start(); 	
	   	}
	   	/**
	   	 * 登录检测
	   	 * @return [type] [description]
	   	 */
	   	public function loginCheck(){
	   		$info = json_decode(file_get_contents("php://input"), true);//文件流转对象
	   		$username=$info["username_"];//获取用户名
	   		$userpwd=md5($info["userpwd_"]);//获取密码
	   		$loginCode=$info["code_"];//获取验证码
	   		$codetag=$info["codetag_"];//获取验证码标识
            $codeok=$this->obj->checkCode($codetag,$loginCode);//验证码校验
            //查询登录用户匹配数据库
            $result=$this->obj->findUser("user_id,user_name,user_head,role_id,user_state","user_name='$username' and user_pwd='$userpwd'");
            //校验登录结果
            if($codeok==true && !empty($result) && $result["user_state"]=="true"){
            	//查询用户权限,获取权限信息
            	$role_id=$result["role_id"];
            	$role=$this->obj->findUserRole("role_id,role_name,role_pow","role_id='$role_id'");
              //查询用户拥有权限的菜单
              $menulist=$this->obj->selectMenu($role["role_pow"]);
    		      //构造登录用户信息数组
                $nowuser = array('nowUserId' => $result["user_id"],'nowUserName' => $result["user_name"], 'nowUserHead' =>$result["user_head"],'nowUserState' =>$result["user_state"],'nowUserRole'=>$role,'menuList'=>$menulist);
                //存入session
                // session_start();
                $_SESSION["admin_nowuser"]=json_encode($nowuser);
                //存入cookie
                setcookie("admin_nowuser",json_encode($nowuser));     
                $this->obj->sendResult("010","后台登录");//返回登录数据
            }else{
            	if($codeok!=true){
            		$this->obj->sendResult("011","后台登录");//返回验证码错误代码
            		return;
            	}
            	if(empty($result)){
            		$this->obj->sendResult("012","后台登录");//返回用户名或密码错误代码
            		return;
            	}
            	if($result["user_state"]=="false"){
            		$this->obj->sendResult("013","后台登录");//返回锁定状态代码
            		return;
            	}
            }
	   	}
	   	/**
	   	 * 登录获取
	   	 * @return [type] [description]
	   	 */
	   	public function loginGet(){
	   		  $loginInfo=json_decode($_SESSION["admin_nowuser"]);
          $this->obj->sendResult($loginInfo,"后台登录");
	   	}
	   	/**
	   	 * 退出登录
	   	 * @return [type] [description]
	   	 */
	   	public function loginOut(){
	        unset($_SESSION['admin_nowuser']);
	        //跳转
	        header("Location:index.php?m=Admin&c=Index&a=admin");//后台管理
      }
      /**
       * 获取员工信息（分页方式获取）
       * @return [type] [description]
       */
      public function getAdminUser(){
          $info = json_decode(file_get_contents("php://input"), true);
          //判断是否有关键词
          $str='';
          if(!empty($info["keyword_"])){
            //设置查询条件
            foreach($info["keyword_"] as $key=>$value){
              if($key== count($info["keyword_"])-1){
                 $str.="user_name like '%$value%'";
                 break;
              }
              $str.="user_name like '%$value%' or ";
            }
          }
          $count = $this->obj->getCount('admin_user',$str);//获取员工信息总条数
          $pages = $this->obj->showPage($info['page_'],5,'goToPage',$count);//获取分页
          $list = $this->obj->selectJoinAdminUser($pages["limit"],$str);//获取单页员工信息
          //构造员工信息包
          $userinfo=array("userlist"=>$list,"page"=>$pages["pages"],"listnum"=>$pages["sum"]);
          //发送员工信息包
          $this->obj->sendResult($userinfo,"获取员工信息");
      }
      /**
       * 查询单个员工信息
       * @return [type] [description]
       */
      public function getAdminUserOne(){
          $info = json_decode(file_get_contents("php://input"), true);
          $userInfo=$this->obj->findAdminUser($info["uid"]);//获取用户信息
          $this->obj->sendResult($userInfo,"获取单个员工信息");
      }
      /**
       * 获取所有角色信息
       * @return [type] [description]
       */
      public function getAllRole(){
          $roleInfo=$this->obj->selecRole();//获取员工信息
          $this->obj->sendResult($roleInfo,"获取角色信息");
      }
      /**
       * 添加管理用户
       */
      public function addAdminUser(){
          $info = json_decode(file_get_contents("php://input"), true);
          $userinfo=$info['userInfo'];
          $username=$userinfo['user_name'];
          $userpwd=md5($userinfo['user_pwd']);
          $userhead=$userinfo['user_head'];
          $roleid=$userinfo['role_id'];
          //空数据判断
          if(empty($username) || empty($userinfo['user_pwd']) || empty($roleid)){
              return;
          }
          //用户查重
          $user=$this->obj->findUser("user_name","user_name='$username'");//查找同名用户
          if(!empty($user)){
              $this->obj->sendResult("2","添加管理用户");
          }else{
              $result=$this->obj->addAdminUser("'$username','$userpwd','$userhead','$roleid'");
              $this->obj->sendResult("1","添加管理用户");
          }         
      }
      /**
       * 编辑管理用户
       * @return [type] [description]
       */
      public function editAdminUser(){
          $info = json_decode(file_get_contents("php://input"), true);
          $userinfo=$info['userInfo'];
          $userid=$userinfo['user_id'];
          $username=$userinfo['user_name'];
          $oldusername=$userinfo['user_oldname'];
          $roleid=$userinfo['role_id'];
          //空数据判断
          if(empty($username) || empty($roleid)){
              return;
          }
          //用户查重(不包括自己)
          $user=$this->obj->findUser("user_name","user_name='$username'");//查找同名用户
          if(!empty($user) && $user["user_name"]!=$oldusername){
              $this->obj->sendResult("2","编辑管理用户");
          }else{
              $result=$this->obj->updateAdminUser("user_name='$username',role_id='$roleid'","user_id='$userid'");
              $this->obj->sendResult("1","编辑管理用户");
          }
      }
      /**
       * 更改管理用户状态
       */
      public function setAdminUserState(){
          $info = json_decode(file_get_contents("php://input"), true);
          $userid=$info["user_id"];//获取用户id
          $userstate=$info["user_state"];//获取要更新的状态
          //更新用户数据
          $result=$this->obj->updateAdminUser("user_state='$userstate'","user_id='$userid'");
          //发送更新结果
          $this->obj->sendResult($result,"更改用户状态");
      }
      /**
       * 重置管理用户密码
       * @return [type] [description]
       */
      public function reSetAdminUserPwd(){
          $info = json_decode(file_get_contents("php://input"), true);
          $userid=$info["user_id"];//获取用户id
          $pwd="123456";
          $repwd=md5($pwd);//重置的密码
          //更新用户数据
          $result=$this->obj->updateAdminUser("user_pwd='$repwd'","user_id='$userid'");
          //发送更新结果
          $this->obj->sendResult($pwd,"重置管理用户密码");      
      }
      /**
       * 获取角色信息（分页方式获取）
       * @return [type] [description]
       */
      public function getRoleInfo(){
          $info = json_decode(file_get_contents("php://input"), true);
          $count = $this->obj->getCount('admin_role');//获取角色信息总条数
          $pages = $this->obj->showPage($info['page_'],5,'goToPage',$count);//获取分页
          $list=$this->obj->selecRole($pages["limit"]);//获取员工信息
          //构造角色信息包
          $roleInfo=array("rolelist"=>$list,"page"=>$pages["pages"],"listnum"=>$pages["sum"]);
          $this->obj->sendResult($roleInfo,"获取角色信息");
      }
      /**
       * 获取所有菜单
       * @return [type] [description]
       */
      public function getAllMenu(){
          $menuInfo=$this->obj->selectMenu();//获取所有菜单
          $this->obj->sendResult($menuInfo,"获取菜单信息");//发送菜单信息
      }
      /**
       * 添加单个角色
       * @return [type] [description]
       */
      public function addAdminRole(){
          $info = json_decode(file_get_contents("php://input"), true);
          $rolename=$info['roleInfo']['role_name'];//获取角色名
          $rolepow=$info['roleInfo']['role_pow'];//获取角色权限
          //存入角色信息
          if(!empty($rolename) && !empty($rolepow)){
              $result=$this->obj->addAdminRole("'$rolename','$rolepow'");
              $this->obj->sendResult($result,"添加单个角色");//发送添加结果
          }
      }
      /**
       * 删除单个角色
       * @return [type] [description]
       */
      public function delAdminRole(){
          $info = json_decode(file_get_contents("php://input"), true);
          $roleid=$info["role_id"];//获取角色id
          $result=$this->obj->delAdminRole("role_id='$roleid'");//删除角色
          $this->obj->sendResult($result,"删除单个角色");//发送删除结果
      }
      /**
       * 修改单个角色
       * @return [type] [description]
       */
      public function editAdminRole(){
        $info = json_decode(file_get_contents("php://input"), true);
        $str='';
        //获取角id
        $roleid= $info["role_id"];
        //获取角色名
        $rolename=!empty($info["role_name"]) ? $info["role_name"] : '';
        //获取角色权限
        $rolepow=!empty($info["role_pow"]) ? $info["role_pow"] : '';
        !empty($rolename) ? $str="role_name='$rolename'" : '';
        !empty($rolepow) ? $str="role_pow='$rolepow'" : '';
        $result=$this->obj->updateAdminRole($str,"role_id='$roleid'");
        $this->obj->sendResult($result,"修改单个角色");//发送修改结果
      }
   }
?>