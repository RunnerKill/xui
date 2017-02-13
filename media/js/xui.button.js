
var _Button = {
	// 初始化底部按钮区域
	init : function(page, buttons) {
		var $button = page.find("." + _XUI.tag.button);
		if($button.length > 0 && $button.hasClass(_XUI.tag.fixedBottom) && buttons) { // 添加按钮
			$.each(buttons, function(i, b) {
				$button.append($('<a href="javascript:;" class="' + _XUI.tag.btn + '">' + b.text + '</a>')
						.addClass(b.className)
						.click(b.click));
			});
		}
	}
};
	
