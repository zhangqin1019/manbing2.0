// 添加页面
define(["jquery"],function($) {
	function AddHtml(el,opts){
		this.opts = $.extend({},AddHtml.DEFAULTS,opts);
		this.$el = $(el);
		var ths = this,
			url_arr = [];
		ths.$el.on("click",function(){
			var Name = $.trim($(this).find("span").text()),
				link = $(this).attr("data-href"),
				add_btn = $('<li><a class="tab_title_on"><span class="tab_title_name">' + Name + '</span><span class="tab_title_close">×</span></a></li>'),
				add_contant = $('<iframe name="' + Name + '" src="' + link + '" class="tab_iframe"></iframe>'),
				show1a = $('#tab_title ul li a span:first-child'),
				tab_title_ongeshu = $('.tab_title_ul li').length;
			for (var i = 0; i < show1a.length; i++) {
				if (show1a.eq(i).text() == Name) {
					$(".tab_title_ul li a").eq(i).click();
					return false;
				};
			};
			$(this).attr('target', Name);
			$('.tab_title_ul li a').removeClass('tab_title_on');
			$('#show_pape iframe').hide();
			$('.tab_title_ul').append(add_btn);
			$('#show_pape').append(add_contant);
			ths._boxWidth();
			ths._showBtn();
			var url_a = new Array();
			url_a = [];
			url_a.push(Name);
			url_a.push(link);
			url_arr.push(url_a);
			document.cookie = ["on_url", '=', JSON.stringify(url_arr)].join('');
		});
		$('#tab_title').on('click','ul li a span:last-child',function(event){
			if($(this).parent().hasClass('tab_title_on')){
				$('#tab_title ul li a').eq($('#tab_title ul li').length-2).addClass('tab_title_on');
			}
			var index = $('#tab_title ul li').index($(this).parent().parent());
			$(this).parent().parent().remove();
			$('#show_pape .tab_iframe').eq(index).remove();
			if($('#show_pape .tab_iframe:visible').length==0){
				$('#show_pape .tab_iframe:last-child').show();
			}
			event.stopPropagation();
			ths._showBtn();
			url_arr.splice(index,1);
			SetCookie("on_url",JSON.stringify(url_arr));
		});
		$('#tab_title').on('click','ul li a',function(){
			if($(this).hasClass('tab_title_on')){
				return false;
			}else{
				 $(this).addClass('tab_title_on').parent().siblings().children().removeClass('tab_title_on');
				 var index = $('#tab_title ul li').index($(this).parent());
				 $('#show_pape .tab_iframe').hide().eq(index).show();
				 var onSrc = $('#show_pape .tab_iframe').eq(index);
				 if(onSrc.attr("src") == ""){
				 	onSrc.attr("src",$(this).attr("data-link"));
				 }
				 ths._showBtn();
			};
		});
		ths._showBtn();
	};

	AddHtml.DEFAULTS = {
		addFunction: function(){}
	};

	AddHtml.prototype._showBtn = function(){
		var tit_w = parseFloat($("#tab_title").css("width")),
			tab_ul = $(".tab_title_ul"),
			tab_bl = $(".tab_t_btnl"),
			tab_br = $(".tab_t_btnr"),
			tul_w = Math.ceil(parseFloat(tab_ul.css("width"))),
			tul_pl = Math.ceil(parseFloat(tab_ul.css("left")));
		tab_ul.css("width",$(".tab_title_ul li").length*103);
		if(tit_w < tul_w){
			if(tul_pl >= 0){
				tab_bl.css("display","none");
				tab_br.css("display","block");
			}else if(tul_pl <= tit_w-tul_w){
				tab_bl.css("display","block");
				tab_br.css("display","none");
			}else if(-103 > tul_pl > tit_w-tul_w-103){
				tab_bl.css("display","block");
				tab_br.css("display","block");
			}
		}else{
			tab_bl.css("display","none");
			tab_br.css("display","none");
		};
	};

	AddHtml.prototype._boxWidth = function(){
		var w_h = $(window).height(),
			abox = $(".all_box"),
			tab_if = $(".tab_iframe");
		if(w_h >= 600){
			abox.css("height", w_h-50);
			tab_if.css("height", w_h-86);
		}else{
			$(".all_box").css("height", "467px");
			tab_if.css("height", "439px");
		};
	};

	$.fn.extend({
		AddHtml: function(opts){
			return this.each(function(){
				new AddHtml(this, opts);
			});
		}
	})

	return {
		AddHtml: AddHtml
	};
});