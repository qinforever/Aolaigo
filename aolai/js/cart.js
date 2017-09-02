//获取cookie 数据
refresh();
 //控制商品数量加减
$(".allList").on("click",".reducenum",function(){
	var index = $(this).index(".allList .reducenum");
	var arr = JSON.parse( $.cookie("cart") );
	arr[index].num--;
	if(arr[index].num <= 1){
		arr[index].num = 1;
	};
	$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
	refresh();
});
$(".allList").on("click",".addnum",function(){
	var index = $(this).index(".allList .addnum");
	var arr = JSON.parse( $.cookie("cart") );
	arr[index].num++;
	$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
	console.log($.cookie("cart"))
	refresh();
});
//删除
$(".allList").on("click",".delted",function(){
	var index = $(this).index(".allList .delted");
	var arr = JSON.parse( $.cookie("cart") );
	arr.splice(index,1);
	$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
	refresh();
});
//状态
$(".allList").on("click",".check",function(){
	var index = $(this).index(".allList .check");
	var arr = JSON.parse( $.cookie("cart") );
	arr[index].ischecked = !arr[index].ischecked;
	console.log(arr[index].ischecked);
	$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
	console.log($.cookie("cart"))
	refresh();
});

//全选
$("#selectAll").click(function(){
	var arr = JSON.parse( $.cookie("cart") );
	for(var i=0;i<arr.length;i++){
		if($(this).prop("checked")){
			arr[i].ischecked = true;
		}else{
			arr[i].ischecked = false;
		}
	}
	$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
	refresh();
})
function refresh(){
	var arr = $.cookie("cart");
	if(arr){
	    arr = JSON.parse(arr);
	    //清空所有子节点
	    $(".allList").empty();
	    if(arr.length > 0){
	    	var totalCommodity = 0;
	    	var preferentialAmount  = 0;
	    	var purchaseAmount = 0;
	        for(var i=0;i<arr.length;i++){
	            var obj = arr[i];
	            var aprice = parseInt(obj.price.substring(1));
	            var discount = parseInt(obj.discount);
	            var price = (aprice-obj.discount)*obj.num;
				$(".cart-title .goods-num").html(arr.length);
	            $(`<ul class='cart-list'>
	                <li class='alone-selected'><input class='check' type='checkbox' /></li>
	                <li class='goods-content'><div class='goods-sampic'><img src=${obj.img}></div><div class='goods-items'><h5>${obj.name}</h5><p><span>${obj.color}</span><span>${obj.size}</span></p></div></li>
	                <li>${obj.price}</li>
	                <li class='goodsnumber'><span class='reducenum'>-</span><input class='number' type='text' value=${obj.num}><span class='addnum'>+</span></li>
	                <li class='discount'><span class='discount-price'>￥${obj.discount}</span>优惠促销∧</li>
	                <li class='unitprice'>￥${price}</li>
	                <li><span class='collection'>移入收藏夹</span><span class='delted'>删除</span></li>
	                <div class='discount-time'>相约七夕 爱意之礼 前30名付款订单送电影票两张（用票截止时间8月31日） 活动时间：8.21 20:00-8.29 20:00</div>
	            </ul>`).appendTo( $(".allList") );
	            //勾选状态
				if(obj.ischecked==true){
					$(".check").eq(i).prop("checked","checked");
					totalCommodity=totalCommodity+aprice;
					preferentialAmount=preferentialAmount+discount;
					purchaseAmount=purchaseAmount+price;
				}else{
					console.log(1)
					$(".check").eq(i).prop("checked","");
				}
			}
			$('.totalCommodity').html(totalCommodity);
			$('.preferentialAmount').html(preferentialAmount);
			$('.purchaseAmount').html(purchaseAmount);
	    }else{
	        $('.cart-none').show();
	    }
	}else{
		$('.cart-none').show();
	}
}


