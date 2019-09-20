<?php
  /**
  * 资源模型
  */
  class SourceModel extends Model{
   	public function __construct(){
   		parent::__construct();//调用父类公共模型构造函数，实例化数据库操作DAO层并调用打开数据库方法
   	}
	/**
	 * 查询分类信息
	 * @param  string $fields [字段名]
	 * @param  string $where  [条件]
	 * @param  string $order  [排序]
	 * @param  string $limit  [限制条件]
	 * @return [type]         [description]
	 */
	public function selectClassify($fields = '*', $where = '', $order = '', $limit = ''){
		return $this->MysqlObj->select("video_classify", $fields, $where, $order, $limit);
	}
    /**
     * 添加分类信息
     * @param [type] $value [添加内容]
     * @return [bool]   
     */
	public function addClassify($value){
		return $this->MysqlObj->add("video_classify", "classify_name,parent_id,rank", $value);
	}
    /**
     * 更新分类信息
     * @param  [type] $updateData [更新内容]
     * @param  string $where      [条件]
     * @return [bool]             
     */
	public function updateClassify($updateData,$where = 'id<0'){
        return $this->MysqlObj->edit("video_classify", $updateData, $where);
	}
	/**
	 * 删除分类信息
	 * @param  string $where [条件]
	 * @return [bool]       
	 */
	public function delClassify($where = 'classify_id<0'){
		return $this->MysqlObj->del("video_classify", $where);
	}
    /**
     * 联合查询资源
     * @param  [number] $limit [查询条数]
     * @param  string $where [查询条件/位置]
     * @return [array]       
     */
    public function selectJoinVideoResouce($limit,$where='video_id>0'){
    	return $this->MysqlObj->selectJoin("video_resouce", "video_classify", 'video_resouce.*,video_classify.classify_name', "video_resouce.classify_id=video_classify.classify_id",$where,"video_id desc",$limit);
    }
    /**
     * 删除单个资源
     * @param  string $where [条件]
     * @return [type]        [description]
     */
    public function delVideo($where = 'video_id<0'){
        return $this->MysqlObj->del("video_resouce", $where);
    }
    /**
     * 添加单个资源
     * @param [type] $value [添加内容]
     */
    public function addVideo($value){
    	return $this->MysqlObj->add("video_resouce", "classify_id,vip_type,video_img,video_file,video_name,video_director,video_actor,video_area,video_detail", $value);
    }
    /**
     * 修改单个资源
     * @return [type] [description]
     */
    public function editVideo($updateData,$where = 'video_id<0'){
        return $this->MysqlObj->edit("video_resouce", $updateData, $where);
    }
	/**
	 * 查询单个资源
	 * @param  [string] $fields [字段名]
	 * @param  string $where  [条件]
	 * @return [array]
	 */
	public function findVideo($fields='*',$where = 'video_id>0'){
		return $this->MysqlObj->find("video_resouce", $fields, $where);
	}
  }
?>