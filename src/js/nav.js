requirejs.config({
    paths: {
        "jquery" : "libs/jquery.min"
    }
});
requirejs(["jquery", "module/pop_box","module/unit-nav"],function($, pop,Nav){

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



    /*导航栏切换效果*/
    $(".nav-tabs").Nav({

    });

    //导航栏切换效果
   /* var $li=$(".nav-tabs li");
    var $a=$(".nav-tabs li a");
    $li.click(function(){
        var $this=$(this).index();
        $li.css("backgroundColor","#F8F8F8");
        $a.css("color","#23527C");
        $li.eq($this).css("backgroundColor","#337AB7");
        $a.eq($this).css("color","white");
    })*/
});
