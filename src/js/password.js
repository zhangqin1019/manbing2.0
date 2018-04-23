requirejs.config({
    paths: {
        "jquery": "libs/jquery.min"
    }
});
requirejs(["jquery", "module/validate_form"], function($, Validate) {
    function changeClass() {
        $('#level').removeClass('pw-weak').removeClass('pw-medium').removeClass('pw-strong');
    }
    function keyup(){
        $('#pass input').keyup(function() {
            var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"),
                mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
                enoughRegex = new RegExp("(?=.{6,}).*", "g"),
                textValue = $(this).attr('value');
            if (false == enoughRegex.test(textValue)) {
                changeClass();
                $('#level').addClass(' pw-defule');
                //密码小于六位的时候，密码强度图片都为灰色 
            } else if (strongRegex.test(textValue)) {
                changeClass();
                $('#level').addClass(' pw-strong');
                //密码为八位及以上并且大小写字母数字特殊字符三项都包括,强度最强 
            } else if (mediumRegex.test(textValue)) {
                changeClass();
                $('#level').addClass(' pw-medium');
                //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
            } else {
                changeClass();
                $('#level').addClass('pw-weak');
                //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
            }
        });
    };
    keyup();
    //密码明文密文切换
    $('.passeye').click(function() {
        var $this = $(this),
            inp = $this.prev(),
            cname = inp.attr('name'),
            val = inp.attr('value'),
            curClass = inp.attr('class'),
            text_html = '<input name="' + cname + '" class="' + curClass + '" value="' + val + '" type="text">',
            pwd_html = '<input name="' + cname + '" class="' + curClass + '" value="' + val + '" type="password">';

        function addInp(html) {
            $this.prev().remove();
            $this.parent().prepend(html);
            keyup();
        }
        if ($this.hasClass('ceye')) {
            $this.removeClass('ceye').addClass('oeye');
            addInp(text_html);
        } else {
            $this.removeClass('oeye').addClass('ceye');
            addInp(pwd_html);
        }
    });
    //表单验证
    $('.pwd-save').Validate({
        mode: [{
            "class": "cs_password",
            "mode": "password"
        }, {
            "class": "cs_confirm_password",
            "mode": "confirm"
        }, ]
    });
});