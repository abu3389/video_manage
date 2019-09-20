<?php 
class ClientModel extends Model{
	public $vipTable;
	public $clientTable;
	public function __construct(){
		parent::__construct();
		$this->vipTable = 'admin_vip';
		$this->clientTable = 'home_user';
	}
	/**
	 * 查询VIP等级
	 * @return [array]
	 */
    public function selecVip($limit='',$where='vip_id>0'){
        return $this->MysqlObj->select($this->vipTable,"*",$where,"vip_id desc",$limit);
    }
	/**
	 * 添加VIP等级
	 * @param  [string] $value [添加内容]
	 * @return [type] [description]
	 */
	public function addVip($value){
        return $this->MysqlObj->add($this->vipTable,"vip_name,vip_time,vip_cost,vip_type", $value);
	}
	/**
	 * 删除VIP等级
	 * @return [type] [description]
	 */
	public function delVip($where = 'vip_id<0'){
        return $this->MysqlObj->del($this->vipTable,$where);
	}
	/**
	 * 更新VIP等级
	 * @return [type] [更新内容]
	 */
	public function editVip($updateData,$where = 'vip_id<0'){
        return $this->MysqlObj->edit($this->vipTable,$updateData, $where);
	}
    /**
     * 联合查询客户
     * @param  [number] $limit [查询条数]
     * @param  string $where [查询条件/位置]
     * @return [array]       
     */
    public function selectJoinClient($limit,$where='user_id>0'){
    	return $this->MysqlObj->selectLeftJoin($this->clientTable, $this->vipTable, 'home_user.*,admin_vip.*', "home_user.vip_id=admin_vip.vip_id",$where,"user_id desc",$limit);
    }
    /**
     * 更新管理用户
     * @param  [string] $updateData [更新内容]
     * @param  string $where      [条件筛选/更新位置]
     * @return [type]             [description]
     */
	public function updateClient($updateData,$where = 'user_id<0'){
		return $this->MysqlObj->edit($this->clientTable, $updateData, $where);
	}
}
?>