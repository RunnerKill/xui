/**
 * .ui-page页面类
 */
var _Page = {
	area : {
		// 只存在一个区域
		menu : "menu", 		// 菜单
		inner : "inner", 	// 内嵌页
		// 可能出现多个区域
		main : "main", 		// 主选项卡（暂时保留）
		navtab : "navtab",	// 选项卡页
		dialog : "dialog" 	// 弹出层
	},
	type : {
		menu : "page-menu", 	// menu菜单页
		navtab : "page-navtab",	// navtab选项卡页
		dialog : "page-dialog",	// dialog弹层页
		inner : "page-inner"	// inner内嵌页
	},
	load : function(options) {
		options = $.extend({
			key : null,		// 目标id required
			url : null,		// 页面地址 required
			data : {},		// 请求参数
			ready : function($page, onload) {} // 页面html片段流准备好后回调，$page为准备好的页面流，onload为页面显示后的回调
		}, options);
		var _self = this;
		_Ajax.request({
			url : options.url,
			type : "POST",
			data : options.data,
			dataType : "html",
			callback : function(html) {
				_Ajax.callbackHtml(html, function($page) {
					$page.attr("data-key", options.key)
						.attr("data-url", options.url);
					_self.ready($page); // 执行ready回调
					options.ready($page);
				});
			}
		});
	},
	// 页面流生成时(.ui-page的jQuery对象创建完毕)，注：创建html的都放这里
	ready : function($page) {
		// 创建pagerForm
		this._init_pager_form($page);
	},
	_init_pager_form : function($page) {
		var $pager = $page.find("." + _XUI.tag.pager);
		if($pager.length < 1) return ; // 数据列表
		var $form = $('<form></form>').addClass(_XUI.tag.formPager)
			.attr("action", $page.attr("data-url"))
			.attr("method", "post")
			.append($pager.html());
		$pager.empty();
		$page.append($form);
	},
	// 页面元素创建完毕时，注：绑定事件的都放这里
	onload : function($page) {
		// 初始化分页插件
		_Pager.init($page, function($form) {
			$page.refresh();
		});
		// 初始化排序
		_Order.init($page, function($form) {
			$page.refresh();
		});
		// 初始化动态表格
		_Table.init($page);
		// 绑定选项卡（静态）事件
		this._bind_tabbar($page);
		// 绑定searchForm中的clear按钮事件
		this._bind_form_clear($page);
		// 美化列表数据（排空、编号等）
		this._format_list_data($page);
		// 绑定数据列表全选框事件
		this._bind_all_select($page);
		// 绑定lookup的input框事件
		this._bind_lookup_input($page);
		// 绑定attachment的input框事件
		this._bind_attach_input($page);
		// 固定区域
		$page.find("." + _XUI.tag.content).css({
			"top" : ($page.find("." + _XUI.tag.fixedTop).outerHeight() || 0) + "px",
			"left" : ($page.find("." + _XUI.tag.fixedLeft).outerWidth() || 0) + "px",
			"right" : ($page.find("." + _XUI.tag.fixedRight).outerWidth() || 0) + "px",
			"bottom" : ($page.find("." + _XUI.tag.fixedBottom).outerHeight() || 0) + "px"
		});
		// inner区域
		this._init_inner_area($page);
		// 初始化单/复选框
		$page.find('input.' + _XUI.tag.formCheck).xcheck({
			color : "#ffffff",
			bgcolor : "#60b8d1"
		});
		// 初始化switch
		$page.find('input.' + _XUI.tag.formSwitch).xswitch({
			on : "是",
			off : "否",
			speed : 100
		});
		// 初始化下拉框
		$page.find('select.' + _XUI.tag.formSelect).xselect();
		// 初始化placeholder
		$page.find('input[placeholder], textarea[placeholder]').placeholder({customClass:'ui-placeholder'});
	},
	_init_inner_area : function($page) {
		var $innerMenu = $page.find("." + _XUI.tag.innerMenu);
		if($innerMenu.length < 1) return ;
//		$innerMenu
//			.css("height" , $page.find("." + _XUI.tag.content).height() + "px")
//			.parent().css({"padding" : "0px"});
	},
	_bind_tabbar : function($page) {
		var $tabbar = $page.find("." + _XUI.tag.tabBar + ".static");
		if($tabbar.length < 1) return ;
		var $tabcontent = $page.find("." + _XUI.tag.tabContent);
		$tabcontent.find(">div")
			.not(":eq(" + $tabbar.find("a.active").parent().index() + ")")
			.hide();
		$tabbar.find("a").click(function() {
			$(this).parent().siblings().find(">a.active")
				.removeClass("active");
			$(this).addClass("active");
			var index = $(this).parent().index();
			$tabcontent.find(">div")
				.not(":eq(" + index + ")")
				.hide()
				.end()
				.eq(index)
				.show();
		});
	},
	_bind_form_clear : function($page) {
		var $searcher = $page.find("." + _XUI.tag.formSearch);
		if($searcher.length < 1) return ;
		$searcher.find(".clear").click(function() { // 清空表单
			$(':input', $searcher).each(function() {
				var type = this.type;
				var tag = this.tagName.toLowerCase(); // normalize case
				if (type == 'text' || type == 'password' || tag == 'textarea') {
					this.value = "";
				} else if (type == 'checkbox' || type == 'radio') {
					this.checked = false;
				} else if (tag == 'select') {
					this.selectedIndex = 0;
				}
			});
		});
	},
	_format_list_data : function($page) {
		var $table = $page.find("." + _XUI.tag.dataList);
		if($table.length < 1) return ;
		var curpage = $page.find('input[name="curPage"]').val();
		var pagesize = $page.find('input[name="pageSize"]').val();
		var preindex = (curpage - 1) * pagesize;
		$table.find('td').each(function() {
			if($(this).is(".number")) {
				var index = preindex + $(this).parent().index();
				$(this).html(index);
			} else if($(this).html() == '') {
				$(this).html("-");
			}
		});
	},
	_bind_all_select : function($page) {
		var $select = $page.find('input[type="checkbox"].all-select');
		if($select.length < 1) return ;
		$select.click(function() {
			var $ch_boxs = $page.find('input[type="checkbox"][name="'+$(this).attr("name")+'"]:not(.all-select)');
			if($(this).is(":checked")) {
				$ch_boxs.each(function() { // 全选
					this.checked = true;
				});
			} else {
				$ch_boxs.each(function() { // 反选
					this.checked = false;
				});
			}
		});
	},
	_bind_lookup_input : function($page) {
		var $lookup = $page.find('a[target="' + _Link.target.lookup + '"]');
		if($lookup.length < 1) return ;
		$lookup.each(function() {
			var _self = this;
			var rel = $(this).attr("rel");
			$page.find('[id^="' + rel + '."]')
				.css("cursor", "pointer")
				.attr("readonly", "readonly")
				.attr("placeholder", "点击选择")
				.click(function() {
					$(_self).click();
				});
		});
	},
	_bind_attach_input : function($page) {
		var $attach = $page.find('a[target="' + _Link.target.attachment + '"]');
		if($attach.length < 1) return ;
		$attach.each(function() {
			var _self = this;
			var rel = $(this).attr("rel");
			$page.find('[id^="' + rel + '."]')
			.css("cursor", "pointer")
			.attr("readonly", "readonly")
			.attr("placeholder", "点击上传")
			.click(function() {
				$(_self).click();
			});
		});
	}
};

