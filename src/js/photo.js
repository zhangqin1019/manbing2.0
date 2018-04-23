requirejs.config({
    paths: {
        "jquery" : "libs/jquery.min"
    }
});


requirejs(["jquery","module/PhotoViewer"],function($,PhotoViewer){

	//照片查看器
	$(".photo").PhotoViewer({
		mainClass: "picture"
	});


	/*$(function(){
		$(".photo a").each(function(i){
			$(this).click(function(){
				$(".total").eq(i).fadeIn("slow");
			});
		});
		$(".picture span").on("click",function(){
			$(this).parents(".total").fadeOut("slow");
		});
	});*/

});