//seckill模块  数据渲染
let myData = [];
$(function(){
//轮播图渲染
$.ajax({
    type: 'get',
    url: './json/carousel.json',
    async: true,
    data: {},
    dataType: 'json',
    success:function(data){
        for (var i = 0; i < data.length; i++) {
            var arr = data[i];
            $("<li><img src="+ arr.url +"></li>").appendTo('.carouseSlider');
            var li = $("<li>"+ arr.id +"</li>").appendTo('.subScript');
        }
        animateCarousel();
    },
    error:function(){
    }
})
function animateCarousel(){
    //初始化显示第一张图
    $('.subScript').find('li').eq(0).addClass('active');
    $(".carouseSlider li").eq(0).show().siblings().hide();
    //图片总数量
    var size = $(".carouseSlider li").size(); //4
    //自动轮播
    var i = 0; //记录图片下标
    var timer = setInterval(function(){
        i++;
        move();
    }, 3000);
    //移动的函数
    function move(){
        //如果i超出了图片总数量
        if (i == size) {
            i = 0;//即将移动到2张图
        }
        //透明度切换到第i张图
       $('.carouseSlider li').eq(i).fadeIn().siblings().fadeOut();
        //改变ul2的按钮状态
        $(".subScript li").eq(i).removeClass().addClass("active").siblings().removeClass("active");
    }
    //li2上面的按钮
    $(".subScript li").hover(function(){
        var index = $(this).index();
        //console.log(index);
        i = index;
        move();
    });
    //点击
    $('.next').click(function(){
        i++;
        move();
    });
    $('.next').click(function(){
        i--;
        move();
    })
    //移入box, 移出box
    $(".carouseSlider").hover(function(){
        //移入, 关闭定时器
        clearInterval(timer);
    },function(){
        //移出, 重新开启定时器
        timer = setInterval(function(){
            i++;
            move();
        }, 3000);
    })
}
//第一模块渲染
$.ajax({
    type: 'get',
    url: './json/seckill.json',
    async: true,
    data:{},
    dataType:'json',
    success:function (data) {
        myData = data;
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var li = $("<li></li>").appendTo("#seckill-list");
            $("<img src="+ obj.img +">").appendTo(li);
            $("<div class='list-tit'>"+obj.name+"</div>").appendTo(li);
            $("<div class='price'><span>"+obj.unit+obj.price+"</span><del>"+obj.unit+obj.del+"</del></div>").appendTo(li);
        }
    },
    error:function () {
        alert("获取数据失败！");
    }
});

//点击商品进入商品详情
$("#seckill-list").on('click','li',function () {
    let index = $(this).index();
    let obj = myData[index];
    location.href = "goods-detail.html?id="+obj.id;
});

//右侧边栏
var subMenuTop = ($(window).height()-$(".right-guide").height())/2;
$(".right-guide").css("top",subMenuTop);
$(".right-guide li").hover(function(){
    $(this).find("em").stop(true).css("display","block").animate({"width":80,"left":-70},300);
},function(){
    $(this).find("em").css("display","none").animate({"width":50,"left":0},300);
})

//返回顶部
$(".returnTop").click(function(){
   $('body,html').animate({scrollTop:0},500);
 })

//匹配对应楼层滚动得到对应位置
$('.leftNav li').click(function(){
    $(this).addClass('active').siblings('li').removeClass('active');
    var index = $(this).index();
    console.log(index);
    var top = $('.shop-main').find('.slider').eq(index).offset().top;
    //移除scroll 时间
    $(window).off("scroll");
    $("html,body").animate({scrollTop:top},500,function(){
        $(window).scroll(leftNav);
    });
});
$(window).scroll(leftNav);
function leftNav(){
    var index = 0;
    var scrolltop = $(window).scrollTop();
    var winH = $(window).height();
    $('.shop-main .slider').each(function(){
        //当前这个div 距离顶部的位置
        var top = $(this).offset().top;
        if(scrolltop + winH/2 >= top){
            index = $(this).index();
            switch(index){
                case 3:
                    index=1;
                    break;
                case 5:
                    index=2;
                    break;
                case 7:
                    index=3;
                    break;
                case 10:
                    index=4;
                    break;
                case 13:
                    index=5;
                    break;
                default:
                    break;
            }
        }
        $('.leftNav li').eq(index).addClass('active').siblings('li').removeClass('active');
        var sliderTop = $('.leftNavshow').offset().top;
        if(scrolltop + winH/2 >= sliderTop){
            $('.leftNav').animate({left:0},300);
        }
    })
}
//一次横向滚动一个
$('#tabWrapp-lu').kxbdSuperMarquee({
    distance:140,
    time:3,
    btnGo:{left:'.lu1n',right:'.lu1p'},
    direction:'left'
});
$('#tabWrapp-lu2').kxbdSuperMarquee({
    distance:140,
    time:3,
    btnGo:{left:'.lu2n',right:'.lu2p'},
    direction:'left'
});

});

