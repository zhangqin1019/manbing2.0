requirejs.config({
	paths: {
		"jquery": "libs/jquery.min"
	}
});

requirejs(["jquery", "module/SimpleTree"], function($, SimpleTree){
	
	var json = [
	    {
	        "name": "<i class='l'>+-</i>协作医院",
	        "list": [
	            {
	            	//显示名称
	                "name": "<i class='l'>+-</i> 广州市第一人民医院",
	                //跳转名称
	                // "url" :"url_herf",
	                //下级
	                "list": [
	                    {
	                        "name": "<i class='l'></i> &nbsp;肾病科"
	                    }
	                ]
	            },
	            {
	            	//显示名称
	                "name": "<i class='l'>+-</i> 陕西省中医院",
	                //跳转名称
	                // "url" :"url_herf",
	                //下级
	                "list": [
	                    {
	                        "name": "<i class='l'></i> &nbsp;肾病科"
	                    }
	                ]
	            },
	            {
	            	//显示名称
	                "name": "<i class='l'>+-</i> 黑龙江中医科学研究院",
	                //跳转名称
	                // "url" :"url_herf",
	                //下级
	                "list": [
	                    {
	                        "name": "<i class='l'></i> &nbsp;妇女科"
	                    }
	                ]
	            }
	        ]
	    }
	]
	/*递归实现获取无级树数据并生成DOM结构*/
		var str = "";
		var forTree = function(o){
		 	for(var i=0;i<o.length;i++){
		   		 var urlstr = "";
				 try{
		 				if(typeof o[i]["url"] == "undefined"){
				   	   		urlstr = "<li><a>" + o[i]["name"] +"</a><ul>";
		 				}else{
		 					urlstr = "<li><a>" + "<a href="+ o[i]["url"] +">"+ o[i]["name"] +"</a></a><ul>"; 
		 				}
		 			str += urlstr;
		 			if(o[i]["list"] != null){
		 				forTree(o[i]["list"]);
		 			}
		   		 str += "</ul></li>";
		 		}catch(e){}
		 }
		 return str;
		}
		/*添加无级树*/
		document.getElementById("menuTree").innerHTML = forTree(json);
		/*树形菜单*/
		var menuTree = function(){
		 //给有子对象的元素加
			 $("#menuTree ul").each(function(index, element) {
		 		var ulContent = $(element).html();
		 		var spanContent = $(element).siblings("a").html();
		 		if(ulContent){
					 $(element).siblings("a").html(spanContent) 
		 		}
			 });

			 $("#menuTree").find("li a").click(function(){
			 	 var ul = $(this).siblings("ul");
				 var spanStr = $(this).html();
			 	 var spanContent = spanStr.substr(3,spanStr.length);
				 if(ul.find("li").html() != null){
					 if(ul.css("display") == "none"){
						 ul.show();
			 			 // $(this).html("[-]" + spanContent);
			 		 }else{
			 			ul.hide();
			 			// $(this).html("[+] " + spanContent);
			 		 }
			 	}
			 })
		}()
		/*树形列表展开*/
		$("#btn_open").click(function(){
			$("#menuTree ul").show();
		 	curzt("-");
		})
		/*收缩*/
		$("#btn_close").click(function(){
		 	$("#menuTree ul").hide();
		 	curzt("+");
		})
		function curzt(v){
		 $("#menuTree span").each(function(index, element) {
			 var ul = $(this).siblings("ul");
			 var spanStr = $(this).html();
			 var spanContent = spanStr.substr(3,spanStr.length);
			 if(ul.find("div").html() != null){
		 		$(this).html("["+ v +"] " + spanContent);
		 	 }
		 }); 
		}

		($("#menuTree > li > ul > li")).each(function(){
			if($(this).next().length != 0){
				$(this).find("ul>li").addClass("border-left");
			}
		})
		
})