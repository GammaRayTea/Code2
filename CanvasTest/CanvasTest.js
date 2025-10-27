"use strict";
var CanvasTest;
(function (CanvasTest) {
    let canvas;
    let crc2;
    let programID;
    const programList = ["RandomTris", "TriCircle"];
    let deltaTime;
    let previousTime = 0;
    let myInterval;
    //let lastTriangleVectors:[]
    let seed;
    let drawStack = [];
    //process setup
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        setUpSeed();
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        scaleCanvas();
        drawBackground();
        myInterval = setInterval(processLoop, 16.6666);
        chooseProgramme();
        drawStack = assembleDrawStack();
    }
    function askAmount(_promptText) {
        const amount = Number(prompt(_promptText + " Please enter an integer."));
        if (amount == Number.NaN || !Number.isInteger(amount)) {
            alert("not an int");
            askAmount(_promptText);
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
    function chooseProgramme() {
        let promptText = "";
        for (const program of programList) {
            promptText = promptText + program + " \n";
        }
        const input = prompt("Please choose a program by entering its name:" + "\n" + promptText);
        if (programList.indexOf(input) == -1) {
            alert("Enter a valid programm!");
            chooseProgramme();
        }
        else {
            programID = input;
        }
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
    //--drawing--
    //draw stack   
    function assembleDrawStack() {
        let paths = [];
        switch (programID) {
            case programList[0]:
                paths = makeRandomTriangles();
                break;
            case programList[1]:
                paths = makeTriangleCircle();
                break;
        }
        //paths = paths.concat(makeRandomTriangles());
        //paths = paths.concat(makeTriangleCircle());
        return paths;
    }
    function makeRandomTriangles() {
        const paths = [];
        const amount = askAmount("Enter the amount of random traingles?");
        for (let i = 0; i < amount; i++) {
            const vectors = [];
            for (let i = 0; i < 3; i++) {
                vectors.push(getRandomVector());
            }
            paths.push(createTrianglePath(vectors[0], vectors[1], vectors[2]));
        }
        return paths;
    }
    function makeTriangleCircle() {
        const paths = [];
        const rad = askAmount("Enter the radius.");
        const amount = askAmount("Enter the amount of triangles the circle should consist of.");
        const center = getRandomVector();
        //corners
        const corners = [];
        for (let i = 0; i < amount; i++) {
            const newVec = new CanvasTest.Vec2(Math.sin((2 * Math.PI / amount) * i), Math.cos((2 * Math.PI / amount) * i)).scale(rad);
            corners.push(newVec.add(center));
        }
        //console.log(corners)
        for (let i = 0; i < amount; i++) {
            paths.push(createTrianglePath(center, corners[i], corners[(i + 1) % amount]));
            console.log(i % amount);
        }
        return paths;
    }
    //   triangle
    function createTrianglePath(_a, _b, _c) {
        const path = new Path2D();
        const points = [_b, _c, _a];
        //console.log(points);
        path.moveTo(_a.x, _a.y);
        for (let i = 0; i <= 2; i++) {
            path.lineTo(points[i].x, points[i].y);
        }
        return path;
    }
    function drawBackground() {
        crc2.fillStyle = "#5a5a5aff";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    //--finalize drawing--
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
    function getRandomVector(_minVec = new CanvasTest.Vec2(0, 0), _maxVec = new CanvasTest.Vec2(canvas.width, canvas.height)) {
        return new CanvasTest.Vec2(randomIntInRange(_minVec.x, _maxVec.x), randomIntInRange(_minVec.y, _maxVec.y));
    }
})(CanvasTest || (CanvasTest = {}));
//# sourceMappingURL=CanvasTest.js.map