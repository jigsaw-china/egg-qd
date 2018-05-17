// JavaScript Document

function DY_scroll(_wraper,_prev,_next,_img,_speed,_or)
     {
      var wraper = $(_wraper);
      wraper.each(function(i){
      	  var prev = $(this).find(_prev);
	      var next = $(this).find(_next);
	      var img = $(this).find(_img).find('ul');
	      var w = img.find('li').outerWidth(true);
	      var s = _speed;
	      next.click(function()
	           {
	            img.animate({'margin-left':-w},function()
	                      {
	                       img.find('li').eq(0).appendTo(img);
	                       img.css({'margin-left':0});
	                       });
	            });
	      prev.click(function()
	           {
	            img.find('li:last').prependTo(img);
	            img.css({'margin-left':-w});
	            img.animate({'margin-left':0});
	            });
	      if (_or == true)
	      {
	       ad = setInterval(function() { next.click();},s*1000);
	       $(this).hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*1000);});
	
	      }
      })
     }
     DY_scroll('.img-scroll','.prev','.next','.img-list',3,false);// true为自动播放，不加此参数或false就默认不自动