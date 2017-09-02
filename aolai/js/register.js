$(function(){
	var onOff1 = false;
	var onOff2 = false;
	var onOff3 = false;
	var onOff4 = false;
	var onOff5 = false;
	$('.username').blur(function(){
		var username = $('.username').val();
		if(/^1((3[0-9])|(4[5-7])|(5[0-3])|(7[0-9])|(8[0-9]))\d{8}$/.test(username)){
			$(this).parents('ul').find('.error').eq(0).html('');
			onOff1 = true;
		}else if(username == ""){
			$(this).parents('ul').find('.error').eq(0).html('');
		}else if(username instanceof Number == false){
			$(this).parents('ul').find('.error').eq(0).html('账号暂时只开放手机号码注册').css("color","#f34");
		}else{
			$(this).parents('ul').find('.error').eq(0).html('账号暂时只开放手机号码注册').css("color","#f34");
		}
	});
	$('.pwd').blur(function(){
		var pwd = $('.pwd').val();
		if(/^.{6,20}$/.test(pwd)){
			$(this).parents('ul').find('.error').eq(1).html('');
			onOff5 = true;
		}else if(pwd.length == ''){
			$(this).parents('ul').find('.error').eq(1).html('');
		}else{
			$(this).parents('ul').find('.error').eq(1).html('密码长度只能在6-20位字符之间').css("color","#f34");
		}
	});
	$('.pwds').blur(function(){
		var pwds = $('.pwds').val();
		if(pwds == $('.pwd').val()){
			$(this).parents('ul').find('.error').eq(2).html('');
			onOff2 = true;
		}else if(pwds.length == ''){
			$(this).parents('ul').find('.error').eq(2).html('');
		}else{
			$(this).parents('ul').find('.error').eq(2).html('两次输入密码不一致').css("color","#f34");
		}
	});
	var verifyCode = new GVerify("v_container");
	$('#code_input').blur(function(){
		var res = verifyCode.validate($("#code_input").val());
		if(res){
			$(this).parents('ul').find('.error').eq(3).html('');
			onOff3 = true;
		}else if(res == ''){
			$(this).parents('ul').find('.error').eq(3).html('请输入验证码');
		}else{
			$(this).parents('ul').find('.error').eq(3).html('验证码错误').css("color","#f34");
		}
	});
	$('.shortmessage').blur(function(){
		var shortmessage = $('.shortmessage').val();
		if(shortmessage==1234){
			$(this).parents('ul').find('.error').eq(4).html('');
			onOff4 = true;
		}else{
			$(this).parents('ul').find('.error').eq(4).html('短信验证码错误').css("color","#f34");
		}
	})
	$('.username').focus(function(){
		$(this).parents('ul').find('.error').eq(0).html('请输入注册的手机号');
	});
	$('.pwd').focus(function(){
		$(this).parents('ul').find('.error').eq(1).html('6-20位字符之间、数字或字符的组合');
	});
	$('.pwds').focus(function(){
		$(this).parents('ul').find('.error').eq(2).html('请在次输入密码');
	});
	$('#code_input').focus(function(){
		$(this).parents('ul').find('.error').eq(3).html('请输入验证码').css("color","#f34");
	});
	$('#yzm').click(function(){
		var min = 60;
		var timer = setInterval(() => {
		  min--;
		  $('#yzm').val(min+'s');
		  if(min <= 0){
			$('#yzm').val('获取验证码');
			clearInterval(timer);
		}
		}, 1000)
	});
	$('.shortmessage').focus(function(){
		$(this).parents('ul').find('.error').eq(4).html('请输入短信验证码');
	});

	$('.submit').click(function(){
		var username = $('.username').val();
		var password = $('.pwds').val();
		var check = $('.check').is(':checked');
		if(onOff1 && onOff2 && onOff3 && onOff4 &&onOff5 && check){
			$.ajax({
				type: 'post',
				url: 'http://localhost/aolai/php/register.php',
				data:{username:username,password:password},
				async: true,
				dataType: 'json',
				success:function(data){
					if(data.status == 1){
						alert(data.msg);
						location.href = "login.html";
					}else{
						alert(data.msg);
					}
				},
				error:function(data){
					console.log(data);
				}
			})
		}else{
			alert("请正确填写信息！");
		}
	});
})