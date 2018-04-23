//菜单移入移出
define(["jquery"], function($){
	function movemenu(el, opts){
		//传入外部变量
		this.opts = $.extend({}, opts.DEFAULTS, opts);
		var ths = this;
		ths._checkSelect(ths.opts.leftBox);
		ths._checkSelect(ths.opts.rightBox);
		var mIn = $("."+ this.opts.moveIn +"");
			mOut = $("."+ this.opts.moveOut +"");
			lBox = $("."+ this.opts.leftBox +"");
			rBox = $("."+this.opts.rightBox +"");

		mIn.click(function(){
			lBox.find(".span-select").each(function(){
				var txt = $(this).text();
				rBox.find(".box div:first").append("<span>"+ txt +"</span>");
				ths._checkSelect(ths.opts.rightBox);
				$(this).remove();
			});
		});

		mOut.click(function(){
			rBox.find(".span-select").each(function(){
				var txt = $(this).text();
				lBox.find(".box div:first").append("<span>"+ txt +"</span>");
				ths._checkSelect(ths.opts.leftBox);
				$(this).remove();
			});
		});

		$("."+ this.opts.saveBtn +"").click(function(){
			ths.opts.addFunction();
		});
	}

	//默认变量
	movemenu.DEFAULTS = {
		leftBox: "leftbox",
		rightBox: "rightbox",
		moveIn: "moveIn",
		moveOut: "moveOut",
		saveBtn: "save-btn",
		addFunction: function(){}
	};

	//定义方法
	movemenu.prototype._checkSelect = function(className){
		$("."+ className +"").find("span").unbind('click');
		$("."+ className +"").find("span").click(function(){
			if($(this).hasClass("span-select")){
				$(this).removeClass("span-select");
			}else{
				$(this).addClass("span-select");
			}
		});
	}

	$.fn.extend({
		movemenu: function(opts){
			return this.each(function(){
				new movemenu(this, opts);
			});
		}
	});

	//传出去外部
	return {
		movemenu: movemenu
	};
});