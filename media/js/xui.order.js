/**
 * 排序
 * 只能在页面load完后初始化
 * @author Xiaojie.Xu
 * @date 2016/1/29
 */
var _Order = {
	init : function($page, callback) {
		var _self = this;
		var $table = $page.find("." + _XUI.tag.dataList);
		var $form = $page.find("." + _XUI.tag.formPager);
		if($table.length < 1 || $form.length < 1) return false;
		var order_array = _self.getOrderBy($form).split(",");
		for(var i=0; i<order_array.length; i++) {
			var ors = order_array[i].split(".");
			$table.find('th.order').eq(ors[0])
			.removeClass("asc").removeClass("desc").addClass(ors[1]);
		}
		$table.find('th.order').click(function() {
			var dir = "desc";
			if($(this).hasClass("desc")) {
				dir = "asc";
			} else if($(this).hasClass("asc")) {
				dir = "desc";
			}
			var index = $(this).parent().find("th.order").index($(this));
			_self.setOrderBy($form, index + "." + dir);
			callback($form);
		});
	},
	getOrderBy : function($form) {
		return $form.find('[name="orderBy"]').val();
	},
	setOrderBy : function($form, orderBy) {
		return $form.find('[name="orderBy"]').val(orderBy);
	}
};