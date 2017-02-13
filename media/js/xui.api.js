/**
 * XUI API Public Methods
 * @author Xiaojie.Xu
 */

/**
 * 框架类方法
 */
var XUI = {
    /**
     * 初始化
     * @param options 参数
     */
    init : function(options) {
        // 表单
        _Form.init();
        // 链接
        _Link.init();
        // 选项卡
        _PageNavtab.init();
        // 顶部菜单
        _PageMenu.init();
        // 欢迎页
        _PageNavtab.load({
            key : "main",
            title : "主页",
            url : "welcome.html"
        });
    },
    /**
     * 显示遮罩层
     * @param msg 加载文字
     * @param time 关闭时间，默认不自动关闭
     */
    load : function(msg, time) {
        return _Layer.load(msg, time);
    },

    /**
     * 关闭layer弹出层
     * @param index 弹出层索引
     */
    close : function(index) {
        _Layer.close(index);
    },

    /**
     * 信息提示框
     * @param msg 提示文字
     */
    alert : function(msg) {
        _Layer.msg(_XUI.code.message, msg);
    },

    /**
     * 成功提示框
     * @param msg 提示文字
     */
    succeed : function(msg) {
        _Layer.msg(_XUI.code.success, msg);
    },

    /**
     * 错误提示框
     * @param msg 提示文字
     */
    fail : function(msg) {
        _Layer.msg(_XUI.code.failed, msg);
    },

    /**
     * 警告提示框
     * @param msg 提示文字
     */
    warn : function(msg) {
        _Layer.msg(_XUI.code.error, msg);
    },

    /**
     * 确认框
     * @param msg 提示文字
     * @param cb 确认后回调函数
     */
    confirm : function(msg, cb) {
        _Layer.confirm(msg, cb);
    },

    /**
     * 右下角通知框
     * @param title 标题
     * @param content 内容html
     * @param time 自动关闭时间
     */
    notic : function(title, content, time) {
        _Layer.notic(title, content, time);
    },
    
    /**
     * 打开手机预览层
     * @param options 参数 = {
     *      model : true,       // 是否开启遮罩层
     *      bg : ["#000", 0.3], // 遮罩层样式
     *      title : "未知标题",	// 标题
     *      url : null,         // iframe的url地址
     *      content : null      // html内容字符串
     *  }
     * @return xmobile对象，具体方法请查阅xmobile插件API
     */
    mobile : function(options) {
        return new xmobile(options);
    }
    
};

/**
 * 弹出层类方法
 */
var Dialog = {
    /**
     * 打开
     * @param options 参数 = {
     *      key : "default",     // 页面key required
     *      title : null,        // 弹出层标题
     *      url : null,            // 页面地址 required
     *      data : {},            // 请求参数
     *      maxmin : true,        // 是否显示最大/小化按钮
     *      model : true,        // 是否为模态
     *      width : 830,        // 初始化宽
     *      height : 560,        // 初始化高
     *      callback : null        // 用户回调
     * }
     */
    open : function(options) {
        _PageDialog.load(options);
    },

    /**
     * 打开外链弹出层
     * @param options 弹出层参数
     * @returns 弹出层索引
     */
    openOuter : function(options) {
        return _Layer.openPage(options);
    },

    /**
     * 查找带回
     * @param group 组别
     * @param params 参数，可为对象或对象数组
     */
    bringBack : function(group, params) {
        _PageDialog.bringBack(group, params);
    },

    /**
     * 关闭
     * @param rel 页面标识
     */
    close : function(rel) {
        _PageDialog.getPage(rel).close();
    },

    /**
     * 刷新
     * @param rel 页面标识
     */
    refresh : function(rel) {
        _PageDialog.getPage(rel).refresh();
    },

    /**
     * 跳转
     * @param rel 页面标识
     * @param url 跳转地址
     */
    forward : function(rel, url) {
        _PageDialog.getPage(rel).forward({url : url});
    }
};

/**
 * 选项卡类方法
 */
var Navtab = {
    /**
     * 打开
     * @param options 参数 = {
     *    key : "main",        // 页面key required
     *    title : null,        // 页面标题，用于选项卡显示
     *    url : null,        // 页面地址 required
     *    data : {},        // 请求参数
     *    callback : null,    // 用户回调
     * }
     */
    open : function(options) {
        _PageNavtab.load(options);
    },

    /**
     * 关闭
     * @param rel 页面标识
     */
    close : function(rel) {
        _PageNavtab.getPage(rel).close();
    },

    /**
     * 刷新
     * @param rel 页面标识
     */
    refresh : function(rel) {
        _PageNavtab.getPage(rel).refresh();
    },

    /**
     * 跳转
     * @param rel 页面标识
     * @param url 跳转地址
     */
    forward : function(rel, url) {
        _PageNavtab.getPage(rel).forward({url : url});
    }
};

