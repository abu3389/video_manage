<?php 
class MysqlDb{
	public $obj;
	public static $instance;
	private function __construct($host, $user, $pwd, $dbname, $port = '3306'){
		$this->obj = new mysqli($host, $user, $pwd, $dbname, $port);
		if($this->obj->connect_errno != 0){
			$this->sqlLog(PUBLICLOG."connectError.log", '数据库连接失败,错误信息：'.$this->obj->connect_error);
		}
	}
	/**
	 * 返回数据库对象
	 * @return [type] [description]
	 */
	public static function getMysqlObj($host='127.0.0.1', $user='root', $pwd='root', $dbname='video_manage'){
		if(!self::$instance instanceof MysqlDb){//self
			self::$instance = new MysqlDb($host, $user, $pwd, $dbname);
		}
		return self::$instance;
	}

	/**
	 * [查询单条记录]
	 * @param  [type] $tableName [description]
	 * @param  string $fields    [description]
	 * @param  string $where     [description]
	 * @return [array] [description]
	 */
	public function find($tableName, $fields = '*', $where = ''){
		$where = $where != '' ? " where $where " : '';
		$sql = "select $fields from $tableName $where limit 1";
		$this->sqlLog(PUBLICLOG.$tableName.'.log', ' 语句：'.$sql);
		$result = $this->querySql($sql);
		return $result !== false && $result->num_rows > 0 ? $result->fetch_assoc() : array();
	}

	/**
	 * [查询多条记录]
	 * @param  [string] $tableName [description]
	 * @param  string $fields    [description]
	 * @param  string $where     [description]
	 * @param  string $order     [description]
	 * @param  string $limit     [description]
	 * @return [array] [description]
	 */
	public function select($tableName, $fields = '*', $where = '', $order = '', $limit = ''){
		$where = $where != '' ? "where $where " : '';
		$order = $order != '' ? "order by $order " : '';
		$limit = $limit != '' ? "limit $limit " : '';
		$sql = "select $fields from $tableName $where $order $limit ";
		$this->sqlLog(PUBLICLOG.$tableName.'.log', ' 语句：'.$sql);
		$result = $this->querySql($sql);
		return $result !== false && $result->num_rows > 0 ? $result->fetch_all(MYSQL_ASSOC) : array();
	}
    /**
     * [内联查询]
     * @param  [type] $table1Name [description]
     * @param  [type] $table2Name [description]
     * @param  string $fields     [description]
     * @param  [type] $condition  [description]
     * @return [type]             [description]
     */
	public function selectJoin($table1Name, $table2Name, $fields = '*', $on = '',$where = '', $order = '', $limit = ''){
		$on = $on != '' ? "on $on " : '';
		$where = $where != '' ? "where $where " : '';
		$order = $order != '' ? "order by $order " : '';
		$limit = $limit != '' ? "limit $limit " : '';	
		$sql = "select $fields from $table1Name inner join $table2Name $on $where $order $limit";
		$this->sqlLog(PUBLICLOG.$table1Name.'.log', ' 语句：'.$sql);
		$result = $this->querySql($sql);
		return $result !== false && $result->num_rows > 0 ? $result->fetch_all(MYSQL_ASSOC) : array();
	}
    /**
     * [左联查询]
     * @param  [type] $table1Name [description]
     * @param  [type] $table2Name [description]
     * @param  string $fields     [description]
     * @param  [type] $condition  [description]
     * @return [type]             [description]
     */
	public function selectLeftJoin($table1Name, $table2Name, $fields = '*', $on = '',$where = '', $order = '', $limit = ''){
		$on = $on != '' ? "on $on " : '';
		$where = $where != '' ? "where $where " : '';
		$order = $order != '' ? "order by $order " : '';
		$limit = $limit != '' ? "limit $limit " : '';	
		$sql = "select $fields from $table1Name left outer join $table2Name $on $where $order $limit";
		$this->sqlLog(PUBLICLOG.$table1Name.'.log', ' 语句：'.$sql);
		$result = $this->querySql($sql);
		return $result !== false && $result->num_rows > 0 ? $result->fetch_all(MYSQL_ASSOC) : array();
	}	
	/**
	 * 添加数据
	 * @param [string] $tableName [description]
	 * @param [string] $fields    [description]
	 * @param [string] $value     [description]
	 */
	public function add($tableName, $fields, $value){
		if(!empty($fields) && !empty($value)){
			$sql = " insert into $tableName ($fields) values ($value) ";
			$this->sqlLog(PUBLICLOG.$tableName.'.log', ' 语句：'.$sql);
			$result = $this->querySql($sql);
			return $result === true ? $this->getLastId() : false;
		}else{
			return false;
		}
	}
	/**
	 * 修改
	 * @param  [string] $tableName  [description]
	 * @param  [string] $updateData [description]
	 * @param  string $where      [description]
	 * @return boolean
	 */
	public function edit($tableName, $updateData, $where = 'id<0'){
		$where = $where != '' ? " where $where " : '';
		if(!empty($where) && !empty($updateData)){
			$sql = "update $tableName set $updateData $where ";
			$this->sqlLog(PUBLICLOG.$tableName.'.log', ' 语句：'.$sql);
			return $this->querySql($sql);
		}else{
			return false;
		}
	}
	/**
	 * 删除
	 * @param  [string] $tableName [description]
	 * @param  string $where     [description]
	 * @return boolean
	 */
	public function del($tableName, $where = 'id<0'){
		$where = $where != '' ? " where $where " : '';
		if(!empty($where)){
			$sql = "delete from $tableName $where ";
			$this->sqlLog(PUBLICLOG.$tableName.'.log', ' 语句：'.$sql);
			return $this->querySql($sql);
		}else{
			return false;
		}
	}
	/**
	 * 执行sql语句
	 * @param  [type] $sql [description]
	 * @return [type]      [description]
	 */
	public function querySql($sql){
		return $this->obj->query($sql);
	}
	/**
	 * 获取刚刚写入数据的ID
	 * @return [type] [description]
	 */
	public function getLastId(){
		return $this->obj->insert_id;
	}
	/**
	 * 执行连表操作
	 * @param  [type] $sql [description]
	 * @return [type]      [description]
	 */
	public function execSql($sql){
		$result = $this->querySql($sql);
		return $result !== false && $result->num_rows > 0 ? $result->fetch_all(MYSQL_ASSOC) : array();
	}

	/**
	 * 记录日志
	 * @param  [string] $filename [description]
	 * @param  [string] $sql      [description]
	 */
	public function sqlLog($filename, $msg){
		file_put_contents($filename, @date("Y-m-d H:i:s", time()).$msg.PHP_EOL, FILE_APPEND);
	}
	/**
	 * 释放链接
	 */
	public function __destruct(){
		$this->obj->close();
	}
}
?>