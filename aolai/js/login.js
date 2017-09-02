$(function(){
	$(".login-frame").on("click",".submit",function(e){
		e.preventDefault();
		var username = $('.username').val();
		var password = $('.password').val();
		var check = $('.check').is(':checked');
		$.ajax({
			type: 'post',
			url: 'http://localhost/aolai/php/login.php',
			data: {username:username,password:password},
			async: true,
			dataType: 'json',
			success:function(data){
				if(data.status == 1){
					if(check){
						$.cookie("user",$('.username').val(),{expires:30,path:'/'});
						$.cookie("pwd",$('.password').val(),{expires:30,path:'/'});
					}
					location.href = "index.html";
				}else{
					alert(data.msg);
				}
			},
			error:function(data){
				console.log(data.msg);
			}
		})
	});
})