(function($){
	$.fn.extend({
		// 获取该元素所在的父页面对象
		parentPage : function() {
			return $(this).parent().closest("." + _XUI.tag.page);
		},
		// 重新加载页面
		forward : function(options) {
			if($(this).length < 1 || !$(this).hasClass(_XUI.tag.page)) return false;
			var $page = $(this);
			options = $.extend({
				title : null,		// 页面标题
				url : null,			// 页面地址 required
				data : {}			// 请求参数
			}, options);
			if($page.hasClass(_Page.type.navtab)) {
				_PageNavtab.load($.extend(options, {
					key : $page.attr("data-key")
				}));
			} else if($page.hasClass(_Page.type.dialog)) {
				_PageDialog.load($.extend(options, {
					key : $page.attr("data-key")
				}));
			} else if($page.hasClass(_Page.type.inner)) {
				_PageInner.load($.extend(options, {
					parent : $page.parentPage()
				}));
			}
			return true;
		},
		// 刷新页面
		refresh : function() {
			if($(this).length < 1 || !$(this).hasClass(_XUI.tag.page)) return false;
			var $page = $(this);
			var $formPager = $page.find("." + _XUI.tag.formPager);
			var $formSearch = $page.find('.' + _XUI.tag.formSearch);
			var url = $page.attr("data-url");
			var data = $formSearch.serializeArray().concat($formPager.serializeArray());
			if($page.hasClass(_Page.type.navtab)) {
				_PageNavtab.load({
					key : $page.attr("data-key"),
					url : url,
					data : data
				});
			} else if($page.hasClass(_Page.type.dialog)) {
				_PageDialog.load({
					key : $page.attr("data-key"),
					title : null,
					url : url,
					data : data
				});
			} else if($page.hasClass(_Page.type.inner)) {
				_PageInner.load({
					parent : $page.parentPage(),
					url : url,
					data : data
				});
			}
			return true;
		},
		// 关闭页面
		close : function() {
			if($(this).length < 1 || !$(this).hasClass(_XUI.tag.page)) return false;
			var $page = $(this);
			if($page.hasClass(_Page.type.navtab)) {
				_PageNavtab.close($page.attr("data-key"));
			} else if($page.hasClass(_Page.type.dialog)) {
				_PageDialog.close($page.attr("data-key"));
			}
		}
	});
})(jQuery);