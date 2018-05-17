var lock = true;
$(".menubtn").click(function() {
	if(lock) {
		$(".nav-move").slideDown(300, function() {
			$(".nav-move ul").slideDown(400)
		});
		$(".menubtn").css({
			"transform": "rotate(90deg)"
		})
		$(".menubtn span").css({
			"background-color": "#fff"
		})
		lock = false;

		//show mask
		$("#mask").fadeIn(600);
		$("body").css({
			"overflow": "hidden"
		});
	} else {
		hideNav();
	}
})

$("#mask").click(function() {
	hideNav();
})

var hideNav = function() {
	$(".menubtn").css({
		"transform": "rotate(0)"
	})
	$(".menubtn span").css({
		"background-color": "#D9251C"
	})
	$(".nav-move").slideUp(300);
	$(".nav-move ul").hide(400);
	lock = true;

	//hide mask
	$("#mask").fadeOut(600);
	$("body").css({
		"overflow": "auto"
	});
}