"use strict";
var CanvasTest;
(function (CanvasTest) {
    class Vec2 {
        x = 0;
        y = 0;
        constructor(_x = 0, _y = 0) {
            this.x = _x;
            this.y = _y;
        }
        add(_summand) {
            const x = this.x + _summand.x;
            const y = this.y + _summand.y;
            return new Vec2(x, y);
        }
        scale(_factor) {
            const x = this.x * _factor;
            const y = this.y * _factor;
            return new Vec2(x, y);
        }
    }
    CanvasTest.Vec2 = Vec2;
})(CanvasTest || (CanvasTest = {}));
//# sourceMappingURL=Vector2.js.map