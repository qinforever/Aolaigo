//截取问号
var params = location.search.substring(1);
//把整个lu'you路由传到函数去除我要的ID值
var Gid = paramsGet(params,"id");
//获取和当前id相同的商品数据
 $.ajax({
    type: 'get',
    url: './json/seckill.json',
    async: true,
    data:{},
    dataType:'json',
    success:function (data) {
        for (var i = 0; i < data.length; i++) {
        	if(data[i].id == Gid){
        		var obj = data[i];
        		goodsData(obj);
                magnifier();
        		break;
        	}
        }
    },
    error:function () {
        alert("获取数据失败！");
    }
});

//商品数据渲染   只传过来一个商品信息所以不需要创建节点渲染
function goodsData(obj){
    for(var j=0;j<obj.imgs.length;j++){
         $("<li class='smallImg'><img src="+ obj.imgs[j] +"></li>").appendTo('.pt-data-lt-1 ul');
    }
    for(var k=0;k<obj.bigImg.length;k++){
        $("<img class='bigImg' src="+ obj.bigImg[k] +">").appendTo(".pt-data-lt-2");
    }
    $('.bigImg').eq(0).show().siblings().hide();
    $('.smallImg').mouseenter(function(){
        var index = $(this).index();
        $(this).parents('.pt-data-lt-1').siblings().children('img').eq(index).show().siblings('img').hide();
    });
    $("<img class='bigImgs' />").appendTo('.pt-data-lt-3');
    $('.pt-data-lt-2').on('mouseenter','img',function(){
        var Src = $(this).attr('src');
        $(".pt-data-lt-3 img").attr('src',Src);
    })

	$(".breadcrumb .goodsname").html(obj.name);
	$(".productTitle b").html(obj.name);
	$(".data-me-red p").eq(0).html(obj.festivalTa);
	$(".data-me-red p").eq(1).html(obj.festivalTb);
	$(".data-pval .price").html(obj.unit+obj.price);
	$(".data-pval del").html(obj.unit+obj.del);
	$(".data-sale .reduce-price").html(obj.discount);
	for(let i=0;i<obj.color.length;i++){
		$("<span>"+obj.color[i]+"</span>").appendTo(".goodsColor");
	}
	for(let i=0;i<obj.size.length;i++){
		$("<span>"+obj.size[i]+"</span>").appendTo(".goodsSize");
	}
    $(".goodsColor span").eq(0).addClass("active")
    $(".goodsColor .i-core").appendTo( $(".goodsColor span:first") );
    $(".goodsSize span").eq(0).addClass("active");
    $(".goodsSize .i-core").appendTo( $(".goodsSize span:first") );

    var oldColor = $(".goodsColor").children(".active").clone();
    oldColor.find(':nth-child(1)').remove();
    youngColor = oldColor.html();

    var oldSize = $(".goodsSize").children(".active").clone();
    oldSize.find(':nth-child(1)').remove();
    youngSize = oldSize.html();
}

//放大镜
function magnifier(){
    //等比公式
    //小图width/大图width == 小区域width/大区域width
    $(".smallArea").width( $(".pt-data-lt-2").width() * $(".pt-data-lt-3").width() / $(".bigImgs").width() );
    $(".smallArea").height( $(".pt-data-lt-2").height() * $(".pt-data-lt-3").height() / $(".bigImgs").height() );
    //放大系数
    var scale = $(".bigImgs").width() / $(".pt-data-lt-2").width();
    //在小图中移动
    $(".pt-data-lt-2").mousemove(function(e){
        $(".smallArea").show(); //显示小区域
        $(".pt-data-lt-3").show(); //显示大区域
        var x = e.pageX - $(".pt-data-lt-2").offset().left - $(".smallArea").width()/2;
        var y = e.pageY - $(".pt-data-lt-2").offset().top - $(".smallArea").height()/2;
        //控制不超出左右边界
        if (x < 0){
            x = 0;
        }
        else if (x > $(".pt-data-lt-2").width()-$(".smallArea").width()){
            x = $(".pt-data-lt-2").width()-$(".smallArea").width();
        }
        //控制不超出上下边界
        if (y < 0){
            y = 0
        }
        else if (y > $(".pt-data-lt-2").height()-$(".smallArea").height()) {
            y = $(".pt-data-lt-2").height()-$(".smallArea").height();
        }
        //小区域移动
        $(".smallArea").css({left:x, top:y});
        //大图移动
        $(".bigImgs").css({left: -scale*x,top: -scale*y});
    })
    //移除小图
    $(".pt-data-lt-2").mouseleave(function(){
        $(".smallArea").hide(); //隐藏小区域
        $(".pt-data-lt-3").hide(); //隐藏大区域
    })
}
var youngColor = '';
var youngSize = '';
//选择颜色
$(".goodsColor").on("click","span",function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(".goodsColor .i-core").appendTo( $(this) );
    var oldColor = $(".goodsColor").children(".active").clone();
    oldColor.find(':nth-child(1)').remove();
    youngColor = oldColor.html();
});
//选择尺码
$(".goodsSize").on("click","span",function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(".goodsSize .i-core").appendTo( $(this) );
    var oldSize = $(".goodsSize").children(".active").clone();
    oldSize.find(':nth-child(1)').remove();
    youngSize = oldSize.html();
});

