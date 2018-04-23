requirejs.config({
	paths: {
		"jquery": "libs/jquery.min"
	}
});

requirejs(["jquery", "module/moveMenu", "module/scrollbar"],function($, movemenu, scrollbar){
	$(".role").movemenu({
		leftBox: "leftbox",
		rightBox: "rightbox",
		moveIn: "moveIn",
		moveOut: "moveOut",
		addFunction: function(){}
	});

	//添加滚动条
	$(".box").panel({iWheelStep:32});
})