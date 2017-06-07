$(function() {
	$.ajax({
		url: "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
		dataType: "script",
		type: "get",
		success: function() {
			var city = remote_ip_info.city;
			getWeather(city);
		}
	});


	function getWeather(city) {
		$.ajax({
			url: "http://wthrcdn.etouch.cn/weather_mini?city=" + city,
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
				if (data.status == 1000) {
					$(".tips").html(data.data.ganmao);

					$("#w-city").html(data.data.city);
					$(".wendu").html(data.data.wendu);
					$("#type").html(data.data.forecast[0].type);
					$("#day").html(data.data.forecast[0].date);

					$("#fengxiang").html(data.data.forecast[0].fengxiang);
					$("#fengli").html(data.data.forecast[0].fengli);
					$("#high").html(data.data.forecast[0].high.substring(3));
					$("#low").html(data.data.forecast[0].low.substring(3));
					$(".three-day").empty();
					for (var i = 1; i < 5; i++) {
						var div = $('<div class="w-row"><div class="w-col">' + data.data.forecast[i].date + '</div><div class="w-col">' + data.data.forecast[i].type + '</div><div class="w-col">' + data.data.forecast[i].low.substring(3) + '/' + data.data.forecast[i].high.substring(3) + '</div></div>');
						$(".three-day").append(div);

					}
					$("input").attr("placeholder", "当前城市是[" + data.data.city + "]");

				} else {
					$("#city").html("找不到城市");
				}

			}
		});

	}

	$(".w-foot a").click(function() {
		var box = $("<div class='shade'></div>");
		$("body").append(box);
		$(".shade").on("touchstart", function() {
			$(".w-meun").animate({
				bottom: -300 + "px"
			});
			$(".shade").remove();
			$("body").css({
				overflow: "auto"
			});
		});
		$(".shade").click(function() {
			$(".w-meun").animate({
				bottom: -300 + "px"
			});
			$(".shade").remove();
			$("body").css({
				overflow: "auto"
			});
		});
		
		$(".w-meun").animate({
			bottom: 0
		});
		$("body").css({
			overflow: "hidden"
		}); //禁止body在菜单出现还可以滑动
	});

	$(".w-input input").on("input", function() {
		var city = $(".w-input input").val();
		if (city.length == 0) {
			$(".w-btn button").html("取消");
		} else {
			$(".w-btn button").html("搜索");
		}
	})
	$(".w-btn").click(function() {
		var city = $(".w-input input").val();
		if (city.length == 0) {
			$(".w-meun").animate({
				bottom: -300 + "px"
			});
			$("body").css({
				overflow: "auto"
			});
			$(".shade").remove();
		} else {
			getWeather(city);
			$(".w-btn").html("取消");
			$(".w-meun").animate({
				bottom: -300 + "px"
			});
			$("body").css({
				overflow: "auto"
			});
			$(".shade").remove();
			$(".w-input input").val('');
		}
	});


	var hotCity = ['北京', '上海', '广州', '深圳', '东莞', '长沙', '武汉', '天津', '南京', '珠海', '香港', '台北', '澳门', '南宁', '海口', '沈阳', '南昌', '济南', '成都', '合肥', '重庆', '太原', '西安', '福州', '贵阳', '长春', '郑州'];
	$(hotCity).each(function(index) {
		$(".ul").append("<li><a href='JavaScript:;'>" + hotCity[index] + "</a></li>");
		$(".ul a").eq(index).click(function() {
			getWeather(hotCity[index]);
			$(".w-meun").animate({
				bottom: -300 + "px"
			});
			$("body").css({
				overflow: "auto"
			});
			$(".shade").remove();
		});
	});
});