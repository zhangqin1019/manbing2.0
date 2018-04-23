// 提交表单并验证
define(["jquery", "module/pop_tip"],function($, pop_tip){
	function Validate(el,opts){
		this.opts = $.extend({},Validate.DEFAULTS,opts);
		this.$el = $(el);
		var t_mode = this.opts.mode,th_s = this,th_e = this.$el;
		this.$el.click(function(){
			var vali = 0;
			$.each(t_mode,function(i,val){
				var t_val = $("."+ val.class +"");
				var t_message=t_val.siblings(".txt-message");
				if(val.mode == 'name'){
					var NameReg=/^[\u4E00-\u9FA5A-Za-z]{3,10}$/;         //姓名正则
					if(t_val.val() == '') {
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!NameReg.test(t_val.val())){
						$.tooltip('格式不正确...');
						t_message.html("长度为3-10位的中英文");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("姓名填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali = 1;
					}
				}else if(val.mode=='password'){
					var PasswordReg=/^[a-zA-Z]\w{5,17}$/;      //密码正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!PasswordReg.test(t_val.val())){
						$.tooltip('格式不正确...');
						t_message.html("密码必须以字母开头，其余可以为字母、数字和下划线，长度为6-18位");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("密码填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=='confirm'){
					var PasswordValue;
					if($(".cs_password").length==1){
                        PasswordValue=$(".cs_password").val();
					}
					else{
						PasswordValue=$(".cs_password:last").val();
					}
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali=0;
						return false;
					}else if(t_val.val()!=PasswordValue){
						$.tooltip('密码必须一致...');
						t_message.html("密码必须一致");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("确认密码填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=='radio'){
					var sum=0;
					for(var i=0;i<t_val.length;i++){
						if(t_val[i].checked){
							sum+=1;
						}
					}
					if(sum!=1){
						$.tooltip('还没选择...');
						t_message.html("还没选择");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("已选择");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=='checkbox'){
					var sum=0;
					for(var i=0;i<t_val.length;i++){
						if(t_val[i].checked){
							sum+=1;
						}
					}
					if(sum<1){
						$.tooltip('还没选择...');
						t_message.html("还没选择");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("已选择");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=='date'){
					var DateReg=/^\d{4}-\d{1,2}-\d{1,2}$/;         //日期正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!DateReg.test(t_val.val())){
						$.tooltip("格式不正确...如2016-11-23");
						t_message.html("日期格式如2016-11-23");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("日期填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=="email"){
					var EmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  //邮箱正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!EmailReg.test(t_val.val())){
					    $.tooltip('格式不正确...');
						t_message.html("必须包含@和.符号");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("邮箱填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali = 1;
					}
				}else if(val.mode=='phone'){
					var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[0-9])[0-9]{8}$/ ; //手机正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!PhoneReg.test(t_val.val())){
						$.tooltip('格式不正确...');
						t_message.html("手机格式不正确");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("手机填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali = 1;
					}
				}else if(val.mode=='qq'){
					var QQReg=/^[1-9][0-9]{4,}$/;         //QQ正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!QQReg.test(t_val.val())){
						$.tooltip('格式不正确...');
						t_message.html("qq格式不正确");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("qq填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				}else if(val.mode=='address'){
					var AddressReg=/^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;       //地址正则
					if(t_val.val()==''){
						$.tooltip('这个是必填项...');
						t_message.html("这个是必填项");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else if(!AddressReg.test(t_val.val())){
						$.tooltip('格式不正确...');
						t_message.html("地址为中文、数字或字母,长度为2-30位");
						t_message.addClass("failed");
						t_val.focus();
						vali = 0;
						return false;
					}else{
						t_message.html("地址填写正确");
						t_message.removeClass("failed");
						t_message.addClass("success");
						vali=1;
					}
				};
			});
			if(vali == 1){
				opts.addFunction();
			}
		})
	};

	Validate.DEFAULTS = {
		mode: '',
		class: '',
		addFunction: function(){}
	};

	$.fn.extend({
		Validate: function(opts){
			return this.each(function(){
				new Validate(this, opts);
			});
		}
	});

	return {
		Validate: Validate
	};
});