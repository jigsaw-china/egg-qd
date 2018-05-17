$(function(){
	var $prod_imgs = $("#prodmr li img");
	var $prod_top = $("#prodmr .top");
	var $prod_bot = $("#prodmr .bot");
	var $prod_ul = $("#prodmr ul");
	var $sttop,$stbot;
	
	$prod_imgs.mouseenter(function(){
		$("#prodml img").attr("src",$(this).attr('src'));
	})
	$prod_top.mouseenter(function(){$sttop = setInterval(gotop,1);})
	$prod_top.mouseleave(function(){clearInterval($sttop);})
	$prod_bot.mouseenter(function(){$stbot = setInterval(gobottom,1);})
	$prod_bot.mouseleave(function(){clearInterval($stbot);})
	
	function gotop() {var $stop = $prod_ul.scrollTop();$prod_ul.scrollTop($stop-=1);}
	function gobottom() {var $stop = $prod_ul.scrollTop();$prod_ul.scrollTop($stop+=1);}
})