<?php
  /**
  * 视频资源控制器
  */
  class SourceController{
    public $obj;//资源操作模型对象
  	public function __construct(){
  		$this->obj = new SourceModel();
  	}
  	/**
  	 * 获取分类信息
  	 * @return [type] [description]
  	 */
  	public function getClassify(){
        $result=$this->obj->selectClassify('*','','rank');
        $this->obj->sendResult($result,"获取分类信息");
  	}
  	/**
  	 * 添加分类信息
  	 * @return [type] [description]
  	 */
  	public function addClassify(){
  	   $info = json_decode(file_get_contents("php://input"), true);
  	   //获取分类名
  	   $classifyname=$info["classifyname"];
  	   //获取上级分类id
  	   $parentid=$info["parentid"];
  	   //获取前置分类id
  	   $preid=$info["preid"];
  	   //判断有无前置分类
  	   if($preid=="0"){
            //无前置分类直接添加信息
	        $result=$this->obj->addClassify("'$classifyname','$parentid','0'");
	        $this->obj->sendResult($result,"添加分类信息");
  	   }else{
            //获取前置分类的rank
            $result1=$this->obj->selectClassify("rank","classify_id='$preid'","",1);
            $preRank=$result1[0]["rank"];
            //设置添加节点的rank
            $nowRank=intval($preRank)+1;
            //更新该同级子节点以下的前置分类的前置id+1,挪出位置放添加的子节点
            $result2=$this->obj->updateClassify("rank= rank+1","parent_id='$parentid' and rank>'$preRank'");
	  	    //添加分类信息
	        $result3=$this->obj->addClassify("'$classifyname','$parentid','$nowRank'");
	        $this->obj->sendResult($result3,"添加分类信息");
  	    }
    }
    /**
     * 删除分类信息
     * @return [type] [description]
     */
    public function delClassify(){
        $info = json_decode(file_get_contents("php://input"), true);
        //获取选中id拼接的字符串
        $str=$info["strclassifyId"];
        $result=$this->obj->delClassify("classify_id in ($str)");
        $this->obj->sendResult($result,"删除分类信息");
    }
    /**
     * 更新分类信息
     * @return [type] [description]
     */
    public function updateClassify(){
    	$info = json_decode(file_get_contents("php://input"), true);
    	//获取分类id
    	$classifyId=$info["classifyId"];
  	    //获取分类名
  	    $classifyname=$info["classifyname"];
  	    //获取上级分类id
  	    $parentid=$info["parentid"];
  	    //获取前置分类id
  	    $preid=$info["preid"];
  	    //判断有无前置分类
  	    if($preid=="0"){
            //无前置分类直接添加信息
	        $result=$this->obj->addClassify("'$classifyname','$parentid','0'");
	        $this->obj->sendResult($result,"添加分类信息");
  	    }else{
            //获取前置分类的rank
            $result1=$this->obj->selectClassify("rank","classify_id='$preid'","",1);
            $preRank=$result1[0]["rank"];
            //设置添加节点的rank
            $nowRank=intval($preRank)+1;
            //更新该同级子节点以下的前置分类的前置id+1,挪出位置放添加的子节点
            $result2=$this->obj->updateClassify("rank= rank+1","parent_id='$parentid' and rank>'$preRank'");
	  	    //删除分类信息
	  	    $result3=$this->obj->updateClassify("classify_name='$classifyname',parent_id='$parentid',rank='$nowRank'","classify_id='$classifyId'");
	        $this->obj->sendResult($result3,"删除分类信息");
  	    }
    }
    /**
     * 获取资源信息（分页方式获取）
     * @return [type] [description]
     */
    public function getVideoList(){
        $info = json_decode(file_get_contents("php://input"), true);
        //判断是否有关键词
        $str='';
        if(!empty($info["keyword_"])){
        	$str.=' ( ';
	        //设置查询条件
	        foreach($info["keyword_"] as $key=>$value){
	            if($key== count($info["keyword_"])-1){
	               $str.=" video_resouce.video_name like '%$value%' ";
	               break;
	            }
	            $str.=" video_resouce.video_name like '%$value%' or ";
	        }
	        $str.=' ) ';
        }
        //判断是否有分类下拉框筛选
        if(!empty($info["classify_"])){
        	$classifyid=$info["classify_"];
        	//判断不为总分类的时候才添加条件
        	if($classifyid!="1"){
        		$str.=" and video_resouce.classify_id = '$classifyid' ";
        	}	        
        }
        $count = $this->obj->getCount('video_resouce',$str);//获取员工信息总条数
        $pages = $this->obj->showPage($info['page_'],5,'goToPage',$count);//获取分页
        $list = $this->obj->selectJoinVideoResouce($pages["limit"],$str);//获取单页员工信息
        //构造资源信息包
        $videoinfo=array("videolist"=>$list,"page"=>$pages["pages"],"listnum"=>$pages["sum"]);
        //发送资源信息包
        $this->obj->sendResult($videoinfo,"获取资源信息"); 
    }
    /**
    * 查询单个资源信息
    * @return [type] [description]
    */
    public function getVideoOne(){
      $info = json_decode(file_get_contents("php://input"), true);
      $vid=$info["vid"];//获取资源id
      $videoInfo=$this->obj->findVideo("*","video_id='$vid'");//获取资源信息
      $this->obj->sendResult($videoInfo,"获取单个资源信息");
    }
    /**
     * 删除资源
     * @return [type] [description]
     */
    public function delVideo(){
    	$info = json_decode(file_get_contents("php://input"), true);
    	$videoid=$info["video_id"];//获取资源id
        $result=$this->obj->delVideo("video_id='$videoid'");//执行删除语句
        //发送删除结果
        $this->obj->sendResult($result,"获取资源信息");  
    }
    /**
     * 添加/修改资源
     */
    public function addVideo(){
    	//判断是否传了封面图片
    	if(!empty($_FILES['photofile'])){
    		//上传文件,并获取文件路径
            $imgresult=$this->obj->uploadFile($_FILES['photofile'],1);
            //判断是否格式正确
            if($imgresult){
            	$imgsrc=$imgresult;//获取文件路径
            }else{
            	$this->obj->sendResult($imgresult,"图片上传");
            	exit;
            }
    	}else{
    		//直接获取文件路径
            $imgsrc=$_POST['photosrc'];
    	}
        //判断是否传了视频资源
    	if(!empty($_FILES['videofile'])){
    		//上传文件,并获取文件路径
            $videoresult=$this->obj->uploadFile($_FILES['videofile'],2);
            //判断是否格式正确
            if($videoresult){
            	$videosrc=$videoresult;//获取文件路径
            }else{
            	$this->obj->sendResult($videoresult,"资源上传");
            	exit;
            }
    	}else{
    		//直接获取文件路径
            $videosrc=$_POST['videosrc'];
    	}
    	//获取资源路径
        $classifyid=$_POST['classifyid'];//获取分类id
        $usertype=$_POST['usertype'];//获取用户类型
        $videoname=$_POST['videoname'];//获取资源名称
        $director=$_POST['director'];//获取导演
        $actor=$_POST['actor'];//获取主演
        $area=$_POST['area'];//获取地区
        $detail=$_POST['detail'];//获取简介
        //判断增加还是修改
        if(empty($_POST["videoid"])){
            //执行添加语句
            $result=$this->obj->addVideo("'$classifyid','$usertype','$imgsrc','$videosrc','$videoname','$director','$actor','$area','$detail'");
            $this->obj->sendResult($result,"添加资源信息");
        }else{
        	$vid=$_POST["videoid"];//获取资源id
            //执行添加语句
            $result=$this->obj->editVideo("classify_id='$classifyid',vip_type='$usertype',video_img='$imgsrc',video_file='$videosrc',video_name='$videoname',video_director='$director',video_actor='$actor',video_area='$area',video_detail='$detail'","video_id='$vid'");
            $this->obj->sendResult($result,"修改资源信息");
        }
    }
  }
?>