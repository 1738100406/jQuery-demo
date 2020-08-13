$(function(){
    //1.全选 全不选
    //把checkall的值赋值给j-checkbox
    //change
    $(".checkall").change(function(){
    //console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"))   //!!! 加逗号
        //点击变背景
        if($(this).prop("checked")){
            $('.cart-item').addClass("check-cart-item")
            
        }else{
            $('.cart-item').removeClass("check-cart-item") 
        }
    })
    //如果小复选框的按钮等于3(长度) 就应该把全选按钮选上
    $(".j-checkbox").change(function(){
        // console.log($(".j-checkbox:checked").length);
        if($(".j-checkbox:checked").length==$(".j-checkbox").length){
            $(".checkall").prop("checked",true)
        }else{
            $(".checkall").prop("checked",false)
        }
        //点击变背景
        if($(this).prop("checked")){
            $(this).parents('.cart-item').addClass("check-cart-item")
            
        }else{
            $(this).parents('.cart-item').removeClass("check-cart-item") 
        }
    })

    //增减模块 当我们点击+ 就让值++ 然后赋值给文本框
    $(".increment").click(function(){
        var n=$(this).siblings(".itxt").val()
        n++;
        $(this).siblings(".itxt").val(n)
        //获取单价后 修改小计为 单价*数量 .sbustr(1)
        // var p=$(this).parent().parent().siblings(".p-price").html()
        var p=$(this).parents(".p-num").siblings(".p-price").html()
        p=p.substr(1)//小计模块 
        // Tofixed(2)保留两位小数
        $(this).parent().parent().siblings(".p-sum").html("￥"+(p*n).toFixed(2))
        getsum()
    })

    $(".decrement").click(function(){
        var n=$(this).siblings(".itxt").val()
        if(n<=1){
            return flase;
        }
            n--;
        $(this).siblings(".itxt").val(n)
        // var p=$(this).parent().parent().siblings(".p-price").html()
        var p=$(this).parents(".p-num").siblings(".p-price").html()
        p=p.substr(1)//小计模块
        $(this).parent().parent().siblings(".p-sum").html("￥"+(p*n).toFixed(2))
        getsum()
    })
    // 用户修改小计
    $(".itxt").keyup(function(){
        var n=$(this).val()
        var p=$(this).parents(".p-num").siblings(".p-price").html()
        if(n<=0){
            alert("当前数量必须大于0")
            $(this).val(1)
            $(this).parent().parent().siblings(".p-sum").html("￥"+p)

        }else{
            p=p.substr(1)//小计模块
            $(this).parent().parent().siblings(".p-sum").html("￥"+(p*n).toFixed(2))
        }
        getsum()
    })
    //计算总计和总额
    getsum();//??
  function getsum(){
      var count=0; //总计
      var money=0   //总额
    $(".itxt").each(function(i,ele){
        count+=parseInt($(ele).val())
    })
    $('.amount-sum em').text(count)
    $(".p-sum").each(function(i,ele){
        money+=parseFloat($(ele).text().substr(1))
    })
    $(".price-sum em").text("￥"+money.toFixed(2))
  }

    //删除商品
    // (1).商品后面的删除
    $(".p-action").click(function(){
        $(this).parents(".cart-item").remove();
        getsum();
    })
    // (2).选中商品的删除
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getsum();
    })
    // (3).清空购物车
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getsum();
    })





})