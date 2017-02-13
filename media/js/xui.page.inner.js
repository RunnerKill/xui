
var _PageInner = {
	load : function(options) {
		options = $.extend({
			key : "inner",		// 页面key，暂时未用到
			parent : null,		// 直接父亲页面，required
			url : null,			// 页面地址 required
			data : {},			// 请求参数
			callback : null  	// 用户回调
		}, options);
		var _self = this;
		_Page.load({
			key : options.key,
			url : options.url,
			data : options.data,
			ready : function($page) {
				$page.addClass(_Page.type.inner);
				var $target = _self.getPage(options.parent);
				if($target.length < 1) { // 不存在inner页
					options.parent.find('.' + _XUI.tag.inner + ":first").append($page);
				} else { // 存在此inner页
					$target.replaceWith($page);
				}
				_self._onload($page);
			}
		});
	},
	// 获取所给页面的直接子页面
	getPage : function($parent) {
		return $parent.find('.' + _Page.type.inner + ":first");
	},
	_onload : function($page) {
		// 初始化按钮区域
		_Button.init($page);
		_Page.onload($page);
	}
};