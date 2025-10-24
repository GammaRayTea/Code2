"use strict";
var CanvasTest;
(function (CanvasTest) {
    let canvas;
    let crc2;
    let deltaTime;
    let previousTime = 0;
    let myInterval;
    //let lastTriangleVectors:[]
    let seed;
    let drawStack = [];
    let stepAmount;
    //process setup
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        stepAmount = getStepAmount();
        setUpSeed();
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        scaleCanvas();
        drawBackground();
        drawStack = assembleDrawStack();
        myInterval = setInterval(processLoop, 16.6666);
    }
    function getStepAmount() {
        const amount = Number(prompt("Please enter an integer"));
        if (amount == Number.NaN || !Number.isInteger(amount)) {
            alert("not an int");
            getStepAmount();
        }
        else {
            return amount;
        }
        return 0;
    }
    function scaleCanvas() {
        canvas.width = visualViewport.width;
        canvas.height = (canvas.width / 16) * 9;
    }
    //random setup
    function setUpSeed() {
        seed = Math.floor(Math.random() * 10000000000000000);
        const seedString = seed.toString();
    }
    //process
    function processLoop() {
        calcDeltaTime();
        executeDrawStack();
    }
    function calcDeltaTime() {
        const currentTime = Date.now();
        deltaTime = currentTime - previousTime;
        previousTime = currentTime;
    }
    //generate draw Stack
    function assembleDrawStack() {
        const paths = [];
        for (let i = 0; i < stepAmount; i++) {
            const vectors = getTriangleVectors(i);
            paths.push(drawTriangle(vectors[0], vectors[1], vectors[2]));
        }
        return paths;
    }
    //drawing
    //   triangele
    function drawTriangle(_a, _b, _c) {
        const path = new Path2D();
        const points = [_b, _c, _a];
        path.moveTo(_a.x, _a.y);
        for (let i = 0; i <= 2; i++) {
            path.lineTo(points[i].x, points[i].y);
        }
        console.log(Path2D);
        return path;
    }
    function getTriangleVectors(_step) {
        //if (_step == 0) {
        //}
        const vectors = [];
        for (let i = 0; i < 3; i++) {
            vectors.push({ x: randomIntInRange(0, canvas.width), y: randomIntInRange(0, canvas.height) });
        }
        return vectors;
    }
    function drawBackground() {
        crc2.fillStyle = "#5a5a5aff";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function executeDrawStack() {
        for (let i = 0; i < drawStack.length; i++) {
            crc2.stroke(drawStack[i]);
            drawStack.splice(i, 1);
        }
        if (drawStack.length == 0) {
            clearInterval(myInterval);
        }
    }
    //Math
    function randomIntInRange(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
})(CanvasTest || (CanvasTest = {}));
//# sourceMappingURL=CanvasTest.js.map