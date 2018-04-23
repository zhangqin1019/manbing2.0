requirejs.config({
	paths: {
		"jquery" : "libs/jquery.min"
	}
});
requirejs(["jquery", "module/pop_box", "module/validate_form"],function($, pop, Validate){

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


    $('.ft-submit').Validate({
        mode: [
            {
                "class": "cs_name",
                "mode": "name"
            },
            {
                "class":"cs_password",
                "mode":"password"
            },
            {
                "class":"cs_confirm_password",
                "mode":"confirm"
            },
            {
                "class":"cs_sex",
                "mode":"radio"
            },
            {
                "class":"cs_hobby",
                "mode":"checkbox"
            },
            {
                "class":"cs_date",
                "mode":"date"
            },
            {
                "class": "cs_email",
                "mode": "email"
            },
            {
                "class": "cs_phone",
                "mode": "phone"
            },
            {
                "class": "cs_qq",
                "mode": "qq"
            },
            {
                "class": "cs_address",
                "mode": "address"
            }
        ],
        addFunction: function(){
            console.log("aaa");
        }
    });

    //提交并验证表单
	// $('.ft-submit').click(function() {
	// 	var EmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件正则
	// 	var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[0-9])[0-9]{8}$/ ; //手机正则
	// 	var $nickname = $('.cs_name');
	// 	var $nickqq = $('.cs_qq');
	// 	var $email = $('.cs_email'); 
	// 	var $phone = $('.sc_phone');
	// 	var $address = $('.cs_address');
	// 	if($nickname.val() == ''){
	// 		$.tooltip('职位名称还没填呢...'); $nickname.focus();
	// 	}else if($email.val() == ''){
	// 		$.tooltip('电子邮箱还没填呢...'); $email.focus();
	// 	}else if(!EmailReg.test($email.val())){
	// 		$.tooltip('请输入正确的电子邮箱...'); $email.focus();
	// 	}else if($phone.val() == ''){
	// 		$.tooltip('手机还没填呢...'); $phone.focus();
	// 	}else if(!PhoneReg.test($phone.val())){
	// 		$.tooltip('手机格式错咯...'); $phone.focus();
	// 	}else if($nickqq.val() == ''){
	// 		$.tooltip('联系QQ还没填呢...'); $nickqq.focus();
	// 	}else if($address.val() == ''){
	// 		$.tooltip('邮寄地址不能为空...'); $address.focus();
	// 	}else{
	// 		$.tooltip('提交成功，2秒后自动关闭',2000,true,function(){
				
	// 		});
	// 	}
	// });


});