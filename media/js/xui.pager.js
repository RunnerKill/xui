/**
 * 分页
 * 只能在页面load完后初始化
 * @author Xiaojie.Xu
 * @date 2016/1/5
 */
var _Pager = {
	init : function($page, callback) {
		var _self = this;
		var $form = $page.find('.' + _XUI.tag.formPager);
		var $pager = $page.find('.' + _XUI.tag.pager);
		var pageSize = this.getPageSize($form);
		var totalCount = this.getTotalCount($form);
		var curPage = this.getCurPage($form);
		if($form.length < 1 || $pager.length < 1 || totalCount < 1) return false;
		var max = 9;
		if($page.hasClass(_Page.type.dialog)) max = 5;
		if($page.hasClass(_Page.type.inner)) max = 7;
		xpager({
			container : $pager,
			max : max,
			showText : false,
			curr : curPage,
			sizeArray : $pager.attr("data-page").split(",") || [],
			size : pageSize,
			count : totalCount,
			onJump : function(curr) {
	        	_self.setCurPage($form, curr);
	        	callback($form);
			},
			onSelect : function(size) {
				_self.setPageSize($form, size);
				_self.setCurPage($form, 1);
		    	callback($form);
			}
		});
	},
	getCurPage : function($form) {
		return parseInt($form.find('[name="curPage"]').val());
	},
	setCurPage : function($form, curPage) {
		return $form.find('[name="curPage"]').val(curPage);
	},
	getPageSize : function($form) {
		return parseInt($form.find('[name="pageSize"]').val());
	},
	setPageSize : function($form, pageSize) {
		return $form.find('[name="pageSize"]').val(pageSize);
	},
	getTotalCount : function($form) {
		return parseInt($form.find('[name="totalCount"]').val());
	}
};