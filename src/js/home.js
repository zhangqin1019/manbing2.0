requirejs.config({
	paths: {
		"jquery" : "libs/jquery.min"
	}
});
requirejs(["jquery", "module/login", "module/scrollbar", "module/pop_box", "data/nav-data", "module/placeholder"],function($, login, scrollbar, pop_box, data, placeholder){

	// 在cookie判断是否已登录
	var login = new login.LoginTo({
		name: "login_arr",
		mode: "getCookie"
	});

	//ie下显示placeholder
	$(".h-l-search input").placeholder();

	// 切换颜色
	function choose_color(color){
		$(".chose-"+ color +"").click(function(){
			$(".chose-color a").removeClass("on");
			$(this).addClass("on");
			$(".contant").removeClass("red-style").removeClass("blue-style").removeClass("purple-style").removeClass("mud-style").addClass(""+ color +"-style");
		});
	}
	choose_color("red");
	choose_color("blue");
	choose_color("purple");
	choose_color("mud");
	$("#choose-btn").click(function(event){
		event.stopPropagation();
		$(".chose-color").css("display","block");
	});
	$(document).click(function(){
		$(".chose-color").css("display","none");
	});


	// 菜单切换
	var all_height = $(window).height(),
		all_width = $(window).width();
		$(".sub-box").css("height", all_height-50);

	function rightnav(){
		$(".nav-tab").click(function(){
			$("#n-ul li").removeClass("on");
			$(this).parents("#n-ul li").addClass("on");
		})
	};

	function navinit(){
		var wrap = $(".contant");
		if(wrap.hasClass("right-layout")){
			$(".right-layout #n-ul li ul").css({
				"width": all_width,
				"height": "76px"
			});
			$(".right-layout #n-ul li  ul li ul").css({
				"width": "",
				"height": ""
			});
			$(".right-layout .contant").css("height", "auto");
			$(".right-layout .nav").css("height", "24px");
			rightnav();
		}else if(wrap.hasClass("left-layout")){
			$(".left-layout .contant").css("height", all_height);
			$(".left-layout .nav").css("height", all_height-50);
			$(".left-layout #n-ul li ul").css({
				"width": "120px",
				"height": all_height-30
			});
			$(".left-layout #n-ul li ul li ul").css({
				"width": "120px",
				"height": all_height-30
			});
			rightnav();
		};
	};
	$("#choose-layout").click(function(){
		var wrap = $(".contant");
		if(wrap.hasClass("right-layout")){
			wrap.removeClass("right-layout").addClass("left-layout");
		}else if(wrap.hasClass("left-layout")){
			wrap.removeClass("left-layout").addClass("right-layout");
		};
		navinit();
	});



	// 导航栏数据
	function show_nav(data, onClass, wrapClass, wrapUl, atclass){
		$.each(data, function(i, value){
			$(""+ onClass +"").each(function(){
				var thisID = $(this).attr("id"),
					ths = $(this);
				if(value.FatherMenuID == thisID){
					ths.parent("li").find(""+ wrapClass +"").append("<li>"+ wrapUl +"<a href='javascript:void(0);' data-href='"+ value.Url +"' id='"+ value.MenuID +"' data-fid='"+ value.FatherMenuID +"' class='"+ atclass +"'><i class='iconfont icon-shouye'></i><span>"+ value.MenuName +"</span></a></li>");
				};
			});
		});
	};
	nav_data.List.sort(function(a,b){return a.MenuID-b.MenuID});
	// 第一个菜单
	$.each(nav_data.List, function(i, value){
		if(value.FatherMenuID == 1){
			$("#n-ul").append("<li><a href='javascript:void(0);' class='nav-tab' data-href='"+ value.Url +"' id='"+ value.MenuID +"' data-fid='"+ value.FatherMenuID +"'><i class='iconfont icon-shouye'></i><span>"+ value.MenuName +"</span></a><ul class='s_ul'></ul></li>");
		};
	});
	// 第二层菜单
	show_nav(nav_data.List, "#n-ul li a", ".s_ul", "<ul class='t_ul'></ul>", "");
	// 第三层菜单
	show_nav(nav_data.List, "#n-ul li .s_ul li a", ".t_ul", "", "add-html");
	$("#n-ul li").eq(0).addClass("on");
	navinit();


	// 弹窗
	/*$(".clear-login").click(function(){
		$(this).createModal({
			background: "#000",//设定弹窗之后的覆盖层的颜色
			width: "600px",//设定弹窗的宽度
			height: "146px",//设定弹窗的高度
			resizable: true,//设定弹窗是否可以拖动改变大小
			move: false,//规定弹窗是否可以拖动
			bgClose: false,//规定点击背景是否可以关闭
			html: "<div class='modal-promot-mess'>确认要删除该产品吗？</div>" +
					"<p class='insure-btn-con'><span class='sure-btn'>确定</span><span class='cancel-btn modal-close'>取消</span></p>",
			addFunction: function(){//增加的方法
				$(".modal-promot-mess").click(function(){alert("111");})
			}
		},function(){//回调函数的方法
			$(".insure-btn-con").click(function(){alert("2222")});
		});
	});*/
	//消息弹窗
	$(".message .text-center").click(function(){
		$(this).createModal({
			background:"#000",   //设定弹窗之后的覆盖层的颜色
			width:"1222px",   //设定弹窗的宽度
			height:"602px",   //设定弹窗的高度
			resizable:false,   //设定弹窗是否可以拖动改变大小
			move:false,    //规定弹窗是否可以拖动
			bgClose:false,   //规定点击背景是否可以关闭
			html:"<h2>所有信息</h2>"+
				 "<p class='command-btn'><span>查询</span><select class='handle-btn'><option>是否处理</option></select><select class='handle-btn equal'><option>等于</option></select><select class='handle-btn'><option>未处理</option></select><a href='javascript:void(0);' class='click-btn modal-close query-btn'><i class='iconfont'>&#xe651;</i>查询</a><a href='javascript:void(0);' class='click-btn modal-close whole-btn'><i class='iconfont'>&#xe655;</i>全部</a></p>"+
				 "<div class='main-content fixed'><table class='message-list'>"+
				 "<thead><tr><td>是否处理<span class='isHandle'></span></td><td>提醒方式<span class='remind'></span></td><td>提醒分类<span class='classification fixed'></span><span class='kind fixed'></span></td><td>事件</td><td>患者姓名</td><td>身份证号</td><td>开始时间</td><td>开始时段</td><td>是否全天</td><td>资料ID</td><td>表单ID</td><td>创建时间</td><td>创建操作人员</td><td>修改时间</td></tr></thead>"+
				 "<tbody><tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr>"+
				 "<tr><td><input type='checkbox'/></td><td>已经处理</td><td>预约</td><td>123</td><td>张三丰</td><td>660120***</td><td>2016-11-5</td><td></td><td>是</td><td></td><td></td><td>2015-12-25</td><td></td><td></td></tr></tbody>"+
				 "</table></div>"+
				 "<div class='show-left fixed'>每页显示<a href='javascript:void(0);'><select><option>10</option></select></a>当前页为<span>11</span>至<span>20</span>记录</div>"+
				 "<div class='show-right fixed'><a href='javascript:void(0);'>&lt;</a><a href='javascript:void(0);' class='click-on'>1</a><a href='javascript:void(0);'>2</a><a href='javascript:void(0);'>3</a><a href='javascript:void(0);'>4</a><a href='javascript:void(0);'>5</a><a href='javascript:void(0);'>6</a><a href='javascript:void(0);'>...</a><a href='javascript:void(0);'>65</a><a href='javascript:void(0);'>&gt;</a></div>",
			addFunction:function(){  //增加的方法
				$(".message-list tbody tr td input:checkbox").click(function(){
					if(this.checked){
						$(this).parents("tr").addClass("clickCheck");
					}else{
						$(this).parents("tr").removeClass("clickCheck");
					}
				});
			}
		},function(){   //回调函数的方法
			$(".query-btn").click(function(){
				$(this).createModal({
					background:"#000",   //设定弹窗之后的覆盖层的颜色
					width:"810px",   //设定弹窗的宽度
					height:"602px",   //设定弹窗的高度
					resizable:false,   //设定弹窗是否可以拖动改变大小
					move:false,    //规定弹窗是否可以拖动
					bgClose:false,   //规定点击背景是否可以关闭
					html:"<h2>罗志雄的随访用药提醒</h2>"+
						 "<div class='editor'>"+
						 "<div class='list-header fixed'><div class='menu-sub fixed'><a href='javascript:void(0);'><i class='l-h-save l-h-icon'></i>保存</a><a href='javascript:void(0);'><i class='l-h-imp l-h-icon'></i>导出</a><a href='javascript:void(0);'><i class='l-h-pri l-h-icon'></i>打印</a></div></div>"+
						 "<p class='title-message'>处理结果</p>"+
						 "<p class='resultCode'>是否处理<input type='radio'/>未处理<input type='radio'/><span class='redColor'>知道了</span><input type='radio'/><span class='greenColor'>已经处理</span></p>"+
						 "<p class='processing'>处理描述<input type='text'/></p>"+
						 "<p class='title-message'>提醒内容</p>"+
						 "<p class='remindContent'>提醒方式<select><option>消息滚动提醒</option></select>提醒分类<select><option>日程</option></select></p>"+
						 "<p class='event'>事件<input type='text'/></p>"+
						 "</div>",
					addFunction:function(){  //增加的方法

					}
				},function(){    //回调函数的方法
					
				});
			});
			$(".whole-btn").click(function(){
				$(this).createModal({
					background:"#000",   //设定弹窗之后的覆盖层的颜色
					width:"1222px",   //设定弹窗的宽度
					height:"602px",   //设定弹窗的高度
					resizable:false,   //设定弹窗是否可以拖动改变大小
					move:false,    //规定弹窗是否可以拖动
					bgClose:false,   //规定点击背景是否可以关闭
					html:"<h2>量表模板-帮助文档</h2>"+
						 "<div class='word-content'>"+
						 "<p>周一,中油创业基金发布估值调整公告,自12月12号起,对旗下基金持有的乐视网、博腾股份、先导智能等多只停牌个股采用'指数收益法'予以估值。同一天，嘉实基金也发布公告，对旗下基金持有的乐视网等停牌股采取'指数收益法'予以估值。</p>"+
						 "<p>从12月7号至12月12号,乐视网停牌期间的4个交易日,乐视网所属的AMAC(中国基金业协会)信息行业指数累计下跌6.62%,意味着持有乐视网的基金将按照这一指数跌幅对乐视网估值进行下调。</p>"+
						 "<p>本周一相关基金按照33.43元对乐视网进行估值。</p>"+
						 "<p>证券时报援引沪上某基金经理表示:'一般而言,只要持仓个股长期停牌叠加市场大幅波动,偏股型基金就会按照指数收益法调整估值。'</p>"+
						 "<p>不过有投资者认为,按照行业指数调整估值,并未包含乐视网本身的个股风险。对此上述基金经理向证券时报表示,个股本身的风险很难量化,而且单一重仓股虽然会影响基金净值,但幅度有限,何况复牌后走势也很难预测,不能以此判断基金净值是否调整到位。</p>"+
						 "<p>按照上述两家基金公司下调乐视网的估值幅度计算,今年7月份参与乐视网定增的公墓基金浮亏幅度已经达到27.73%。</p>"+
						 "<p>乐视网股价自今年6月以来持续下行,在7日紧急停牌前一天,乐视网股价再度大跌近8%,其50亿定增融资、50亿融资盘以及贾跃亭的股资质押,令市场担心追随贾跃亭的巨额资金可能逃不过一场踩踏。</p>"+
						 "<p>有媒体称,贾跃亭有一笔乐视股资质押平仓线为35.21元。这意味着,乐视网6日盘中一度跌破该笔股资质押平仓线。这笔质押股票总计50733.23万股,占贾跃亭持股比例高达64.81%。</p>"+
						 "<p>针对此质疑,贾跃亭回应称,乐视手机资金链接下来的三四个月会回复正常。股价的下跌对我们的质押多少会有影响,但是离我们的警戒线还有非常大的距离,肯定比35.21元低不少。</p>"+
						 "<p>贾跃亭还称,非上市公司一旦盈利高速增长了就会上市,会把优质的资产越来越多的放到上市公司当中;乐视汽车应该会在2018年量产。</p>"+
						 "<p>周一,中油创业基金发布估值调整公告,自12月12号起,对旗下基金持有的乐视网、博腾股份、先导智能等多只停牌个股采用'指数收益法'予以估值。同一天，嘉实基金也发布公告，对旗下基金持有的乐视网等停牌股采取'指数收益法'予以估值。</p>"+
						 "<p>从12月7号至12月12号,乐视网停牌期间的4个交易日,乐视网所属的AMAC(中国基金业协会)信息行业指数累计下跌6.62%,意味着持有乐视网的基金将按照这一指数跌幅对乐视网估值进行下调。</p>"+
						 "<p>本周一相关基金按照33.43元对乐视网进行估值。</p>"+
						 "<p>证券时报援引沪上某基金经理表示:'一般而言,只要持仓个股长期停牌叠加市场大幅波动,偏股型基金就会按照指数收益法调整估值。'</p>"+
						 "<p>不过有投资者认为,按照行业指数调整估值,并未包含乐视网本身的个股风险。对此上述基金经理向证券时报表示,个股本身的风险很难量化,而且单一重仓股虽然会影响基金净值,但幅度有限,何况复牌后走势也很难预测,不能以此判断基金净值是否调整到位。</p>"+
						 "<p>按照上述两家基金公司下调乐视网的估值幅度计算,今年7月份参与乐视网定增的公墓基金浮亏幅度已经达到27.73%。</p>"+
						 "<p>乐视网股价自今年6月以来持续下行,在7日紧急停牌前一天,乐视网股价再度大跌近8%,其50亿定增融资、50亿融资盘以及贾跃亭的股资质押,令市场担心追随贾跃亭的巨额资金可能逃不过一场踩踏。</p>"+
						 "<p>有媒体称,贾跃亭有一笔乐视股资质押平仓线为35.21元。这意味着,乐视网6日盘中一度跌破该笔股资质押平仓线。这笔质押股票总计50733.23万股,占贾跃亭持股比例高达64.81%。</p>"+
						 "<p>针对此质疑,贾跃亭回应称,乐视手机资金链接下来的三四个月会回复正常。股价的下跌对我们的质押多少会有影响,但是离我们的警戒线还有非常大的距离,肯定比35.21元低不少。</p>"+
						 "<p>贾跃亭还称,非上市公司一旦盈利高速增长了就会上市,会把优质的资产越来越多的放到上市公司当中;乐视汽车应该会在2018年量产。</p>"+
						 "</div>",
					addFunction:function(){  //增加的方法

					}
				},function(){    //回调函数的方法
							
				});
			});
		});
	});

	//消息弹窗
	$(".clear-login").click(function(){
		$(".message").toggle("slow");
	});
	/*$(".message").on("mouseover",function(){
		$(this).css("display","block");
	}).on("mouseout",function(){
		$(this).css("display","none");
	});*/
	


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
			var onlit = $('#tab_title ul li a').eq($('#tab_title ul li').length-2),
				onlink = onlit.attr("data-link");
			onlit.addClass('tab_title_on');
			$('#show_pape .tab_iframe').eq($('#tab_title ul li').length-2).attr("src", onlink);
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
		url_arr = $.parseJSON(arr[2]);
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