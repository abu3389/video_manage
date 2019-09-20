<?php
   /**
   * 用户模型
   */
   class UserModel extends Model{
   	    public $tableName;
	   	public function __construct(){
	   		parent::__construct();//调用父类公共模型构造函数，实例化数据库操作DAO层并调用打开数据库方法
	   	}
		/**
		 * 查询单条用户数据
		 * @param  [string] $fields [字段名]
		 * @param  string $where  [条件]
		 * @return [array]
		 */
		public function findUser($fields,$where = 'user_id>0'){
			return $this->MysqlObj->find("admin_user", $fields, $where);
		}
		/**
		 * 查询单条用户权限数据
		 * @param  [string] $fields [字段名]
		 * @param  string $where  [条件]
		 * @return [array]
		 */
		public function findUserRole($fields,$where = 'role_id>0'){
			return $this->MysqlObj->find("admin_role", $fields, $where);
		}
        /**
         * 查询菜单
         * @param  string $amenuid [菜单id数组]
         * @param  string $limit   [查询条数]
         * @return [array]          
         */
		public function selectMenu($amenuid = '', $limit=''){
			$where = $amenuid ? " menu_id in ($amenuid) " : '';
			return $this->MysqlObj->select("admin_menu",'*', $where,'',$limit);
		}
		/**
		 * 查询所有员工
		 * @param  string $auserid [员工id数组]
		 * @param  string $limit   [查询条数]
		 * @return [array]          
		 */
		public function selectAdminUser($auserid = '', $limit=''){
			$where =$auserid ? " user_id = ($amenuid) " : '';
			return $this->MysqlObj->select("admin_user",'user_id,user_name,role_id,user_state,reg_time', $where,'',$limit);
		}
        /**
         * 查询单个员工
         * @param  string $userid [员工id]
         * @return [array]         
         */
		public function findAdminUser($userid = ''){
            $where =$userid ? " user_id = $userid " : '';
			return $this->MysqlObj->find("admin_user",'user_id,user_name,role_id,user_state,reg_time', $where);
		}
        /**
         * 联合查询员工
         * @param  [number] $limit [查询条数]
         * @param  string $where [查询条件/位置]
         * @return [array]       
         */
        public function selectJoinAdminUser($limit,$where='user_id>0'){
        	return $this->MysqlObj->selectJoin("admin_user", "admin_role", 'admin_user.user_id,admin_user.user_name,admin_user.role_id,admin_user.user_state,admin_user.reg_time,admin_role.role_name', "admin_user.role_id=admin_role.role_id",$where,"user_id desc",$limit);
        }
        /**
         * 查询所有角色
         * @return [type] [description]
         */
        public function selecRole($limit='',$where='role_id>0'){
            return $this->MysqlObj->select("admin_role","*",$where,"role_id desc",$limit);
        }
        /**
         * 添加管理用户
         * @param [string] $value [添加的字段数据]
         */
		public function addAdminUser($value){
            return $this->MysqlObj->add("admin_user", "user_name,user_pwd,user_head,role_id", $value);
		}
        /**
         * 更新管理用户
         * @param  [string] $updateData [更新内容]
         * @param  string $where      [条件筛选/更新位置]
         * @return [type]             [description]
         */
		public function updateAdminUser($updateData,$where = 'user_id<0'){
			return $this->MysqlObj->edit("admin_user", $updateData, $where);
		}
		/**
		 * 添加角色
		 * @param  [string] $value [添加内容]
		 * @return [type] [description]
		 */
		public function addAdminRole($value){
            return $this->MysqlObj->add("admin_role", "role_name,role_pow", $value);
		}
		/**
		 * 删除角色
		 * @return [type] [description]
		 */
		public function delAdminRole($where = 'role_id<0'){
            return $this->MysqlObj->del("admin_role",$where);
		}
		/**
		 * 更新角色
		 * @return [type] [更新内容]
		 */
		public function updateAdminRole($updateData,$where = 'role_id<0'){
            return $this->MysqlObj->edit("admin_role", $updateData, $where);
		}
   }
?>