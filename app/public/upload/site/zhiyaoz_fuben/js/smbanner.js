function MobileCarousel(oId, isAuto, s) {
	this.isAuto = isAuto;
	this.s = s / 2;
	this.carousel = document.querySelector("#" + oId);
	this.lis = document.querySelectorAll("#" + oId + " ul li");
	this.xiaoyuandians = document.querySelectorAll("#" + oId + " ol li");
	this.ul = document.querySelector("#" + oId + " ul");
	this.images = document.querySelectorAll("#" + oId + " ul li img");
	var self = this;
	this.init();
	this.autoHandler();
	this.carousel.addEventListener("touchstart", function(event) {
		self.touchstartHandler.call(self, event)
	}, false);
	this.carousel.addEventListener("touchmove", function(event) {
		self.touchmoveHandler.call(self, event)
	}, false);
	this.carousel.addEventListener("touchend", function(event) {
		self.touchendHandler.call(self, event, isAuto)
	}, false);
	window.addEventListener("resize", function() {
		self.init.call(self)
	}, false)
}
MobileCarousel.prototype.autoHandler = function() {
	if(this.isAuto) {
		var $this = this;
		var transitionString = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
		autoH();

		function autoH() {
			$this.st = setTimeout(function() {
				$this.lis[$this.idx].style.webkitTransition = "none";
				$this.lis[$this.prevIdx].style.webkitTransition = "none";
				$this.lis[$this.nextIdx].style.webkitTransition = "none";
				$this.lis[$this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
				$this.lis[$this.nextIdx].style.webkitTransform = "translate3d(" + $this.w + "px,0,0)";
				$this.lis[$this.prevIdx].style.webkitTransform = "translate3d(" + -$this.w + "px,0,0)";
				$this.st1 = setTimeout(function() {
					$this.lis[$this.idx].style.webkitTransition = transitionString;
					$this.lis[$this.idx].style.webkitTransform = "translate3d(" + -$this.w + "px,0,0)";
					$this.lis[$this.nextIdx].style.webkitTransition = transitionString;
					$this.lis[$this.nextIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
					$this.prevIdx = $this.idx;
					$this.idx = $this.nextIdx;
					$this.nextIdx++;
					if($this.nextIdx > $this.lis.length - 1) {
						$this.nextIdx = 0
					}
					for(var i = 0; i < $this.xiaoyuandians.length; i++) {
						$this.xiaoyuandians[i].className = ""
					}
					$this.xiaoyuandians[$this.idx].className = "cur";
					autoH()
				}, $this.s * 1000)
			}, $this.s * 1000)
		}
	}
};
MobileCarousel.prototype.init = function() {
	this.w = parseFloat(getComputedStyle(this.carousel)["width"]);
	this.idx = 0;
	this.nextIdx = 1;
	this.prevIdx = this.lis.length - 1;
	this.carousel.style.height = this.w * (756 / 1920) + "px";
	this.lis[0].style.transition = "none";
	this.lis[0].style.webkitTransform = "translate3d(0px,0,0)";
	for(var i = 1; i < this.lis.length; i++) {
		this.lis[i].style.transition = "none";
		this.lis[i].style.webkitTransform = "translate3d(" + this.w + "px,0,0)"
	}
};
MobileCarousel.prototype.touchstartHandler = function(event) {
	this.startTime = new Date();
	var finger = event.touches[0];
	this.startX = finger.clientX;
	this.lis[this.idx].style.webkitTransition = "none";
	this.lis[this.prevIdx].style.webkitTransition = "none";
	this.lis[this.nextIdx].style.webkitTransition = "none";
	this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
	this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
	this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
	clearTimeout(this.st);
	clearTimeout(this.st1)
};
MobileCarousel.prototype.touchmoveHandler = function(event) {
	var finger = event.touches[0];
	this.dx = finger.clientX - this.startX;
	this.lis[this.idx].style.webkitTransform = "translate3d(" + (0 + this.dx) + "px,0,0)";
	this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + (this.w + this.dx) + "px,0,0)";
	this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + (-this.w + this.dx) + "px,0,0)"
};
MobileCarousel.prototype.touchendHandler = function(event) {
	var endDuaring = new Date() - this.endTime;
	this.endTime = new Date();
	var touchDuaring = this.endTime - this.startTime;
	if(endDuaring < 300) {
		var transitionString = "none"
	} else {
		var transitionString = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s"
	}
	if((this.dx >= this.w / 3) || (this.dx > 10 && touchDuaring < 200)) {
		this.lis[this.idx].style.webkitTransition = transitionString;
		this.lis[this.idx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransition = transitionString;
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
		this.nextIdx = this.idx;
		this.idx = this.prevIdx;
		this.prevIdx--;
		if(this.prevIdx < 0) {
			this.prevIdx = this.lis.length - 1
		}
	} else {
		if((this.dx <= -this.w / 3) || (this.dx < -10 && touchDuaring < 200)) {
			this.lis[this.idx].style.webkitTransition = transitionString;
			this.lis[this.idx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
			this.lis[this.nextIdx].style.webkitTransition = transitionString;
			this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
			this.prevIdx = this.idx;
			this.idx = this.nextIdx;
			this.nextIdx++;
			if(this.nextIdx > this.lis.length - 1) {
				this.nextIdx = 0
			}
		} else {
			this.lis[this.idx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
			this.lis[this.nextIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
			this.lis[this.prevIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)"
		}
	}
	for(var i = 0; i < this.xiaoyuandians.length; i++) {
		this.xiaoyuandians[i].className = ""
	}
	this.xiaoyuandians[this.idx].className = "cur";
	this.autoHandler()
};
var carousel = new MobileCarousel("carousel", true, 3);