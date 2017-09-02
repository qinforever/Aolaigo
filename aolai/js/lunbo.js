// JavaScript Document
	var n=$('.carousel-right ul li').length;//n值为抓取li的数量
	var i=0;//不知道是什么鬼
	var t=0;//不知道是什么鬼
	$('.carousel-right ul li').eq(0).show().siblings().hide();//抓取li提取下标值0显示出来，并且隐藏他的兄弟
	function autoPlay(){//制作一个叫autuPlay的轮播函数
		t=setInterval(function(){//t值为开始轮播
		i++;//i值递增
		if(i==n){i=0};
		$('.carousel-right ul li').eq(i).fadeIn(1000).siblings().fadeOut(500);//抓取li的下标值为i的内容以1000毫秒的速度渐入，并且他的兄弟以1000毫秒的速度渐出
		$('.carousel-right strong span').eq(i).addClass('active').siblings().removeClass('active');//抓取span的下标值为i的内容为其添加样式cur，并且他的兄弟清除样式cur
		},4000)//每一步进行3000毫秒
		}//制作完成
	autoPlay();//调用函数autuPlay
	$('.carousel-right ul li,.carousel-right strong span').hover(function(){//抓取li和span进行hover事件
			clearInterval(t);//悬浮上方就清除轮播t值
		},function(){
			autoPlay();///离开就继续调用函数autuPlay
		});
		
	$('.carousel-right strong span').click(function(){//抓取span进行点击事件
		var a = $(this).index();//a值为抓取当前的下标值
		$('.carousel-right ul li').eq(a).fadeIn(1000).siblings().fadeOut(500);//抓取li的下标值为a的内容以1000毫秒的速度渐入，并且他的兄弟清除样式cur速度渐出
		$('.carousel-right strong span').eq(a).addClass('active').siblings().removeClass('active');//抓取span的下标值为i的内容为其添加样式cur，并且他的兄弟清除样式cur
		})