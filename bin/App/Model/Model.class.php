<?php
require "Frework/Core/MysqlDb.class.php";
class Model{
	public $MysqlObj;
	public function __construct(){
		$this->MysqlObj = MysqlDb::getMysqlObj();
	}
	/**
	 * 发送数据
	 * @param  [type] $result [数据]
	 * @param  [type] $action [请求名称]
	 * @return [type]         [description]
	 */
	public function sendResult($result='',$action){
	    if(!empty($result)){
		    echo json_encode(array("errorCode"=>10000,"errorMsg"=>$action.'请求成功',"data"=>$result));
	    }else{
	        echo json_encode(array("errorCode"=>10001,"errorMsg"=>$action.'请求失败',"data"=>array()));
        }
	}
	/**
	 * 验证码校验
	 * @param  [string] $codetag [验证码标识]
	 * @param  [string] $Code    [输入的验证码]
	 * @return [bool]
	 */
	public function checkCode($codetag,$Code){
        //判断session是否存在验证码
        if(!empty($_SESSION['code'])){
        	$acode=$_SESSION['code'];//获取session验证码
        	$codeok=false;
        	//比对用户输入值与session
        	if($acode['code']==$Code || strtolower($acode['code'])==$Code || strtoupper($acode['code'])==$Code && $acode['id']==$codetag){
        		$codeok=true;//标记验证码是否正确
        	}
        	return $codeok;
        }
	}
	/**
	 * 跳转
	 * @param  [type] $url  [链接]
	 * @param  [type] $time [跳转等待时间]
	 * @return [type]       [description]
	 */
	public function goToUrl($url, $time){
        header("Refresh:".$time.";url=".$url);
        exit;
    }
    /**
     * 统计表单总条数
     * @param  [string] $tableName [表名]
     * @return [type]            [description]
     */
	public function getCount($tableName,$where=''){
		return $this->MysqlObj->find($tableName,'count(*) as sum',$where);
	}
    /**
     * 显示分页按钮
     * @param  [string]  $nowpage   [当前页]
     * @param  integer $pageSize  [分页大小]
     * @param  [string]  $pagefun   [分页点击调用的方法名]
     * @param  [string]  $count [总条数]
     * @return [array]             [description]
     */
	public function showPage($nowpage,$pageSize=5,$pagefun,$count){
        $page = !empty($nowpage) && intval($nowpage) > 0 ? $nowpage : 1;
        $start = ($page-1)*$pageSize;
        $limit = "$start,$pageSize";
        $sum = !empty($count['sum']) ? $count['sum'] : 0;
        //设置分页参数
        $param = array("total_rows"=>$sum,"method"=>'ajax',"ajax_func_name"=>$pagefun,"now_page"=>$page,"list_rows"=>$pageSize);
        $page = new Core_Page($param);
        $pages = $page->show(1);//返回分页标签
        return array("pages"=>$pages,"limit"=>$limit,"sum"=>$sum);
	}
	/**
     * 上传文件
     * @return [bool] [description]
     */
    public function uploadFile($file,$type){
    	if(!empty($file)){
		    $name = $file['name'];//获取文件名
			//获取文件后缀
			$info = explode('.', $name);
			$ext = $info[(count($info)-1)];
			$tmpName = $file['tmp_name'];//获取文件路径
			$error = $file['error'];//获取错误信息
			//判断文件格式是否为图片
			if($type==1 && $ext=='jpg' || $ext=='png' || $ext=='gif' || $ext=='bmp'){
				if(0 === $error){
					$newTmpName='./Public/Images/video_img/';//存放的文件夹路径
					$newfile= $newTmpName.time().'.'.$ext;//设置文件名称
					move_uploaded_file($tmpName,$newfile);//保存文件
					return $newfile;//返回结果
				}	    
			}
			//判断文件格式是否为视频
			if($type==2 && $ext=='mp4' || $ext=='avi' || $ext=='wmv' || $ext=='rmvb' || $ext=='mpeg'){
				if(0 === $error){
					$newTmpName='./Public/Video/';//存放的文件夹路径
					$newfile= $newTmpName.time().'.'.$ext;//设置文件名称
					move_uploaded_file($tmpName,$newfile);//保存文件
					return $newfile;//追加结果
				}	    
			}
		}
    }
}
?>