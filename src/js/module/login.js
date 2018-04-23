// 判断是否登录过
define(["jquery"],function($){
	function LoginTo(opts){
		this.opts = $.extend({}, LoginTo.DEFAULTX, opts);
		if(this.opts.mode == 'getCookie'){
			this.getCookie();
		}else if(this.opts.mode == 'setCookie'){
			this.setCookie();
		};
	};

	LoginTo.prototype.setCookie = function() {
		var name = this.opts.name,
			value = this.opts.value;
		document.cookie = [name, '=', value].join('');
	};

	LoginTo.prototype.getCookie = function() {
		var name = this.opts.name;
		var arr = document.cookie.match(new RegExp("(^| )"+ name +"=([^;]*)(;|$)"));
		if (arr !== null) {
			login_arr = $.parseJSON(arr[2]);
			if(login_arr[0]=="guoyh"&&login_arr[1]=="guoyh123"){
				if (window.location.pathname == "/index.html") {
					window.location.href='home.html';
				}
			}else{
				window.location.href='index.html';
			}
		};
	};

	LoginTo.DEFAULTX = {
		name: "login_arr",
		value: {},
		mode: "getCookie"
	};

	return {
		LoginTo: LoginTo
	};
});





