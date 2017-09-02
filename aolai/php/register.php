<?php
header('Access-Control-Allow-Origin: *');
header("content-type:text/html;chartset=utf8");
$username = $_POST["username"];
$password = $_POST["password"];

//返回状态类
class Res{
	public $status;
	public $msg;
}
//链接数据库
$conn = new mysqli("127.0.0.1","root","root","user") or die("链接失败！");
//判断用户是否存在
$sql = "select * from user where username='$username'";
$result = $conn->query($sql);

if($result && $result->num_rows>0){
	$res = new Res();
    $res->status = 0;
    $res->msg = "该用户名已经被注册,请更换用户名";
    echo json_encode($res);
}else{
	$sql = "insert into user(username,password) values('$username','$password')";
	$result = $conn->query($sql);
	if($result){
		$res = new Res();
	    $res->status = 1;
	    $res->msg = "恭喜注册成功";
	    echo json_encode($res);
	}else{
		$res = new Res();
		$res->status = 2;
		$res->msg = "注册失败，稍后再试";
		echo json_encode($res);
	}
}

$conn->close();



 ?>