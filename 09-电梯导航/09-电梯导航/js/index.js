//当我们点击了li后 不需要执行页面滚动添加类的效果
//节流阀 互斥锁
var flag=true
$(function(){
toggle()
    function toggle(){
        var reTop=$(".recommend").offset().top
        // console.log($(document).scrollTop());
        if($(document).scrollTop()>=reTop){
            $('.fixedtool').fadeIn()
        }else{
            $('.fixedtool').fadeOut()
        }
    }
    $(window).scroll(function(){
        toggle();
        // 滚到相应的区域切换类
        if(flag){
            $('.floor .w').each(function(i,ele){
                if($(document).scrollTop()>=$(ele).offset().top){
                  $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
                }
            })
        }
    })
    //点击电梯导航可以滚动相应的区域
    $('.fixedtool li').click(function(){
        flag=false
        var current=$(".floor .w").eq($(this).index()).offset().top ;
        //页面滚动动画
        $('body, html').stop().animate({
            scrollTop:current
        },function(){
            flag=true
        }) 
        //点击之后让当前的背景改变
        $(this).addClass('current').siblings().removeClass('current')  
    })

 
 

})