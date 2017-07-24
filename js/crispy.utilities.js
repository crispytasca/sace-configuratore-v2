var animateHtmlOrBody = function () {
    var animate = "html, body";
    if (navigator.userAgent.search("MSIE") >= 0) {
        animate = "html";
    }
    if (navigator.userAgent.search("Chrome") >= 0) {
        animate = "body";
    }
    if (navigator.userAgent.search("Firefox") >= 0) {
        animate = "html";
    }
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        animate = "body";
    }
    if (navigator.userAgent.search("Opera") >= 0) {
        animate = "body";
    }
    return animate;
}
var isMobile = function () {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}