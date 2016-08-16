define(function(require) {
    var mathUtil = require("../src/mathUtil");
    var svgUtil = require("../src/svgUtil");

    var ctx1 = $("#canvas")[0].getContext("2d");

    var draw = function(pointList) {
        ctx1.strokeStyle = "red";
        ctx1.setLineDash([3,3]);
        ctx1.beginPath();
        pointList.forEach(function(p) {
            ctx1.lineTo(p.x, p.y);
        });
        ctx1.stroke();
    };

    var svgStr = null;

    $("#svg-file").on("change", function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (function() {
            svgStr = reader.result;
            doTest();
        });
        reader.readAsText(file);
    });

    var splitSize = 1;
    $("#split-size").on("change", function() {
        doTest();
    });

    var req = new XMLHttpRequest();
    req.open("get", "./test.svg", true);
    req.onload = function() {
        svgStr = req.responseText;
        doTest();
    };
    req.send(null);

    var doTest = function() {
        ctx1.clearRect(0, 0, 500, 500);
        splitSize = parseInt($("#split-size").val(), 10);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        svgUtil.ELLIPSE_SPLIT_COUNT = splitSize;

		// パース
		var svgInfoList = svgUtil.loadSvgGraphicsPath(svgStr);

		for (var i = 0; i < svgInfoList.length; i++) {
			var info = svgInfoList[i];
            draw(info.pointList);
		}

        $("#svg-box").empty();
        $("#svg-box").html(svgStr);
    };
    doTest();
});
