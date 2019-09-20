<?php
/**
* 客户控制器
*/
class ClientController{
    public $obj;//客户操作模型对象
  	public function __construct(){
  		$this->obj = new ClientModel();
  	}
   /**
    * 获取VIP等级信息（分页方式获取）
    * @return [type] [description]
    */
    public function getVipInfo(){
      $info = json_decode(file_get_contents("php://input"), true);
      $count = $this->obj->getCount('admin_vip');//获取VIP等级信息总条数
      $pages = $this->obj->showPage($info['page_'],5,'goToPage',$count);//获取分页
      $list=$this->obj->selecVip($pages["limit"]);//获取VIP等级信息
      //构造VIP等级信息包
      $vipInfo=array("viplist"=>$list,"page"=>$pages["pages"],"listnum"=>$pages["sum"]);
      $this->obj->sendResult($vipInfo,"获取VIP等级信息");
    }
    /**
     * 添加VIP等级信息
     * @return [type] [description]
     */
    public function addVip(){
        $info = json_decode(file_get_contents("php://input"), true);
        $vipInfo=$info['vipInfo'];//获取VIP等级信息
        $vipname=$vipInfo['vip_name'];//获取VIP等级名称
        $viptime=$vipInfo['vip_time'];//获取VIP时效
        $vipcost=$vipInfo['vip_cost'];//获取VIP费用
        $viptype=$vipInfo['vip_type'];//获取VIP类型
        //存入VIP等级信息
        if(!empty($vipname) && !empty($viptime) && !empty($vipcost) && !empty($viptype)){
            $result=$this->obj->addVip("'$vipname','$viptime','$vipcost','$viptype'");
            $this->obj->sendResult($result,"添加VIP等级信息");//发送添加结果
        }
    }
    /**
     * 删除VIP等级信息
     * @return [type] [description]
     */
    public function delVip(){
        $info = json_decode(file_get_contents("php://input"), true);
        $vipid=$info["vip_id"];//获取角色id
        $result=$this->obj->delVip("vip_id='$vipid'");//删除VIP等级信息
        $this->obj->sendResult($result,"删除VIP等级信息");//发送删除结果
    }
    /**
     * 修改VIP等级信息
     * @return [type] [description]
     */
    public function editVip(){
    	$info = json_decode(file_get_contents("php://input"), true);
    	$vipid=$info["vip_id"];//获取VIP等级id
    	$vipname=$info["vip_name"];//获取VIP等级名称
    	$viptime=$info["vip_time"];//获取时效
    	$vipcost=$info["vip_cost"];//获取费用
    	$viptype=$info["vip_type"];//获取VIP类型
      $result=$this->obj->editVip("vip_name='$vipname',vip_time='$viptime',vip_cost='$vipcost',vip_type='$viptype'","vip_id='$vipid'");//修改VIP等级信息
      $this->obj->sendResult($result,"修改VIP等级信息");//发送修改结果
    }
    /**
     * 获取客户信息（分页方式获取）
     * @return [type] [description]
     */
    public function getClient(){
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
        $count = $this->obj->getCount('home_user',$str);//获取员工信息总条数
        $pages = $this->obj->showPage($info['page_'],5,'goToPage',$count);//获取分页
        $list = $this->obj->selectJoinClient($pages["limit"],$str);//获取单页员工信息
        //构造员工信息包
        $userinfo=array("userlist"=>$list,"page"=>$pages["pages"],"listnum"=>$pages["sum"]);
        //发送员工信息包
        $this->obj->sendResult($userinfo,"获取客户信息");
    }
    /**
     * 重置用户密码
     * @return [type] [description]
     */
    public function reSetClientPwd(){
        $info = json_decode(file_get_contents("php://input"), true);
        $userid=$info["user_id"];//获取用户id
        $pwd="123456";
        $repwd=md5($pwd);//重置的密码
        //更新用户数据
        $result=$this->obj->updateClient("user_pwd='$repwd'","user_id='$userid'");
        //发送更新结果
        $this->obj->sendResult($pwd,"重置用户密码");      
    }
    /**
     * 更改用户状态
     */
    public function setClientState(){
        $info = json_decode(file_get_contents("php://input"), true);
        $userid=$info["user_id"];//获取用户id
        $userstate=$info["user_state"];//获取要更新的状态
        //更新用户数据
        $result=$this->obj->updateClient("user_state='$userstate'","user_id='$userid'");
        //发送更新结果
        $this->obj->sendResult($result,"更改用户状态");
    }
}
?>