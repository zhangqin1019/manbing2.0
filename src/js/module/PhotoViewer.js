//相册查看器
define(["jquery"],function($){
	function PhotoViewer(el,opts){
		this.opts = $.extend({},PhotoViewer.DEFAULTS,opts);
        this.$el = $(el).find("a");
       	// var mainClass = $("."+ this.opts.mainClass +"").find("span");
        // this.$el.each(function(i){
        // 	$(this).click(function(){
        // 		$(".total").eq(i).fadeIn("slow");
        // 	});
        // });
        // mainClass.on("click",function(){
        // 	$(this).parents(".total").fadeOut("slow");
        // });
        var src = $(el).find("img").attr("src"),
            html ="<div class='total'><div class='picture'><img src='"+ src +"'/><span><i class='iconfont'>&#xe641;</i></span></div></div>";
        function addHtml(){
            $("body").append(html);
            $(".total span").click(function(){
                var parent = $(this).parents(".total");
                parent.fadeOut("slow");
                setTimeout(function(){
                    parent.remove();
                }, 1000)
            })
        }
        this.$el.click(function(){
            addHtml();
            $(".total").fadeIn("slow");
        });
	};

	PhotoViewer.DEFAULTS = {
        mainClass: ''
    };

    $.fn.extend({
        PhotoViewer: function(opts){
            return this.each(function(){
                new PhotoViewer(this, opts);
            });
        }
    });

    return{
        PhotoViewer: PhotoViewer
    };
});