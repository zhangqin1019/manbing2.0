$(".a-input input").focus(function(){
	$(this).parent(".a-input").find("label").hide();
}).blur(function(){
	if($(this).attr("value") == ""){
		$(this).parent(".a-input").find("label").show();
	};
});
$(".a-input input").each(function(){
	if($(this).attr("value") == ""){
		$(this).parent(".a-input").find("label").show();
	}else{
		$(this).parent(".a-input").find("label").hide();
	}
});

//背景移动
// $(document).mousemove(function(e){
// 	var page_width = $("body").width();
// 	var x = e.pageX;
// 	x=40+(((x-page_width/2)/page_width)*100+50)/20;
// 	x = x+"% 10%";
// 	var obj = document.getElementById("login_bg")
// 	obj.style.backgroundPosition = x;
// });

//登陆按钮
$("#login_submit input").on('click',function(){
	var user = $("#login_username").attr("value");
	var password = $("#login_password").attr("value");
	if (user == '' || user == '用户名') {
		//$("#login_tip").val("用户名不能为空");
		document.getElementById('login_tip').innerHTML = "用户名不能为空";
		$("#login_username").focus();
		return false;
	} else if (password == '' || password == '密码') {
		//$("#login_tip").val("密码不能为空")
		document.getElementById('login_tip').innerHTML = "密码不能为空";
		$("#login_password").focus();
		return false;
	}else{
		// ajax请求
		// var user = $("#login_username").val();
		// var password = $("#login_password").val();
		// $.ajax({
		// 	type:"POST",
		// 	url:"http://192.168.0.101/ServerWeb/SetLoginCheck.aspx?action=login",
		// 	dataType:"jsonp",
		// 	jsonp: "Callback",
		// 	data:{"LoginID":user,"Password":password},
		// 	crossDomain: true,
		// 	success:function(json){
		// 		if(json.success == 1){
		// 			// document.getElementById("welcome_user").innerHTML = json.user;
		// 			//alert(getCookie(user));
		// 			t1 = setTimeout("window.location.href='home.html'",3000);
		// 		}else{
		// 			document.getElementById("login_tip").innerHTML = json.msg;
		// 		}
		// 	},
		// 	error: function (jqXHR) {
		// 		console.log(jqXHR.status);
		// 	}
		// });

		 
		document.getElementById("login_tip").innerHTML = "登录中...";
		t = setTimeout("demo()",1500);
	}
});

//效果测试
function demo(){
	var user = $("#login_username").val();
	var password = $("#login_password").val();
	if(user=="guoyh"&&password=="guoyh123"){
		var login_arr = new Array();
		login_arr = [];
		login_arr.push(user);
		login_arr.push(password);
		SetCookie("login_arr", JSON.stringify(login_arr));
		t1 = setTimeout("window.location.href='home.html'",1000);
	}
	else{
		document.getElementById("login_tip").innerHTML = "账号或密码错误";
	}
}
	


// 设置cookie
function SetCookie(name,value){
	document.cookie = [name, '=', value].join('');
};

function GetUrlCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+ name +"=([^;]*)(;|$)"));
	if (arr !== null) {
		login_arr = $.parseJSON(arr[2]);
		if(login_arr[0]=="guoyh"&&login_arr[1]=="guoyh123"){
			window.location.href='home.html';
		}
	};
};
GetUrlCookie("login_arr");

//cookie检查	
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}

// 回车提交表单
$("body").bind('keyup',function(event) {  
	if(event.keyCode==13){  
		$("#login_submit input").click();
		$("#login_username").blur();
		$("#login_password").blur();
	}
});
