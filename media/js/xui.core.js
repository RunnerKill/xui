
var _XUI = {
	tag : {
		// 定位类
		top : "ui-top",			// 顶部
		left : "ui-left",		// 左侧
		nav : "ui-nav",			// 导航
		right : "ui-right",		// 右侧
		inner : "ui-inner",		// 内部
		innerMenu : "ui-inner-menu",		// 内部菜单
		// 标记类
		navTitle : "ui-nav-title",	// 导航选项卡头
		menuBtn : "ui-menu-btn",	// 顶部隐藏菜单按钮
		topList : "ui-top-list",	// 顶部主菜单
		topNav : "ui-top-nav",		// 顶部隐藏菜单
		page : "ui-page",			// 页面类
		notic : "ui-notic",			// 右下角通知框
		tabBar : "ui-tab-bar",		// 选项卡按钮
		tabContent : "ui-tab-content",	// 选项卡内容
		content : "ui-content",		// 页面可滚动区域
		button : "ui-button",		// 按钮区域
		btn : "ui-btn",				// 链接按钮
		dataList : "ui-data-list",	// 数据列表
		dynamicTable : "ui-dynamic-table",	// 动态表格
		pager : "ui-pager",			// 分页信息
		swfile : "ui-swfile",		// swfile区域块
		// 表单类
		formPager : "ui-form-pager",	// 列表分页信息表单
		formSearch : "ui-form-search",	// 列表页查询信息表单
		formAdd : "ui-form",			// 普通页表单
		formCheck : "ui-check",			// 单/复选框
		formSwitch : "ui-switch",		// switch开关
		formSelect : "ui-select",		// 下拉框
		// 固定类
		fixedTop : "fixed-top",			// 顶部固定
		fixedLeft : "fixed-left",		// 左侧固定
		fixedRight : "fixed-right",		// 右侧固定
		fixedBottom : "fixed-bottom"	// 底部固定
	},
	code : {
		message : 100,
		success : 200,
		failed : 300,
		error : 500
	}
};
// 动态引入css/js
$("script").last().each(function() {
	var jsfiles = document.scripts,
        jsPath = jsfiles[jsfiles.length - 1].src,
        dir = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	var _CSS_FILES = [
	    "xui.grid.css",
	    "xui.grid.top.css",
	    "xui.page.css",
	    "xui.page.menu.css",
	    "xui.page.navtab.css",
	    "xui.page.dialog.css",
	    "xui.page.inner.css"
	], _JS_FILES = [
	];
	var _self = this;
	$.each(_JS_FILES, function(i, file) {
		$("<script>").attr({
			type : "text/javascript",
			src : dir + file
		}).insertAfter($(_self));
	});
	$.each(_CSS_FILES, function(i, file) {
		$("<link>").attr({
			rel : "stylesheet",
			type : "text/css",
			href : dir + "../css/" + file
		}).insertAfter($(_self));
	});
});