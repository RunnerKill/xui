/**
 * 动态表格
 */
var _Table = {
	init : function($page) {
		var $table = $page.find("." + _XUI.tag.dynamicTable);
		if($table.length < 1) return false;
		$table.each(function() {
			var max_row = parseInt($(this).attr("max-row")) || 100 ;
			var min_row = parseInt($(this).attr("min-row")) || 0;
			var _self = this;
			$('<a href="javascript:;">' + ($table.attr("data-button") || '添加') + '</a>').css({
				"float" : "right"
			}).insertBefore($(_self));
			if($(_self).find("tr").length >= max_row + 1) $(_self).prev("a").css("visibility", "hidden");
			if($(_self).find("tr").length <= min_row + 1) $(_self).find("a.del").css("visibility", "hidden");
			$(_self).prev("a").click(function() { // 添加
				var createTD = function($th, index) {
					var $td = $('<td></td>');
					switch($th.attr("type")) {
					case "num":
						$td.html(index + 1);
						break;
					case "del":
						$('<a href="javascript:;" class="del">删除</a>').appendTo($td);
						break;
					case "text":
						$('<input type="text" />').attr($.extend({
							"name" : $th.attr("name").replace("#index#", index),
							"style" : $th.attr("fieldStyle"),
							"class" : $th.attr("fieldClass")
						}, eval('(' + $th.attr("fieldAttr") + ')'))).appendTo($td);
						break;
					case "attach":
						$('<input type="hidden" />').attr({
							"id" : $th.attr("lookupGroup").replace("#index#", index) + ".path",
							"name" : $th.attr("name").replace("#index#", index) + ".path"
						}).appendTo($td);
						$('<input type="text" />').attr($.extend({
							"id" : $th.attr("lookupGroup").replace("#index#", index) + ".name",
							"name" : $th.attr("name").replace("#index#", index) + ".name",
							"style" : $th.attr("fieldStyle") + "cursor:pointer;",
							"class" : $th.attr("fieldClass"),
							"readonly" : "readonly",
							"placeholder" : "点击上传"
						}, eval('(' + $th.attr("fieldAttr") + ')'))).click(function() {
							$(this).next('a[rel="' + $th.attr("lookupGroup").replace("#index#", index) + '"]').click();
						}).appendTo($td);
						$('<a href="javascript:;"></a>').attr({
							"target" : "attachment",
							"href" : $th.attr("lookupUrl").replace("#index#", index),
							"rel" : $th.attr("lookupGroup").replace("#index#", index),
							"title" : "本地上传",
							"style" : "margin-left:4px;" // 解决inline-block间隔4px
						}).appendTo($td);
						break;
					case "url":
						$('<input type="hidden" />').attr({
							"id" : $th.attr("lookupGroup").replace("#index#", index) + ".value",
							"name" : $th.attr("name").replace("#index#", index) + ".value"
						}).appendTo($td);
						$('<input type="text" />').attr($.extend({
							"id" : $th.attr("lookupGroup").replace("#index#", index) + ".name",
							"name" : $th.attr("name").replace("#index#", index) + ".name",
							"style" : $th.attr("fieldStyle"),
							"class" : $th.attr("fieldClass"),
							"readonly" : "readonly"
						}, eval('(' + $th.attr("fieldAttr") + ')'))).click(function() {
							$(this).next('a[rel="' + $th.attr("lookupGroup").replace("#index#", index) + '"]').click();
						}).appendTo($td);
						$('<a class="itemplate-icon icon-search" href="javascript:;"></a>').attr({
							"target" : "dialog",
							"href" : $th.attr("lookupUrl").replace("#index#", index) + "&flag=0",
							"rel" : $th.attr("lookupGroup").replace("#index#", index) + "_info",
							"title" : "菜单资源选择",
							"style" : "margin-left:4px;", // 解决inline-block间隔4px
							"width":"600",
							"height":"400"
						}).appendTo($td);
						$('<a class="itemplate-icon icon-pencil" href="javascript:;"></a>').attr({
							"target" : "dialog",
							"href" : $th.attr("lookupUrl").replace("#index#", index) + "&flag=1",
							"rel" : $th.attr("lookupGroup").replace("#index#", index) + "_enter",
							"title" : "自定义地址",
							"style" : "margin-left:4px;",// 解决inline-block间隔4px
							"width":"630",
							"height":"230"
						}).appendTo($td);
						break;
					};
					return $td;
				};
				var $tr = $('<tr></tr>');
				$(_self).find("th").each(function() {
					$tr.append(createTD($(this), $(_self).find("tr").length - 1));
				});
				$(_self).append($tr);
				if($(_self).find("tr").length >= max_row + 1) $(_self).prev("a").css("visibility", "hidden");
				if($(_self).find("tr").length > min_row + 1) $(_self).find("a.del").css("visibility", "visible");
			}).end()
			.on("click", "a.del", function() { // 移动数据，删除最后一行
				var index = $(this).closest("tr").index();
				var $trs = $(_self).find("tr");
				for(var i = index; i < $trs.length - 1; i ++) {
					var $prev = $trs.eq(i);
					var $next = $trs.eq(i + 1);
					$next.find("input").each(function(j) {
						$prev.find("input").eq(j).val($(this).val());
					});
				}
				$trs.last().remove();
				if($(_self).find("tr").length < max_row + 1) $(_self).prev("a").css("visibility", "visible");
				if($(_self).find("tr").length <= min_row + 1) $(_self).find("a.del").css("visibility", "hidden");
			});
		});
	}
};
	
