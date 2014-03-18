<?php
	$_POST[''];
	$file=md5(rand());
	chdir('logs');
	if(!file_exists($file)) {
		$fp = @fopen($file, "w"); // ("r" - считывать "w" - создавать "a" - добовлять к тексту)
		@fclose ($fp);
	} 
	$text=$_POST['tofile'];
	$ln=strlen($text);
	$con=0;
	//for ($i=0;$i<$ln;$i++)
	//{
	//	if (($text{i}=='&')&&($text{i+1}=='g')&&($text{i+2}=='t')){$text{i}="&#62;";$text{i+1}='';$text{i+2}='';$con++;}
	//}
	$text=html_entity_decode($text);
	$fp=@fopen($file,"a");
	//$t=date("D M j G:i:s T Y");
	@fwrite($fp,"Game ID: ".$file);
	@fwrite($fp,$_POST['tofile']);
	@fwrite($fp," \r\n ###################");
	@fclose($fp);
	print $file;
