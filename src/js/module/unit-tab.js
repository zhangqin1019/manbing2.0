// ѡ�
define(["jquery"],function($){
    function Tab(el,opts){
        this.opts = $.extend({},Tab.DEFAULTS,opts);
        this.$el = $(el).find("li");
        var mainclass = $("."+ this.opts.mainclass +"").find(".tab-pane"),
            this_el = this.$el;
        this.$el.eq(0).addClass("on");
        mainclass.eq(0).addClass("on");
        this.$el.each(function(i){
            $(this).click(function(){
                this_el.removeClass("on");
                $(this).addClass("on");
                mainclass.removeClass("on");
                mainclass.eq(i).addClass("on");
            });
        });
    };

    Tab.DEFAULTS = {
        mainclass: ''
    };

    $.fn.extend({
        Tab: function(opts){
            return this.each(function(){
                new Tab(this, opts);
            });
        }
    });

    return {
        Tab: Tab
    };
});
