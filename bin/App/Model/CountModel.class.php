<?php
   /**
   * 报表模型
   */
   class CountModel extends Model{
	   	public function __construct(){
	   		parent::__construct();//调用父类公共模型构造函数，实例化数据库操作DAO层并调用打开数据库方法
	   	}
	    /**
	     * 按月份统计需要的时间字段数量
	     * @param [type] $tableName [表名]
	     * @param [type] $timeField [时间戳字段名]
	     * @param [type] $startMonth [起始年月]
	     * @param [type] $endMonth   [终止年月]
	     */
	    public function CountFieldsByMount($tableName,$timeField,$startMonth,$endMonth){
            return $this->MysqlObj->select($tableName, "count(*) as sum,DATE_FORMAT($timeField,'%Y-%m') as month","DATE_FORMAT($timeField,'%Y-%m')>='$startMonth' AND DATE_FORMAT($timeField,'%Y-%m')<='$endMonth' GROUP BY DATE_FORMAT($timeField,'%Y-%m')");
	    }
	}   
?>