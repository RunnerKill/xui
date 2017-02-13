
var _Layer = {
	params : {
		shade: [0.3, '#000000']
	},
	load : function(text, time) {
		var index = layer.load(2, {
				shade : this.params.shade,
				time : time || 0,
				content : text ? '<span>' + text + '</span>' : ''
			});
		return index;
	},
	msg : function(code, text) {
		var icon, msg, shade;
		switch(code) {
			case _XUI.code.success :
				icon = 1; msg = '操作成功'; break;
			case _XUI.code.failed :
				icon = 2; msg = '操作失败'; break;
			case _XUI.code.message :
				icon = 0; msg = '提示信息'; shade = [0.3, '#000000']; break;
			case _XUI.code.error :
				icon = 4; msg = '系统错误'; shade = [0.3, '#000000']; break;
		}
		layer.msg(text || msg, {
			icon : icon,
			time : 2000,
			shade: shade,
			shadeClose : true
		}); 
	},
	confirm : function(text, callback) {
		layer.confirm(text, {
			icon : 3,
			title : '提示',
			shade : this.params.shade
		}, function(index){
		    layer.close(index);
		    callback();
		});
	},
	notic : function(title, content, time) {
		layer.open({
			type : 1,
			title : title || '通知',
			shade : 0,
			time : time || 0,
			area : [ '340px', '230px' ],
			offset : 'rb', // 右下角弹出
			shift : 2,
			move : false,
			content : content ? '<div class="' + _XUI.tag.notic + '">' + content
					+ '</div>' : ''
		});
	},
	open : function(options) {
		options = $.extend({
			title : "新弹出层",
			maxmin : true,
			model : true,
			width : 830,
			height : 560,
			// other params
			content : '',
			success : function(layero, i) {},
			end : function() {}
		}, options);
		var _self = this;
		layer.open({
		    type : 1,
//		    closeBtn : 1,
			title : options.title,
			maxmin : options.maxmin,
			shade : options.model ? this.params.shade : 0,
		    area : [options.width + 'px', options.height + 'px'],
		    content : options.content,
		    zIndex : 1000,
		    success : function(layero, i) {
		    	if(!options.model) { // 对“非模态”对话框增加“置顶”功能
		    		_self.setTop(i);
		    		layero.mousedown(function() {
		    			_self.setTop(i);
		    		});
		    	}
		    	options.success(layero, i); // 回调
		    },
		    end : options.end,
		    // 临时解决按钮区域错位的bug：95为title部分高43，加按钮区域高52，当然也可以动态计算。如：layero.find(".layui-layer-title").outerHeight() + layero.find(".layui-layer-btn").outerHeight()，注意是outerHeight，包括了border宽度
		    full : function(layero) {
		    	layero.find(".layui-layer-content").height($(document).height() - layero.find(".layui-layer-title").outerHeight());
		    },
		    restore :  function(layero) {
		    	layero.find(".layui-layer-content").height(layero.height() - layero.find(".layui-layer-title").outerHeight());
		    }
		});
	},
	get : function(index) {
		return $(".layui-layer#layui-layer" + index);
	},
	// 获取最顶上（z-index值最大）的layer层
	getTop : function() {
		var max_zindex = 0;
		var layer = null;
		$(".layui-layer").each(function() {
			var zindex = parseInt($(this).css("z-index"));
			if(zindex > max_zindex) {
				max_zindex = zindex;
				layer = $(this);
			}
		});
		return layer;
	},
	// 置顶
	setTop : function(index) {
		var top_layer = this.getTop();
		if(top_layer) {
			this.get(index).css("z-index", parseInt(top_layer.css("z-index")) + 1);
		}
	},
	// 设置标题
	setTitle : function(title, index) {
		if(title) layer.title(title, index);
	},
	// 打开外部页面(iframe层)
	openPage : function(options) {
		options = $.extend({
			title : 'New Dialog',
			maxmin : true,
			model : true,
			width : 830,
			height : 560,
			// buttons
			buttons : [], // {text : '', click : function() {}}
			// other params
			url : "http://layer.layui.com/",
			callback : function(layero, i) {}
		}, options);
		var btnTexts = []; // 附加按钮
		var btnFuncs = {}; // 附加按钮事件
		$.each(options.buttons, function(i, btn) {
			btnTexts.push(btn.text);
			btnFuncs["btn" + (i + 3)] = btn.click; // + 3 是为了屏蔽前两个按钮
		});
		return layer.open($.extend({
			type : 2,
			title : options.title,
			maxmin : options.maxmin,
			shade : options.model ? this.params.shade : 0,
			area : [options.width + 'px', options.height + 'px'],
			content : options.url, // iframe的url
			success : function(layero, i) {
		    	// 回调
		    	options.callback(layero, i);
		    	layero.find(".layui-layer-btn>a").addClass("ui-btn")
		    	.filter(":lt(2)").hide();
		    },
		    end : options.end,
		    btn: btnTexts.length > 0 ? ['', ''].concat(btnTexts) : null
		}, btnFuncs));
	},
	layer : function(options) {
		layer.open(options);
	},
	close : function(index) {
		layer.close(index);
	},
	closeCurrent : function() {
		var top_layer = this.getTop();
		if(top_layer) layer.close(top_layer.attr("times"));
	}
};
