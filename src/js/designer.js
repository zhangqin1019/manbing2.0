

	// 控制大小
	function control_size(){
	  $(document).mousemove(function(e) {
	    if (!!this.move) {
	      var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
	        callback = document.call_down || function() {
	          $(this.move_target).css({
	            'top': '',
	            'left': ''
	          });
	        };

	      callback.call(this, e, posix);
	    }
	  }).mouseup(function(e) {
	    if (!!this.move) {
	      var callback = document.call_up || function(){};
	      callback.call(this, e);
	      $.extend(this, {
	        'move': false,
	        'move_target': null,
	        'call_down': false,
	        'call_up': false
	      });
	    }
	  });

	  var $box = $('#right-copy-1tomany .item-box').each(function(){
	    var th_o = $(this);
	    th_o.mousedown(function(e) {
	      var offset = th_o.offset();

	      th_o.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
	      $.extend(document, {'move': true, 'move_target': this});
	    }).on('mousedown', '.item_coor', function(e) {
	      var posix = {
	          'w': th_o.width(), 
	          'h': th_o.height(), 
	          'x': e.pageX, 
	          'y': e.pageY
	        };
	        
	        $.extend(document, {'move': true, 'call_down': function(e) {
	        	var max_w = $("#right-copy-1tomany").width();
	          th_o.css({
	            'width': Math.max(40, Math.min(40*Math.ceil((e.pageX - posix.x + posix.w)/40),max_w)),
	            'height': Math.max(40, 40*Math.ceil((e.pageY - posix.y + posix.h)/40))
	          });
	        }
	      });
	      return false;
	    });
	  });
	};
	$(function(){
	  control_size();
	  $(".cpimgbox").each(function(){
	      var oh_w = $(this).find(".preview").width();
	      $(this).css("width",oh_w);
	    })
	});