$(function(){
	goodsNum();
	userName();
	//检测购物车数量
	function goodsNum(){
	    var goodNum = 0;
	    var arr1 = $.cookie("cart");
	    if(arr1){
	    	arr1 = JSON.parse($.cookie("cart"));
		    for(var i=0;i<arr1.length;i++){
		        goodNum+=arr1[i].num;
		    }
		    $('.goodsNum').html(goodNum);
		    $.cookie("cart",JSON.stringify(arr1),{expires:30,path:'/'});
	    }
	}
	//检测用户名
	function userName(){
		var user = $.cookie("user");
		if(user){
			var obj = JSON.parse($.cookie("user"));
			$('.myname').html(obj).css("color","#ff3344");
		}
	}
});