//控制商品数量加减
var goodsNumber = parseInt( $("#buyNum").val() );
$(".pt-ns .buyAdd").click(function(){
	goodsNumber++;
	 $("#buyNum").val(goodsNumber);
});
$(".pt-ns .buyReduce").click(function(){
	goodsNumber--;
	if(goodsNumber < 1){
		goodsNumber = 1;
	}
	$("#buyNum").val(goodsNumber);
});
//商品添加到cookie 实现购物车
var arr = $.cookie("cart")?JSON.parse($.cookie("cart")):[];
var onOff = false;
$("#addCart").click(function(e){
    e.stopPropagation();
    console.log(youngColor)
    var obj = {id:Gid,color:youngColor,size:youngSize,img:$(".pt-data-lt-2 img").attr("src"),price:$(".data-pval del").html(),discount:$(".data-saleli2 .reduce-price").html(),num:1,ischecked:true,name:$(".productTitle b").html()};
   //加入购物车 如果存在相同则数量添加
    for(var i=0;i<arr.length;i++){
        if(arr[i].id == obj.id){
            arr[i].num+=goodsNumber;
            onOff = true;
            $("#buyNum").val(1);
            break;
        }
    }
    //如果与数组不相同则新添加到新数组中
    if(!onOff){
        obj.num=goodsNumber;
        arr.push(obj);
        $("#buyNum").val(1);
    }
    $.cookie("cart",JSON.stringify(arr),{expires:30,path:'/'});
    console.log($.cookie("cart"))
    goodsNum();
});
//总数量
function goodsNum(){
    var goodNum = 0;
    var arr1 = JSON.parse($.cookie("cart"));
    for(var i=0;i<arr1.length;i++){
        goodNum+=arr1[i].num;
    }
    $('.goodsNum').html(goodNum);
    $.cookie("cart",JSON.stringify(arr1),{expires:30,path:'/'});
}
//加入购物车动画
var offset = $("#end").offset();  //结束的地方的元素
$("#addCart").click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
    var img = $('.smallImg img').eq(0).attr('src');
    var flyer = $('<img class="u-flyer" src="'+img+'">');
    flyer.fly({
        //开始位置
        start: {
            left: event.clientX,
            top: event.clientY
        },
        //结束位置
        end: {
            left: offset.left,
            top: offset.top,
            width: 0,
            height: 0
        },
        //结束后
        onEnd: function(){
            $("#msg").show().animate({width: '180px'}, 200).fadeOut(2000);
            flyer.remove();
        }
    });
});

$.ajax({
    type: 'get',
    url: './json/recommend.json',
    async: true,
    data: {},
    dataType: 'json',
    success:function(data){
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            $("<li><img src="+ obj.recommend +">"+"<div class='price'>"+ obj.unit + obj.price +"</div></li>").appendTo('.tj-list ul');
        }
        //推荐产品
        $('.tj-list').kxbdSuperMarquee({
            distance:157,
            time:3,
            btnGo:{up:'.less',down:'.unfold'},
            direction:'down'
        });
    }
});

//详情tab
$(".goods-introduce").children("ul").eq(0).show();
$(".submenua span").click(function(){
    var index = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(this).parents(".goods-introduce").children("ul").eq(index).show().siblings("ul").hide();
});

//拿到路由id
function paramsGet(params,key){
    var arr =  params.split("&");
    for (var i=0;i<arr.length;i++) {
		var str = arr[i];
		var arr2 = str.split("=");
		for(var i=0;i<arr2.length;i++){
			if(arr2[0] == key){
				return arr2[1];
			}
		}
    }
    return "";
}


// var shangpingCookieArr = [];
// var isHave = false;
// if($.cookie("shangpingS")){
//     shangpingCookieArr = JSON.parse($.cookie("shangpingS"));
// }
// $("#addCart").click(function(e){
//     e.stopPropagation();
//     var shangping = {id:Gid,name:$(".productTitle b").html(),num:1};
//     for(var i=0;i<shangpingCookieArr.length;i++){
//         if(shangping.id==shangpingCookieArr[i].id){
//             shangpingCookieArr[i].num++;
//             isHave = true;
//             break;
//         }
//     }
//     if(!isHave){
//         shangpingCookieArr.push(shangping);
//     }

//     $.cookie("shangpingS",JSON.stringify(shangpingCookieArr),{expires:30,path:'/'})
//     console.log($.cookie("shangpingS"))
// })
