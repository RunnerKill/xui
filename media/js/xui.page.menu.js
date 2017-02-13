
var _PageMenu = {
	// 加载左侧菜单
	load : function(options) {
		options = $.extend({
			key : "left_menu",	// 页面key required
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
				$page.addClass(_Page.type.menu);
				var $target = _self.getPage(options.key);
				if($target.length < 1) { // 新菜单
					$("." + _XUI.tag.left).append($page);
				} else { // 老菜单
					$target.replaceWith($page);
				}
				_self._onload($page);
			}
		});
	},
	// 初始化顶部菜单
	init : function() {
		$top = $("." + _XUI.tag.top);
		// 初始化个人菜单
		$top.find("." + _XUI.tag.topNav + " a:not(." + _XUI.tag.menuBtn + ")").click(function() {
			$("." + _XUI.tag.menuBtn).removeClass("expand");
			if(!$(this).is("[target]")) window.location.href=$(this).attr("href");
		}), $(document).click(function(e) { // 点击其他区域隐藏
            if(e.target != $top[0]){
                $("." + _XUI.tag.menuBtn).removeClass("expand");
            }
        });
		// 初始化顶部菜单按钮
		$top.find("a." + _XUI.tag.menuBtn).click(function() {
			$(this).toggleClass("expand");
		});
		// 初始化滑动
		$list = $top.find("." + _XUI.tag.topList);
		$list
			.wrapInner('<div class="swiper-container" id="xui_top_menu"></div>')
			.prepend('<div class="swiper-button prev"><b></b></div>')
			.append('<div class="swiper-button next"><b></b></div>') 
			.find("ul").addClass("swiper-wrapper")
			.find("li").addClass("swiper-slide");
			var swiper = new Swiper('#xui_top_menu', {
			slidesPerView: 'auto',
//			onSlideChangeEnd: function(swiper){ }
	    });
		$list.find(".swiper-button.prev").click(function() {
			swiper.swipePrev();
		});
		$list.find(".swiper-button.next").click(function() {
			swiper.swipeNext();
		});
		// 加载第一个链接
		var $link = $list.find("a").first();
		$link.parent().addClass("active");
		_PageMenu.load({
			url : $link.attr("href")
		});
	},
	getPage : function(key) {
		return $("." + _Page.type.menu + '[data-key="' + key + '"]');
	},
	_onload : function($page) {
		// 初始化菜单
		$page.find(">ul>li>ul").each(function(i) {
			$(this).attr("data-height", $(this).height());
			var $link = $(this).siblings("a");
			$link.addClass("has-child");
			if(i == 0) $link.addClass("active");
			else $(this).height(0);
		});
		// 一级菜单点击
		$page.find('>ul>li>a:not([target])').click(function() {
			$(this).toggleClass("active");
			var $ul = $(this).siblings("ul");
			var height = $(this).hasClass("active") ? $ul.attr("data-height") : 0;
			$ul.stop().animate({
				"height" : height + "px"
			}, "fast");
		});
		// 二级菜单点击
		$page.find('>ul>li>ul>li>a:not([target="_blank"])').click(function() {
			$page.find('>ul>li>ul>li>a.active').removeClass("active");
			$(this).toggleClass("active");
		});
		// 加载右侧
//		var $link = $page.find('a[target]').eq(0);
//		if($link.length < 1) return ;
//		$link.trigger("click");
	}
};