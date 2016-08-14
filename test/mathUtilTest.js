define(function(require) {
var mathUtil = require("../src/mathUtil");
return function() {

QUnit.module("mathUtil");

QUnit.test("vecAdd2D, a = {x:1,y:2}, b = {x:10,y:20}", function(assert) {
    var a = {x:1,y:2};
    var b = {x:10,y:20};
    var c = mathUtil.vecAdd2D(a, b);
    assert.ok(c.x === 11 && c.y === 22, "a + b = {x:11,y:22}");
});

QUnit.test("isSame2D, a = {x:1,y:2}, b = {x:10,y:20}, c = {x:10,y:20}", function(assert) {
    var a = {x:1,y:2};
    var b = {x:10,y:20};
    var c = {x:10,y:20};
    assert.ok(!mathUtil.isSame2D(a, b), "a != b");
    assert.ok(mathUtil.isSame2D(b, c), "b = c");
});

QUnit.test("pointCopy2D, a = {x:1,y:2}", function(assert) {
    var a = {x:1,y:2};
    var b = mathUtil.pointCopy2D(a);
    assert.ok(b.x === 1 && b.y === 2, "copy of a = {x:1,y:2}");
    assert.ok(a !== b, "copy of a is not the same instance of a. (a !== copy)")
});

};
});
