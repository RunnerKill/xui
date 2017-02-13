
var _Util = {
	createObj : function(html, selector) {
		return $('<div></div>').html(html).find(selector);
	},
	isIE : function(ver){
	    var b = document.createElement('b');
	    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
	    return b.getElementsByTagName('i').length === 1;
	},
	isOuterUrl : function(url) {
		return /^(https?|s?ftp):\/\/.*$/i.test(url);
	}
};

(function($){
	$.fn.extend({
		outerHtml : function() {
//			return $(this).prop("outerHTML");
			return $('<div></div>').append($(this)).html();
		}
	});
})(jQuery);

Array.prototype.indexOf = function(el){
	 for ( var i = 0, n = this.length; i < n; i++) {
		if (this[i] === el) {
			return i;
		}
	}
	return -1;
};
String.prototype.trim=function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
//日期类扩展formate方法
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"H+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
document.onkeydown = function(e) {
	if (!e) {
		e = window.event;
	}
	// BackSpace 8;
	if ((event.keyCode == 8)
			&& ((event.srcElement.type != "text"
			&& event.srcElement.type != "textarea"
			&& event.srcElement.type != "password"
			&& $(event.srcElement).attr("contenteditable") != "true")
			|| event.srcElement.readOnly == true)) {
		event.keyCode = 0;
		event.returnValue = false;
	}
	return true;
};