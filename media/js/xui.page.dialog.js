
var _PageDialog = {
	load : function(options) {
		options = $.extend({
			key : "default", 	// 页面key required
			title : '新弹出层',	// 弹出层标题
			url : null,			// 页面地址 required
			data : {},			// 请求参数
			maxmin : true,		// 是否显示最大/小化按钮
			model : true,		// 是否为模态
			width : 830,		// 初始化宽
			height : 560,		// 初始化高
			callback : null		// 用户回调
		}, options);
		var _self = this;
		_Page.load({
			key : options.key,
			url : options.url,
			data : options.data,
			ready : function($page) {
				$page.addClass(_Page.type.dialog);
				var $target = _self.getPage(options.key);
				if($target.length < 1) { // 新弹出层
					_Layer.open($.extend(options, {
						content : $page.outerHtml(),
						success : function(layero, index) {
							$page = _self.getPage(options.key); // 弹出层仅copy了html，需要重新获取page对象
							$page.attr("data-layindex", index);
							_self._onload($page);
						}
					}));
				} else { // 老弹出层
					var index = $target.attr("data-layindex");
					_Layer.setTitle(options.title, index); // 改标题
					$target.replaceWith($page); // 改内容
					$page.attr("data-layindex", index);
					_self._onload($page);
				}
			}
		});
	},
	getPage : function(key) {
		return $('.' + _Page.type.dialog + '[data-key="' + key + '"]');
	},
	close : function(key) {
		var index = this.getPage(key).attr("data-layindex");
		_Layer.close(index);
	},
	closeCurrent : function() {
		_Layer.closeCurrent();
	},
	bringBack : function(group, params) {
    	function setValue(params) {
    		$.each(params, function(key, value) {
    			var input = document.getElementById(group + "." + key);
				if(input) {
					input.value = value;
					$(input).trigger("change");
				}
    		});
    	}
    	if(params instanceof Array) { // 多条数据
    		var result = {};
    		$.each(params, function(index, obj) {	// 遍历数组
    			for(var key in obj) { 				// 遍历对象
    				if(typeof(result[key]) == "undefined") { // 结果集中无此key，则赋值
    					result[key] = obj[key];
    				} else { // 结果集中存在此key，则添加
    					result[key] += ","+obj[key];
    				}
    			}
    		});
    		setValue(result);
    	} else if(params instanceof Object) { // 单条数据
    		setValue(params);
    	}
    	this.closeCurrent(); // 关闭弹出层
    },
	_onload : function($page) {
		// 初始化按钮区域
		_Button.init($page, [{
			text : '关闭',
			className : 'close',
			click : function(e) {
				_Layer.close($page.attr("data-layindex"));
			}
		}]);
		_Page.onload($page);
	}
};