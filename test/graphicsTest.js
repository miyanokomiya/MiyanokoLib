define(function(require) {
    var mathUtil = require("../src/mathUtil");
    var svgUtil = require("../src/svgUtil");

    var ctx1 = $("#canvas")[0].getContext("2d");
    var ctx2 = $("#canvas2")[0].getContext("2d");

    var draw = function(pointList) {
        ctx1.strokeStyle = "red";
        ctx1.setLineDash([3,3]);
        ctx1.beginPath();
        pointList.forEach(function(p) {
            ctx1.lineTo(p.x, p.y);
        });
        ctx1.stroke();
    };
    var draw2 = function(pointList) {
        ctx2.strokeStyle = "red";
        ctx2.setLineDash([3,3]);
        ctx2.beginPath();
        pointList.forEach(function(p) {
            ctx2.lineTo(p.x, p.y);
        });
        ctx2.stroke();
    };
    // svgのpathタグ文字列をパースして描画する
    var parseDraw = function(svg) {
        var dom_parser = new DOMParser();
        var svgDom = null;
        try {
            svgDom = dom_parser.parseFromString(svg, "image/svg+xml");
        } catch (e) {
            console.log("This svg resouce is invalid to parse.");
            throw e;
        }
        draw2(svgUtil.parsePath(svgDom.getElementsByTagName("path")[0]));
    };

    var splitSize = 1;
    $("#split-size").on("change", function() {
        doTest();
    });

    var doTest = function() {
        ctx1.clearRect(0, 0, 500, 500);
        ctx2.clearRect(0, 0, 500, 500);
        splitSize = parseInt($("#split-size").val(), 10);

        var svgList = [];
        svgList[0] = '<path d="M 50,50 a 20 40 0 1 1 0 40" fill="none" stroke="black"/>';
        var pointList = mathUtil.approximateArcWithPoint(
            20, 40,
            {x : 50, y : 50},
            {x : 50, y : 90},
            1, 1, 0, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[0]);

        svgList[1] = '<path d="M 100,50 a 35 20 0 1 1 0 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            35, 20,
            {x : 100, y : 50},
            {x : 100, y : 90},
            1, 1, 0, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[1]);

        svgList[2] = '<path d="M 200,50 a 35 30 0 1 0 0 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            35, 30,
            {x : 200, y : 50},
            {x : 200, y : 90},
            1, 0, 0, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[2]);

        svgList[3] = '<path d="M 350,50 a 60, 50 0 1 0 -100 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            60, 50,
            {x : 350, y : 50},
            {x : 250, y : 90},
            1, 0, 0, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[3]);

        svgList[4] = '<path d="M 50,150 a 80, 70 40 1 0 100 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            80, 70,
            {x : 50, y : 150},
            {x : 150, y : 190},
            1, 0, 40 / 180 * Math.PI, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[4]);

        svgList[5] = '<path d="M 50,180 a 80, 70 40 0 0 100 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            80, 70,
            {x : 50, y : 180},
            {x : 150, y : 220},
            0, 0, 40 / 180 * Math.PI, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[5]);

        svgList[6] = '<path d="M 250,180 a 80, 70 -70 0 1 100 40" fill="none" stroke="black"/>';
        pointList = mathUtil.approximateArcWithPoint(
            80, 70,
            {x : 250, y : 180},
            {x : 350, y : 220},
            0, 1, -70 / 180 * Math.PI, splitSize
        );
        draw(pointList);
        svgUtil.BEZIER_SPLIT_COUNT = splitSize;
        parseDraw(svgList[6]);

        $("#svg-box").html(svgList.join());
        $("#svg-box2").html(svgList.join());
    };
    doTest();
});
