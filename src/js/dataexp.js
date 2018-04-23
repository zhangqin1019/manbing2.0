requirejs.config({
    paths: {
        "jquery" : "libs/jquery.min",
        "moment" : "module/moment.min"
   }
});
requirejs(["jquery", "module/daterangepicker.min","module/placeholder","module/moveMenu"], function($,dateRangePicker,placeholder,movemenu){
    //ie下placeholder显示
    $('#tim-sta').placeholder('起始时间');
    $('#tim-end').placeholder('结束时间');
    $('#timer').placeholder('时间').dateRangePicker({
            autoClose: true,
            singleDate : true,
            showShortcuts: false
    });
    //日期选择器
    $('.two-inputs').dateRangePicker(
    {
        getValue: function()
        {
            if ($('#tim-sta').val() && $('#tim-end').val() )
                return $('#tim-sta').val() + ' to ' + $('#tim-end').val();
            else
                return '';
        },
        setValue: function(s,s1,s2)
        {
            $('#tim-sta').val(s1);
            $('#tim-end').val(s2);
        }
    });

    //菜单移入移出
        $(".exp-txt").movemenu({
        leftBox: "leftbox",
        rightBox: "rightbox",
        moveIn: "moveIn",
        moveOut: "moveOut",
        addFunction: function(){}
    });
});
