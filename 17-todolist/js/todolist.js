$(function(){
    var todolist=[
    {
        title:'哈哈哈',done:false },
    {   
        title:'我学jQuery',done:false
    }];
    //本地存储只能存字符串 通过JSON.stringify()把数组对象转化为字符串数据格式
    localStorage.setItem('todo',JSON.stringify(todolist))
    var date=localStorage.getItem('todo')
    // 通过JSON.parse()把字符串转化为数组对象
    date =JSON.parse(date)

    load()
    //1.按下回车 把数据存储到本地
    $("#title").on("keyup",function(event){
        if(event.keyCode==13){
         if($(this).val()!=''){
            var local=getData();
            // 把local数组进行更新数据 进行赋值
            local.push({
                title:$(this).val(),done:false})
            saveData(local)   
            load()     
            $(this).val("")  
         } else{
             alert('请输入内容')
         }
        }
    })
    //读取本地存储
    function getData(){
        var data=localStorage.getItem('todolist');
        if(data !=null){
            return JSON.parse(data)
        }else{
            return [];
        }
    }
    //存储到本地
    function saveData(data){
        localStorage.setItem('todolist',JSON.stringify(data))
    }
    //todolist 删除 
    $('ol,ul').on('click','a',function(){
    var data=getData();//1先获取本地数据
    var  index=$(this).attr('id')//2.把数据添加索引号
    data.splice(index,1)//修改并保存到本地 data.splice(从哪开始删,删几个)  
    saveData(data)
    load()    //渲染页面
    });

    //切换进行与完成
    $('ol,ul').on('click','input',function(){
        var data=getData()//修改数据
        var index=$(this).siblings('a').attr('id')
        // console.log(index);
        data[index].done=$(this).prop('checked');
        
        saveData(data)//保存到本地
        load()
    })


    //渲染数据
    function load(){
        var data=getData()
        var todocount=0;
        var donecount=0;
        $('ol,ul').empty()//遍历之前要清空ol里的元素
        $.each(data,function(i,ele){
            if(ele.done){
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>'+ele.title+'</p><a href="javascript:;"id='+i+'></a></li>')
             donecount++;  
            }else{
                $('ol').prepend('<li><input type="checkbox"><p>'+ele.title+'</p><a href="javascript:;"id='+i+'></a></li>')
              todocount++;
            }
        })
        $("#todocount").text(todocount)
        $("#donecount").text(donecount)
    }
})
