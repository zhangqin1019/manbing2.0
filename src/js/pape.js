requirejs.config({
	paths: {
		"jquery" : "libs/jquery.min"
	}
});
requirejs(["jquery", "module/echarts.min", "module/backtop", "module/number", "module/pop_box"],function($, echarts, backtop, number, pop){



	// 数字滚动效果
	$(".scroll-number").each(function(){
		var obj = $(this);
		obj.numberRock({
			speed: 6,
			count: obj.text()
		});
	});

	// 图表
	var option = {
		title : {
			show: false,
			text: '广州地区',
			subtext: '数据显示',
			link: 'test.html'
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['蒸发量']
		},
		toolbox: {
			show : true,
			feature : {
			mark : {show: true},
			dataView : {show: true, readOnly: false},
			magicType : {show: true, type: ['line', 'bar']},
			restore : {show: true},
			saveAsImage : {show: true}
		}
		},
		calculable : true,
		xAxis : [
			{
				type : 'category',
				data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月']
			}
		],
		yAxis : [
			{
				type : 'value'
			}
		],
		series : [
			{
				name:'蒸发量',
				type:'bar',
				data:[2.0, 33.6, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6],
				markPoint : {
					clickable : true,
					data : []
				},
				markLine : {
					data : [
						{type : 'average', name: '平均值'}
					]
				}
			}
		]
	};
	option_3 = {
		title: {
			show: false,
			text: '折线图'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['邮件营销','联盟广告','视频广告']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一','周二','周三','周四','周五','周六','周日']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name:'邮件营销',
				type:'line',
				stack: '总量',
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'联盟广告',
				type:'line',
				stack: '总量',
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'视频广告',
				type:'line',
				stack: '总量',
				data:[150, 232, 201, 154, 190, 330, 410]
			}
		]
	};
	var myChart = echarts.init(document.getElementById("container"));
	// 为echarts对象加载数据 
	myChart.setOption(option); 
	var myChart_3 = echarts.init(document.getElementById("container-3"));
	// 为echarts对象加载数据 
	myChart_3.setOption(option_3); 

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
})