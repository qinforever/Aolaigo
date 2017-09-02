<?php
header('Access-Control-Allow-Origin: *');
$username = $_POST['username'];
$password = $_POST['password'];

class Res{
	public $status;
	public $msg;
}
//数据库匹配
$conn = new mysqli("127.0.0.1","root","root","user") or die("连接失败");
$sql = "select * from user where username='$username' and password='$password'";
$result = $conn->query($sql);
//如果有
if($result && $result->num_rows>0){
	$res = new Res();
	$res->status = 1;
	$res->msg = "登陆成功";
	echo json_encode($res);
}else{
	$res = new Res();
	$res->status = 0;
	$res->msg = "用户名或密码错误，请重新输入";
	echo json_encode($res);
}
$conn->close();

 ?>