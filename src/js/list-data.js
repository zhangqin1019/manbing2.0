requirejs.config({
	paths: {
		"jquery" : "libs/jquery.min"
	}
});
requirejs(["jquery", "module/pop_box", "module/scrollbar", "module/menu"],function($, pop, scrollbar, menu){
	var wn_h = $(window.parent.document).find("#show_pape").height();
	$(".list-data").css("height",wn_h-20);


	// 弹窗
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

	// 表单
	$(".listd-table tbody tr").click(function(){
		var obj = $(this).find("input:checkbox");
		if(obj.prop("checked") == true){
			obj.prop("checked", false);
		}else{
			obj.prop("checked", true);
		}
	});
	$(".listd-table tbody tr input:checkbox").click(function(event){
		event.stopPropagation();
	});
	$(".listd-table thead tr td input:checkbox").click(function(){
		var th = $(this),
			oth = $(".listd-table tbody tr td input:checkbox");
		if(th.prop("checked") == true){
			oth.prop("checked",true);
		}else{
			oth.prop("checked",false);
		}
	});

	// 菜单栏
	$('.dropdown').tendina({
		animate: true,
		speed: 500,
		openCallback: function($clickedEl) {
			
		},
		closeCallback: function($clickedEl) {
			
		}
	})

	
	//列表项被选中时的状态
	$(".dropdown > li > a").on('mouseenter',function(){
		$(this).addClass("hover_active");
	}).on('mouseleave',function(){
		$(this).removeClass("hover_active");
	}).on('click',function(){
		if($(this).hasClass("click_active")){
			$(this).removeClass("click_active");
		}else{
			$(".dropdown > li > a.click_active").removeClass("click_active");
			$(this).addClass("click_active");
		}	
	});

	//二级列表项被选中时的状态
	$(".dropdown > li  > ul > li > a").on('mouseenter',function(){
		$(this).addClass("hover2_active");
	}).on('mouseleave',function(){
		$(this).removeClass("hover2_active");
	}).on('click',function(){
		if($(this).siblings().length  > 0){
			$(this).addClass("click2_active");
		}else{
			$(".dropdown > li > ul > li > a").removeClass("hover2_active click2_active");
			$(this).addClass("click2_active");
		}
		if($(this).siblings().length  == 0){
			$(".dropdown > li > ul li >ul li > a").removeClass("hover3_active click3_active");
		}
	});

	//三级列表项被选中时的状态
	$(".dropdown > li  > ul > li > ul > li > a").on('mouseenter',function(){
		$(this).addClass("hover3_active");
	}).on('mouseleave',function(){
		$(this).removeClass("hover3_active");
	}).on('click',function(){
		$(".dropdown > li > ul > li > a").removeClass("hover2_active click2_active");
		$(".dropdown > li > ul li >ul li > a").removeClass("hover3_active click3_active");
		$(this).addClass("click3_active");
	});

	//为左侧菜单栏添加滚动条
	$(".list-menu").panel({iWheelStep:32});
})