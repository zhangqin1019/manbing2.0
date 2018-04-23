requirejs.config({
	paths: {
		"jquery" : "libs/jquery.min"
	}
});
requirejs(["jquery","module/pop_box"],function($,pop){
	//服务分类新增接口弹出页面
	$(".add-interface").click(function(){
		$(this).createModal({
			background: "#000",//设定弹窗之后的覆盖层的颜色
			width: "450px",//设定弹窗的宽度
			height: "485px",//设定弹窗的高度
			resizable: false,//设定弹窗是否可以拖动改变大小
			move: false,//规定弹窗是否可以拖动
			bgClose: false,//规定点击背景是否可以关闭
			html: "<h2>新增接口</h2>"+
				  "<div class='service-interface'><form action='' method='post'>"+
				  "<p><lable class='service-text'>编码</lable><input type='text' class='service-input'/><p>"+
				  "<p class='service-waring'><lable class='service-text'>名称</lable><input type='text' class='service-input'/><span><i></i>名称不能重复</span><p>"+
				  "<p class='service-waring'><lable class='service-text'>描述</lable><input type='text' class='service-input'/><span><i></i>描述或备注</span><p>"+
				  "<p class='service-waring'><lable class='service-text'>分值</lable><input type='text' class='service-input'/><span><i></i>两位精度 缺省0分</span><p>"+
				  "<p><lable class='service-text'>权限</lable><input type='text' class='service-input'/><p>"+
				  "<p><input type='sumbit' value='保存' class='service-sumbit'/><p>"+
				  "</form></div>",
			addFunction: function(){//增加的方法

			}
		},function(){//回调函数的方法
			
		});
	});

	/*当表格第一行复选框选中时，实现全选状态；没有选中时则是未选状态*/
	$(".service-table thead tr td input:checkbox").click(function(){
		if(this.checked){
			$(".service-table tbody tr td input:checkbox").attr("checked",true);
		}else{
			$(".service-table tbody tr td input:checkbox").attr("checked",false);
		}
	});
	/*复选框选中时表格每行的背景色的切换*/
	$(".service-table tbody tr td input:checkbox").click(function(){
		if(this.checked){
			$(this).parents("tr").addClass("checkClick");
		}else{
			$(this).parents("tr").removeClass("checkClick");
		}
		
	});
	
});