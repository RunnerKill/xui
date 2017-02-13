作者：Xiaojie.Xu

v1.0.0 - 2015/10/4（非完整，补写）
    1. 首次搭建前端ui框架
    2. 增加异步服务交互
    3. 引入Layer、My97等开源插件
    4. 新增xselect、xswitch等自定义插件

v2.1.0 - 2016/3/28
	1. 增加navtab选项卡管理模式，左右移动 + 下拉
	2. 修复顶部菜单在IE8下的兼容性问题
	3. 增加框架对象的常用方法API，如“加载/刷新/跳转”选项卡页/弹出层等，详情请查阅xui.api.js
	4. 修改了3个方法名:
	   XUI.open()改为Dialog.open()
	   XUI.openPage()改为Dialog.openOuter()
	   XUI.bringBack()改为Dialog.bringBack()
	现有jsp中用到的地方已改
	5. 优化了选项卡forward模式，当需要跳转的选项卡不存在（被关闭）时，会重新打开一个

v2.1.1 - 2016/4/1
	1. 增加欢迎页，默认自动显示，不能关闭（可跳转）

v2.1.2 - 2016/4/8
	1. 解决批量bringBack不起作用的bug
	2. 解决高版本chrome(web-kit内核)浏览器outerHtml属性会自动提前编译的bug
	3. 新增treetable插件的ajax异步示例

v2.1.3 - 2016/4/13
	1. 修复“全选”框会影响其它页面的bug
	2. 增加表格数据美化处理（包括空字段代替符、自动生成序号等）
	3. 修复detail页面长段落不换行的bug
	4. 修复选项卡导航栏滑动错位的bug
	5. 优化分页区域，下拉选择每页最大数后，默认跳至第一页

v2.1.4 - 2016/4/19
	1. 修复“模态”弹出层背景z轴覆盖错位的bug
	2. 新增（选项卡/弹出层）外链页面链接
	3. 增加文件表单的回调处理方法及示例模块
	
v2.1.5 - 2016/5/4
	1. 修复radio在多个选项卡(navtab)中会相互影响的bug
	2. 修复select在多个选项卡(navtab)中同时存在时，前面无法展开的bug
	3. 增加文件带回示例，优化callbackFile方法，可处理Json对象或Json格式字符串
	4. 增加脚本回调方法callbackScript，可执行服务器端返回的Js脚本
	5. 增加列表页class="comment"的提示区域样式
	
v2.1.6 - 2016/5/11
	1. 增加callbackFile的遮罩层提示，防止表单重复提交
	2. 修复个人菜单按钮点击会打开浏览器新页面的bug
	3. 增加target="iframe"类型链接，默认在navtab中打开iframe页面
	4. 修复callbackJson方法只返回close动作时报错的bug
	
v2.1.7 - 2016/5/20
    1. 新增xmobile插件（微信浏览器预览），并供调用方法XUI.mobile(options)，具体参数请查阅xui.api.js
    2. 优化“查找带回”功能，当带回值时，触发该表单元素的onchange事件
    3. 优化表单callback*系列方法，仅当该form标签拥有class="validate"时才进行验证
    
v2.1.8 - 2016/5/23
    1. 修复closeAndRefreshDialog的回调请求导致父弹出层标题重置的问题
    2. 增加Js原生Date类扩展方法format()，接收唯一参数pattern，格式为标准时间正则表达式
    3. 优化swfile插件，新增加data-type属性，对“文件组”指定文件类型
    4. 修复右上角“个人中心”菜单展开/收缩不正确的bug
    
v2.1.9 - 2016/6/23
    1. 修复所有自定义插件中默认参数会在调用后改变的bug(jQuery.extend函数)
    2. 新增UEditor(百度)编辑器，详情参考示例模块相关页面
    
v2.1.10 - 2016/7/4
    1. 移除Dialog弹层“查找带回”时找不到对应带回目标时的错误提示（即可带回多个参数，但不一定都有用）
    2. 优化UEditor编辑器使用方法，并额外增加7个集成在XUI上的工具按钮（符号、表情等）
    3. 解决IE8下表单验证插件jquery.validate.js无法拦截onsubmit事件的bug
    4. 解决表单美化工具xcheck、xselect、xswitch等对于表单reset事件的响应
    5. 解决了框架内插件对于IE8等低版本浏览器兼容的问题，如文本框/域提示工具placeholder、表单验证工具jquery.validate等
    
v2.1.11 - 2016/7/19
    1. 修复“全选”(<input type="checkbox" class="all-select" name="..." />)按钮无效的bug
    2. 修复UEditor不响应表单reset事件的bug
    2. 增加顶部“个人菜单”的“点击其它地方隐藏”的功能，并增加三级菜单样式class="child-menu"
    
v2.1.12 - 2016/7/29
    1. 修复“内嵌”页面出现双纵向滚动条的bug
    2. 修复“弹出”页面底部页码出现换行、显示不完整的bug
    3. 修复xswitch插件对其所在表单的reset事件不响应的bug