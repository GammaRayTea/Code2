"use strict";
var CanvasTransform;
(function (CanvasTransform) {
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
    CanvasTransform.Vec2 = Vec2;
})(CanvasTransform || (CanvasTransform = {}));
var CanvasTransform;
(function (CanvasTransform) {
    let canvas;
    let crc2;
    const transformBuffer = [];
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        setUpCanvas();
    }
    const transformList = [
        { type: "scale", vector: new CanvasTransform.Vec2(2, 2) },
        { type: "translate", vector: new CanvasTransform.Vec2(50, 50) },
        { type: "rotate", angleDegree: 20 }
    ];
    function setUpCanvas() {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvas.height = 600;
        canvas.width = 600;
        crc2.fillStyle = "#7b6363ff";
        crc2.fillRect(0, 0, 600, 600);
        drawCoordinateSystem(new CanvasTransform.Vec2(0, 0), 200);
        drawLoop(transformList.length);
    }
    function drawLoop(_amount) {
        for (let i = 0; i < _amount; i++) {
            doTransform(i);
            drawCoordinateSystem(new CanvasTransform.Vec2(0, 0), 200);
            crc2.strokeStyle = getRandomColor();
            transformBuffer.push(crc2.getTransform());
        }
        console.log(transformBuffer);
    }
    function drawCoordinateSystem(_origin, _axisLength) {
        const path = new Path2D();
        //axes
        path.moveTo(_origin.x, _origin.y);
        path.lineTo(_origin.x, _origin.y + _axisLength);
        path.moveTo(_origin.x, _origin.y);
        path.lineTo(_origin.x + _axisLength, _origin.y);
        drawNotches(_axisLength, _origin, path);
    }
    function drawNotches(_axisLength, _origin, _path) {
        const notchAmount = _axisLength / 10;
        for (let i = 1; i <= notchAmount; i++) {
            _path.moveTo(_origin.x + i * 10, _origin.y - 4);
            _path.lineTo(_origin.x + i * 10, _origin.y + 4);
            _path.moveTo(_origin.x - 4, _origin.y + i * 10);
            _path.lineTo(_origin.x + 4, _origin.y + i * 10);
        }
        crc2.stroke(_path);
    }
    function doTransform(_step) {
        const transform = transformList[_step];
        switch (transformList[_step].type) {
            case "translate":
                crc2.translate(transform.vector.x, transform.vector.y);
                break;
            case "rotate":
                crc2.rotate(transform.angleDegree * Math.PI / 180);
                break;
            case "scale":
                crc2.scale(transform.vector.x, transform.vector.y);
                break;
        }
    }
    function getRandomColor() {
        return `rgb(${randomIntInRange(20, 255)},${randomIntInRange(20, 255)},${randomIntInRange(20, 255)})`;
    }
    function randomIntInRange(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
    function getRandomVector(_minVec = new CanvasTransform.Vec2(0, 0), _maxVec = new CanvasTransform.Vec2(canvas.width, canvas.height)) {
        return new CanvasTransform.Vec2(randomIntInRange(_minVec.x, _maxVec.x), randomIntInRange(_minVec.y, _maxVec.y));
    }
})(CanvasTransform || (CanvasTransform = {}));
var CanvasTransform;
(function (CanvasTransform) {
    class Vec3 {
        x = 0;
        y = 0;
        z = 0;
        constructor(_x = 0, _y = 0, _z = 0) {
            this.x = _x;
            this.y = _y;
            this.z = _z;
        }
        add(_summand) {
            const x = this.x + _summand.x;
            const y = this.y + _summand.y;
            const z = this.z + _summand.z;
            return new Vec3(x, y, z);
        }
        scale(_factor) {
            const x = this.x * _factor;
            const y = this.y * _factor;
            const z = this.z * _factor;
            return new Vec3(x, y, z);
        }
    }
    CanvasTransform.Vec3 = Vec3;
})(CanvasTransform || (CanvasTransform = {}));
//# sourceMappingURL=CanvasTransform.js.map