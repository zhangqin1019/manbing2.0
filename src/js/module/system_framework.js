// 添加页面
define(["jquery"],function($){
		
	// 下面高度控制
	function down_width(){
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
	down_width();

	// 长度的控制和左右按钮的显示
	function tab_w(){
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

	// 左右按钮触发的时间
	function btn_click(obj,l_w){
		var tiemer = "";
		var time = 500;
		var fun = function bClick(){
			$(".tab_title_ul").animate({"left": l_w }, 500);		
			$(obj).unbind("click");
			tiemer = setTimeout(function(){
				$(obj).click(fun);
				tab_w();
			},time);
		};
		$(obj).click(fun);
	};
	btn_click(".tab_t_btnl",'+=103px');
	btn_click(".tab_t_btnr",'-=103px');

	$(window).resize(function() {
		tab_w();
		down_width();
	});

	// 添加或删除控件
	var url_arr = [];
	var click = $('.add-html');
	function add(Name, link) {
		var add_li = $('<li><a class="tab_title_on"><span class="tab_title_name">' + Name + '</span><span class="tab_title_close">×</span></a></li>'),
			add_ifame = $('<iframe name="' + Name + '" src="'+ link +'" class="tab_iframe"></iframe>');
		$('#show_pape .tab_iframe').hide();
		$('.tab_title_ul').append(add_li);
		$('#show_pape').append(add_ifame);
		tab_w();
		// iframe_change();
		down_width();
	};
	click.click(function() {
		var texts = $.trim($(this).find("span").text());
		var show1a = $('#tab_title ul li a span:first-child');
		var tab_title_ongeshu = $('.tab_title_ul li').length;
		for (var i = 0; i < show1a.length; i++) {
			if (show1a.eq(i).text() == texts) {
				$(".tab_title_ul li a").eq(i).click();
				return false;
			};
		};
		$(this).attr('target', texts);
		$('.tab_title_ul li a').removeClass('tab_title_on');
		var link = $(this).attr("data-href");
		add(texts,link);
		var url_a = new Array();
		url_a = [];
		url_a.push(texts);
		url_a.push(link);
		url_arr.push(url_a);
		SetCookie("on_url",JSON.stringify(url_arr));
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
		tab_w();
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
			 tab_w();
		};
	});

	function GetUrlCookie(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		url_arr = JSON.parse(arr[2]);
		if (url_arr && url_arr.length > 0) {
			$.each(url_arr,function(i,val){
				$('.tab_title_ul li a').removeClass('tab_title_on');
				add(val[0],'');
				$('.tab_title_ul li a').eq(i).attr("data-link", val[1]);
			});
		}else{
			add("首页", "pages/pape.html");
			$(".tab_iframe").attr("src","pages/pape.html");
			var new_a = new Array();
			new_a = [];
			new_a.push("首页");
			new_a.push("pages/pape.html");
			url_arr.push(new_a);
			SetCookie("on_url",JSON.stringify(url_arr));
		}
		var lastSrc = $('.tab_title_ul li a:last').attr("data-link");
		$(".tab_iframe:last").attr("src",lastSrc);
	};
	GetUrlCookie("on_url");

	function SetCookie(name,value){
		document.cookie = [name, '=', value].join('');
	};


})