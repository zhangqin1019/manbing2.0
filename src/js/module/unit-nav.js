// µ¼º½À¸
define(["jquery"],function($){
    function Nav(el,opts){
        this.opts = $.extend({},Nav.DEFAULTS,opts);
        this.$el = $(el).find("li");
        var this_el = this.$el;
        this.$el.eq(0).addClass("on");
        this.$el.each(function(i){
            $(this).click(function(){
                this_el.removeClass("on");
                $(this).addClass("on");
            });
        });
    };

    Nav.DEFAULTS = {

    };

    $.fn.extend({
        Nav: function(opts){
            return this.each(function(){
                new Nav(this, opts);
            });
        }
    });

    return {
        Nav: Nav
    };
});
