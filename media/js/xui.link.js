
var _Link = {
	target : $.extend(_Page.area, {
		// 无区域链接（异步）
		iframe : "iframe", 	// iframe
		lookup : "lookup", 	// 查找
		attachment : "attachment", 	// 附件
		bringBack : "bringBack", 	// 带回
		select : "select", 	// 选择后执行
		ajax : "ajax"		// 询问后执行
	}),
	init : function() {
		var _self = this;
		// target="menu"
		this._bind(this.target.menu, function($link) {
			$link.parent().siblings(".active").removeClass("active").end().addClass("active");
			_PageMenu.load({
				url : $link.attr("href")
			});
		});
		// target="main"
		this._bind(this.target.main, function($link) {
			_PageNavtab.load({
				url : $link.attr("href")
			});
		});
		// target="navtab"
		this._bind(this.target.navtab, function($link) {
			var url = $link.attr("href");
			var opt = {
				key : $link.attr("rel"),
				title : $link.attr("title") || $link.text(),
				url : url
			};
			if(_Util.isOuterUrl(url)) {
				_PageNavtab.openOuter(opt);
			} else {
				_PageNavtab.load(opt);
			}
		});
		// target="iframe"
		this._bind(this.target.iframe, function($link) {
			_PageNavtab.openOuter({
				key : $link.attr("rel"),
				title : $link.attr("title") || $link.text(),
				url : $link.attr("href")
			});
		});
		// target="dialog"
		this._bind(this.target.dialog, function($link) {
			var url = $link.attr("href");
			var opt = {
				key : $link.attr("rel"),
				title : $link.attr("title") || $link.text(),
				url : $link.attr("href"),
				model : typeof($link.attr("model")) == "undefined" || $link.attr("model") == "true", // 默认为模态对话框
				width : $link.attr("width"),
				height : $link.attr("height")
			};
			if(_Util.isOuterUrl(url)) {
				_Layer.openPage(opt);
			} else {
				_PageDialog.load(opt);
			}
		});
		// target="inner"
		this._bind(this.target.inner, function($link) {
			_PageInner.load({
				parent : $link.parentPage(),
				url : $link.attr("href")
			});
		});
		// target="lookup"
		this._bind(this.target.lookup, function($link) {
			_PageDialog.load({
				key : $link.attr("rel"),
				title : $link.attr("title"),
				url : $link.attr("href"),
				model : typeof($link.attr("model")) == "undefined" || $link.attr("model") == "true", // 默认为模态对话框
				width : $link.attr("width"),
				height : $link.attr("height")
			});
		});
		// target="attachment"
		this._bind(this.target.attachment, function($link) {
			_PageDialog.load({
				key : $link.attr("rel"),
				title : $link.attr("title"),
				url : $link.attr("href"),
				model : typeof($link.attr("model")) == "undefined" || $link.attr("model") == "true", // 默认为模态对话框
				width : $link.attr("width") || 630,
				height : $link.attr("height") || 360
			});
		});
		// target="bringBack"
		this._bind(this.target.bringBack, function($link) {
			var $boxs = $link.parentPage().find('input[type="checkbox"][name="' + $link.attr("rel") + '"]:not(.all-select):checked');
			if($boxs.length < 1) {
				_Layer.msg(_XUI.code.message, "请至少选择一项!");
				return false;
			}
			var array = [];
			$boxs.each(function(){
				var obj = eval("(" + $(this).val() + ")");
				array.push(obj);
		    });
			_PageDialog.bringBack($link.attr("data-group"), array);
		});
		// target="select"
		this._bind(this.target.select, function($link) {
			var $boxs = $link.parentPage().find('input[type="checkbox"][name="' + $link.attr("rel") + '"]:not(.all-select):checked');
			if($boxs.length < 1) {
				_Layer.msg(_XUI.code.message, "请至少选择一项!");
				return false;
			}
			_Layer.confirm('确定' + ($link.attr("title") || '继续') + '?', function() {
				_self._request($link.attr("href"), $boxs.serializeArray(), $link);
			});
		});
		// target="ajax"
		this._bind(this.target.ajax, function($link) {
			_Layer.confirm('确定' + ($link.attr("title") || '继续') + '?', function() {
				_self._request($link.attr("href"), null, $link);
			});
		});
		// no "target" attribute
		this._bind(null, function($link) {
			$link.parentPage().forward({
				title : $link.attr("title") || $link.text(),
				url : $link.attr('href')
			});
		});
	},
	_bind : function(target, func) {
		var _self = this;
		var selector = target ? ('a[target="' + target + '"]') : 'a:not([target])';
		selector = "." + _XUI.tag.page + " " + selector +
				  ",." + _XUI.tag.topList + " " + selector +
				  ",." + _XUI.tag.topNav + " " + selector;
		$(document).on("click", selector, function(e) {
			if(target != _self.target.bringBack && !_self._isEnabled($(this).attr("href"))) return false;
			func($(this), e);
			e.preventDefault();
		});
	},
	_request : function(url, data, $link) {
		if(!this._isEnabled(url)) return false;
		_Ajax.request({
			url : url,
			type : "GET",
			data : data || {},
			dataType : "json",
			callback : function(obj) {
				_Ajax.callbackJson($link, obj);
			}
		});
	},
	_isEnabled : function(url) {
		return url != "javascript:;" && url != "javascript:void(0);" && url != "#";
	}
};
	
