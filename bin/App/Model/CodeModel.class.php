<?php
/**
* 生成随机验证码图片
*/
class CodeModel{
   	public $codeNum;//验证码字符长度
   	public $codeImgWith;//图片宽度
   	public $codeImgHeight;//图片高度
   	public function __construct($codeNum,$codeImgWith,$codeImgHeight){
   		$this->codeNum=$codeNum;
   		$this->codeImgWith=$codeImgWith;
   		$this->codeImgHeight=$codeImgHeight;
   	}
   	//生成随机验证码
   	public function createCode(){
   		// echo $this->codeImgWith,$this->codeImgHeight;
        //创建画布
        $img = imagecreatetruecolor($this->codeImgWith,$this->codeImgHeight);
        //创建图片背景颜色
        $bgColor = imagecolorallocate($img, 255, 255, 255);
        //创建随机文字颜色
        $textColor =imagecolorallocate($img, mt_rand(1,255), mt_rand(1,255), mt_rand(1,255));
        //填充画布颜色
        imagefill($img, 0, 0, $bgColor);
        //字体路径
        $filename = 'Public/Font/STKAITI.TTF';
        //文字内容
        $text=$this->getChar();
        //插入文字
        imagettftext($img, 20,mt_rand(0,30), 10, $this->codeImgHeight, $textColor,$filename,$text);
        header("Content-type:image/jpeg");
        //添加像素点
        for($i = 1;$i< mt_rand(200,300);$i++){
			imagesetpixel($img, mt_rand(1,$this->codeImgWith),  mt_rand(1,$this->codeImgHeight), imagecolorallocate($img, mt_rand(1,255), mt_rand(1,255), mt_rand(1,255)));
		}
		//添加线段
		for($i = 1;$i<mt_rand(2,6);$i++){
			imageline($img, mt_rand(1, $this->codeImgWith/2),mt_rand(1, $this->codeImgHeight/2), mt_rand($this->codeImgWith/2, $this->codeImgWith),mt_rand($this->codeImgHeight/2, $this->codeImgHeight), imagecolorallocate($img, mt_rand(1,255), mt_rand(1,255), mt_rand(1,255)));
		}
        //显示图片        
        imagejpeg($img);
        //释放画布资源
        imagedestroy($img);
        //返回验证码字符串
        return $text;
   	}
   	//生成随机字母数字
   	public function getChar(){
   		$str="";
   		for($i=0;$i<$this->codeNum;$i++){
   			$randChooseNum=mt_rand(1,3);
   			switch($randChooseNum){
   				case 1:
            // 随机大写字母
   			    $strsub=chr(mt_rand(65,90));
   				break;
   				case 2:
             // 随机小写字母
   			    $strsub=chr(mt_rand(97,122));
   				break;
   				case 3:
            // 随机数字
   			    $strsub=chr(mt_rand(48,57));
   				break;
   			}
   			//转码
   			$str.=iconv("GB2312","UTF-8",$strsub);
   		}
   		return $str;
   	}
}

?>