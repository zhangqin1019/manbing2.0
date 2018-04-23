requirejs.config({
    paths: {
        "jquery" : "libs/jquery.min"
    }
});
requirejs(["jquery", "module/laypage"], function($, laypage){
	var data = [{"d1":"<input type='checkbox'>","d2":"已经处理","d3":"预约1","d4":"123","d5":"张三丰","d6":"660120***","d7":"2016-11-5","d8":"","d9":"是","d10":"","d11":"","d12":"2016-12-25","d13":"","d14":""},{"d1":"<input type='checkbox'>","d2":"已经处理","d3":"预约","d4":"123","d5":"张三丰","d6":"660120***","d7":"2016-11-5","d8":"","d9":"是","d10":"","d11":"","d12":"2016-12-25","d13":"","d14":""},{"d1":"<input type='checkbox'>","d2":"已经处理","d3":"预约2","d4":"123","d5":"张三丰","d6":"660120***","d7":"2016-11-5","d8":"","d9":"是","d10":"","d11":"","d12":"2016-12-25","d13":"","d14":""},{"d1":"<input type='checkbox'>","d2":"已经处理","d3":"预约","d4":"123","d5":"张三丰","d6":"660120***","d7":"2016-11-5","d8":"","d9":"是","d10":"","d11":"","d12":"2016-12-25","d13":"","d14":""},{"d1":"<input type='checkbox'>","d2":"已经处理","d3":"预约","d4":"123","d5":"张三丰","d6":"660120***","d7":"2016-11-5","d8":"","d9":"是","d10":"","d11":"","d12":"2016-12-25","d13":"","d14":""}];

	var nums = 2; //每页出现的数量
	var pages = Math.ceil(data.length/nums); //得到总页数

	var thisDate = function(curr){
	    //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
	    var str = '', last = curr*nums - 1;
	    last = last >= data.length ? (data.length-1) : last;
	    for(var i = (curr*nums - nums); i <= last; i++){
	        // str += '<li>'+ data[i] +'</li>';
	        str += '<tr><td>'+data[i].d1+'</td><td>'+data[i].d2+'</td><td>'+data[i].d3+'</td><td>'+data[i].d4+'</td><td>'+data[i].d5+'</td><td>'+data[i].d6+'</td><td>'+data[i].d7+'</td><td>'+data[i].d8+'</td><td>'+data[i].d9+'</td><td>'+data[i].d10+'</td><td>'+data[i].d11+'</td><td>'+data[i].d12+'</td><td>'+data[i].d13+'</td><td>'+data[i].d14+'</td></tr>';
	    }
	    return str;
	};

	//调用分页
	laypage({
	    cont: 'page',
	    pages: pages,
	    jump: function(obj){
	        $('#c-t-data').html(thisDate(obj.curr));
	    }
	})
});
