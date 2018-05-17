function jQuery2(e) {return document.getElementById(e);}
document.getElementsByClassName = function(cl) {
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
}
var MyMar;
var speed = 1; //速度，越大越慢
var spec = 1; //每次滚动的间距, 越大滚动越快
var ipath = 'img/'; //图片路径
var thumbs = document.getElementsByClassName('thumb_img');
for (var i=0; i<thumbs.length; i++) {
    //thumbs[i].onmouseover = function () {jQuery2('main_img').src=this.rev;};
    thumbs[i].onclick = function () {jQuery2('main_img').src=this.rev;jQuery2('main_p').innerHTML=this.rel;}
}
//jQuery2('main_img').onclick = function () {location = this.link;}
jQuery2('prevb').onmouseover = function() {MyMar=setInterval(gotop,speed);}
jQuery2('prevb').onmouseout = function() {clearInterval(MyMar);}
jQuery2('nextb').onmouseover = function() {MyMar=setInterval(gobottom,speed);}
jQuery2('nextb').onmouseout = function() {clearInterval(MyMar);}
function gotop() {jQuery2('showArea1').scrollTop-=spec;}
function gobottom() {jQuery2('showArea1').scrollTop+=spec;}