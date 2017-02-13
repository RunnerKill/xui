
var _PageNavtab = {
	load : function(options) {
		options = $.extend({
			key : "main",		// 页面key required
			title : null,		// 页面标题，用于选项卡显示
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
				$page.addClass(_Page.type.navtab);
				var $target = _self.getPage(options.key);
				if($target.length < 1) { // 新选项卡
					$("." + _XUI.tag.right).append($page);
					_self.addTab(options.key, options.title);
				} else { // 老选项卡
					$target.replaceWith($page);
					_self.setTab(options.key, options.title);
				}
				_self.active(options.key);
				_self._onload($page);
			}
		});
	},
	openOuter : function(options) {
		options = $.extend({
			key : "main",		// 页面key required
			title : null,		// 页面标题，用于选项卡显示
			url : null			// 页面地址 required
		}, options);
		var _self = this;
		var $page = $('<div class="ui-page"><iframe src="' + options.url + '"></iframe></div>')
			.attr("data-key", options.key)
			.attr("data-url", options.url)
			.addClass(_Page.type.navtab);
		var $target = _self.getPage(options.key);
		if($target.length < 1) { // 新选项卡
			$("." + _XUI.tag.right).append($page);
			_self.addTab(options.key, options.title);
		} else { // 老选项卡
			$target.replaceWith($page);
			_self.setTab(options.key, options.title);
		}
		_self.active(options.key);
	},
	_nav : null, // 导航区域
	_wrapper : null, // 横向菜单容器
	_menu : null, // 横向菜单
	_list : null, // 下拉菜单
	// 初始化选项卡头
	init : function() {
		var _self = this;
		_self._nav = $("." + _XUI.tag.nav);
		_self._wrapper = $('<div class="wrapper"></div>');
		_self._menu = $('<ul></ul>').addClass(_XUI.tag.navTitle).appendTo(_self._wrapper);
		_self._list = $('<ul class="ui-nav-list"></ul>');
		_self._nav.prepend('<a href="javascript:;" class="move left"></a>')
			.append(_self._wrapper)
			.append('<a href="javascript:;" class="move right"></a>')
			.append('<a href="javascript:;" class="more"></a>')
			.append(_self._list);
		// 绑定事件
		_self._menu.on("click", "a[data-key]", function() {
			var key = $(this).attr("data-key");
			_self.active(key);
		});
		_self._menu.on("click", "i", function() {
			var key = $(this).siblings("a").attr("data-key");
			_self.close(key);
		});
		_self._nav.on("click", "a.move.left", function() { // move right
			if(_self.getInsideLength() <= 0) {
				return false;
			}
			var leave_length = _self.getMoveableLength() - _self.getInsideLength();
			var distance = - _self.liWidth();
			var ll = _self.getMoveableLength() % _self.liWidth();
			if(leave_length <= 0 && ll > 0) {
				distance = - ll;
			}
			_self.move(distance);
		});
		_self._nav.on("click", "a.move.right", function() { // move left
			if(_self.getInsideLength() >= _self.getMoveableLength()) {
				return false;
			}
			var leave_length = _self.getMoveableLength() - _self.getInsideLength();
			var distance = _self.liWidth();
			if(leave_length < _self.liWidth()) {
				distance = leave_length;
			}
			_self.move(distance);
		});
		_self._nav.on("click", "a.more", function() {
			_self._list.toggleClass("expanded");
			if(_self._list.is(".expanded")) {
				_self._list.show();
			} else {
				_self._list.hide();
			}
		});
		_self._list.on("click", ">li>a", function() {
			var key = $(this).attr("data-key");
			_self.active(key);
			_self._list.siblings("a.more").click();
		});
	},
	getTab : function(key) {
		return this._menu.find('a[data-key="' + key + '"]');
	},
	getPage : function(key) {
		return $('.' + _Page.type.navtab + '[data-key="' + key + '"]');
	},
	active : function(key) {
		this._menu.find("a.active").removeClass("active");
		this.getTab(key).addClass("active");
		this.getPage(key).siblings(".active").removeClass("active").end().addClass("active");
		this._list.find("a.active").removeClass("active")
			.end()
			.find('a[data-key="' + key + '"]').addClass("active");
		this.moveShow(this.getTab(key).parent().index());
	},
	addTab : function(key, title) {
		title = title || "新选项卡";
		var link_html = '<li><a href="javascript:;" title="' + title + '" data-key="' + key + '">' + title + '</a><i></i></li>';
		this._menu.append(link_html);
		this._list.append(link_html);
		this.reset();
	},
	setTab : function(key, title) {
		var $tab = this.getTab(key);
		if($tab.length > 0 && title) $tab.html(title);
	},
	close : function(key) {
		var isActive = this.getTab(key).hasClass("active");
		var prevKey = this.getTab(key).parent().prev().find(">a").attr("data-key");
		this.getTab(key).parent().remove();
		this.getPage(key).remove();
		this._list.find('a[data-key="' + key + '"]').parent().remove();
		this.reset();
		if(this.getInsideLength() > this.liWidth()) this.move(0 - this.liWidth());
		if(isActive) this.active(prevKey);
	},
	reset : function() {
		var $lis = this._menu.find(">li");
		var menu_width = this.liWidth() * $lis.length;
		this._menu.width(menu_width);
		if(menu_width > this._nav.width()) {
			this._nav.addClass("has-btn");
		} else {
			this._nav.removeClass("has-btn");
			this._menu.css("margin-left", "0px");
		}
	},
	// li宽度
	liWidth : function() {
		return this._menu.find(">li").eq(0).outerWidth();
	},
	// 已经移动的长度
	getInsideLength : function() {
		return parseInt(this._menu.css("margin-left").replace("px","")) * -1;
	},
	// 最大可移动长度
	getMoveableLength : function() {
		return this._menu.width() - this._wrapper.width();
	},
	// 移动
	move : function(distance) { // distance是需要继续往左移动的距离
		var _self = this;
		if(!_self._nav.hasClass("has-btn") || _self._menu.hasClass("moving")) return false;
		var move = _self.getInsideLength() + distance;
		_self._menu.addClass("moving");
		_self._menu.stop().animate({
			"margin-left": - move + "px"
		}, "fast", function() {
			_self._menu.removeClass("moving");
		});
	},
	// 移动至显示完全
	moveShow : function(index) {
		var left_length = this.liWidth() * index;
		var right = left_length - this.getInsideLength();
		if(right < 0) { // 需要右移
			this.move(right);
			return true;
		}
		var left = left_length + this.liWidth() - this.getInsideLength() - this._wrapper.width();
		if(left > 0) { // 需要左移
			this.move(left);
			return true;
		}
	},
	_onload : function($page) {
		// 初始化按钮区域
		_Button.init($page);
		_Page.onload($page);
	}
};