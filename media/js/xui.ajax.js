
var _Ajax = {
	cbType : {
		close : "close",
		forward : "forward",
		refresh : "refresh"
	},
	request : function(options) {
		var _self = this;
		var index = _Layer.load('加载中...');
		$.ajax({
			url : options.url,
			type : options.type || 'POST',
			data : options.data || {},
			dataType : options.dataType || "text",
			cache: false,
			success: function(data) {
				_Layer.close(index);
				if(options.callback && $.isFunction(options.callback)) {
					options.callback(data);
				} else {
					_self.success(data);
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				_Layer.close(index);
				_self.error(xhr, ajaxOptions, thrownError);
			}
		});
	},
	success : function(data) {
console.log(data);
	},
	error : function(xhr, ajaxOptions, thrownError) {
		_Layer.msg(_XUI.code.failed, "服务器出错");
console.error("Http status: " + xhr.status + " " + xhr.statusText + "\n" +
		"server response : " + xhr.responseText);
	},
	// 解析json字符串
	callbackJson : function($source, obj) {
		try {
			var $page = $source.parentPage();
			if(obj.code) { // 提示框
				_Layer.msg(obj.code, obj.message);
			}
			if(obj.type == this.cbType.refresh) { // 刷新当前
				$page.refresh();
			} else if(obj.type == this.cbType.forward) { // 跳转当前
				$page.forward({url : obj.url});
			} else if(obj.type == this.cbType.close) { // 关闭当前
				$page.close();
				// 关闭后的动作
				var $nextPage = null;
				if(obj.pageType == "navtab") {
					$nextPage = _PageNavtab.getPage(obj.pageKey);
				} else if(obj.pageType == "dialog") {
					$nextPage = _PageDialog.getPage(obj.pageKey);
				} else if(obj.pageType == "navtab_inner") {
					$nextPage = _PageInner.getPage(_PageNavtab.getPage(obj.pageKey));
				} else if(obj.pageType == "dialog_inner") {
					$nextPage = _PageInner.getPage(_PageDialog.getPage(obj.pageKey));
				}
				if(obj.url) { // 需要继续跳转
					if($nextPage.length < 1 && obj.pageType == "navtab") {
						_PageNavtab.load({
							key : obj.pageKey,
							url : obj.url
						});
					} else {
						$nextPage.forward({url : obj.url});
					}
				} else if($nextPage != null) { // 无url则刷新当前
					$nextPage.refresh();
				}
			}
			
		} catch(error) {
			_Layer.msg(_XUI.code.failed, "服务器出错");
console.error("server response : " + obj);
		}
	},
	// 加载html片段
	callbackHtml : function(html, callback) {
		var $page = _Util.createObj(html, ">." + _XUI.tag.page); // 初始化主page
		if($page.length < 1) { // 解析html失败
			_Layer.msg(_XUI.code.failed, "服务器出错");
console.error("server response : " + html);
			return false;
		}
		if($.isFunction(callback)) {
			callback($page);
		}
	}
};