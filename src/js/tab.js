requirejs.config({
    paths: {
        "jquery" : "libs/jquery.min",
    }
});

requirejs(["jquery", "module/pop_box", "module/unit-tab"],function($, pop_box, Tab){

    // var editor = new wangEditor('div1');
    //     editor.create();

    $(".on-pop").click(function(){
        $(this).createModal({
            background: "#000",//设定弹窗之后的覆盖层的颜色
            width: "500px",//设定弹窗的宽度
            height: "300px",//设定弹窗的高度
            resizable: true,//设定弹窗是否可以拖动改变大小
            bgClose: true,
            html: "<p>你可以在这个属性里面写入任何的html代码！</p>"
        });
    });

    /*横行选项卡切换效果*/
    $(".tab-items").Tab({
        mainclass: "tab-content"
    });


    /*竖行选项卡切换效果*/
    $(".tab-items1").Tab({
        mainclass:"tab-content1"
    });


    
   /* //选项卡切换效果
     var $li=$(".tab-items li");
     var $tabPane=$(".tab-pane");
     $li.click(function(){
     var $this=$(this).index();
     $li.css("backgroundColor","#097BEE");
     $li.eq($this).css("backgroundColor","#F5C400");
     $tabPane.css("display","none");
     $tabPane.eq($this).css("display","block");
     })*/
});
