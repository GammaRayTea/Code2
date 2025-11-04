"use strict";
var Input;
(function (Input) {
    const registeredActions = [];
    const activeActions = [];
    let lastActiveActions = [];
    function setup() {
        createRegisteredInputList();
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }
    Input.setup = setup;
    function createRegisteredInputList() {
        for (const input of Input.inputMap) {
            registeredActions.push(input);
        }
    }
    function updateBuffer() {
        lastActiveActions = activeActions.slice(0, activeActions.length);
    }
    Input.updateBuffer = updateBuffer;
    function handleKeyDown(_event) {
        const foundRegistered = registeredActions.find((_action) => { return _action.key == _event.key; });
        const foundActive = activeActions.find((_action) => { return _action.key == _event.key; });
        //console.log(activeActions.includes(foundRegistered!))
        if (foundRegistered !== undefined && foundActive === undefined) {
            activeActions.push(registeredActions.find(_action => _action.key === _event.key));
        }
    }
    function handleKeyUp(_event) {
        const foundAction = activeActions.find(_element => _element.key === _event.key);
        if (foundAction !== undefined) {
            activeActions.splice(activeActions.indexOf(foundAction), 1);
        }
    }
    function isInputJustPressed(_recievedActionName) {
        if (activeActions.find(_element => _element.actionName === _recievedActionName) && !lastActiveActions.find(_element => _element.actionName === _recievedActionName)) {
            return true;
        }
        else {
            return false;
        }
    }
    Input.isInputJustPressed = isInputJustPressed;
    function isInputJustReleased(_recievedActionName) {
        if (!activeActions.find(_element => _element.actionName === _recievedActionName) && lastActiveActions.find(_element => _element.actionName === _recievedActionName)) {
            return true;
        }
        else {
            return false;
        }
    }
    Input.isInputJustReleased = isInputJustReleased;
    function isInputPressed(_recievedActionName) {
        if (activeActions.find(_element => _element.actionName === _recievedActionName)) {
            return true;
        }
        else {
            return false;
        }
    }
    Input.isInputPressed = isInputPressed;
})(Input || (Input = {}));
var Asteroids;
(function (Asteroids) {
    class Vector2 {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        get length() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
        set length(_length) {
            this.normalise();
            this.scale(_length);
        }
        add(_summand) {
            this.x += _summand.x;
            this.y += _summand.y;
        }
        scale(_factor) {
            this.y *= _factor;
            this.x *= _factor;
        }
        rotate(_angleDegree) {
            const angleRad = Asteroids.toRadian(_angleDegree);
            const xNew = this.x * Math.cos(angleRad) - this.y * Math.sin(angleRad);
            const yNew = this.y * Math.cos(angleRad) + this.x * Math.sin(angleRad);
            this.set(xNew, yNew);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        normalise() {
            const length = this.length;
            this.set(this.x / length, this.y / length);
        }
        random(_minLength, _maxLength) {
            const length = _minLength + Math.random() * (_maxLength - _minLength);
            const direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        copy() {
            return new Vector2(this.x, this.y);
        }
    }
    Asteroids.Vector2 = Vector2;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    Asteroids.shapesAsteroids = [
        [
            [30, 1], [50, 15], [71, 1], [88, 31], [67, 40], [84, 63], [59, 93], [30, 79], [19, 87], [2, 63], [15, 43], [8, 20]
        ],
        [
            [39, 1], [53, 28], [78, 15], [91, 41], [76, 59], [78, 82], [44, 94], [15, 83], [1, 55], [14, 14]
        ],
        [
            [39, 0], [57, 26], [68, 7], [86, 31], [88, 70], [53, 58], [54, 96], [26, 91], [28, 76], [2, 56], [15, 19]
        ],
        [
            [37, 3], [70, 14], [62, 34], [83, 31], [78, 76], [55, 96], [20, 84], [7, 67], [5, 27], [20, 15], [39, 39]
        ]
    ];
    Asteroids.shipShape = [
        [15, 0], [-10, -10], [-5, 0], [-10, 10]
    ];
    function createPaths() {
        //shipPath = createShipPath();
        Asteroids.asteroidPaths = createAsteroidPaths(Asteroids.shapesAsteroids);
        Asteroids.ufoPath = createUfoPath();
        Asteroids.shipPath = createShipPath();
        Asteroids.projectilePath = createProjectilePath();
    }
    Asteroids.createPaths = createPaths;
    function createAsteroidPaths(_shapes) {
        const paths = [];
        for (const type of _shapes) {
            const path = new Path2D();
            let first = true;
            // console.group(type);
            for (const coordinates of type) {
                // console.log(coordinates);
                if (first)
                    path.moveTo(coordinates[0], coordinates[1]);
                else
                    path.lineTo(coordinates[0], coordinates[1]);
                first = false;
            }
            // console.groupEnd();
            path.closePath();
            paths.push(path);
        }
        return paths;
    }
    function createUfoPath() {
        const path = new Path2D();
        path.moveTo(20, 13);
        path.lineTo(27, 3);
        path.lineTo(38, 3);
        path.lineTo(43, 13);
        path.lineTo(59, 25);
        path.lineTo(45, 35);
        path.lineTo(18, 35);
        path.lineTo(4, 25);
        path.lineTo(20, 13);
        path.lineTo(43, 13);
        path.closePath();
        path.moveTo(4, 25);
        path.lineTo(59, 25);
        path.closePath();
        return path;
    }
    function createShipPath() {
        const path = new Path2D();
        let first = true;
        for (const coordinates of Asteroids.shipShape) {
            //console.log(coordinates);
            if (first) {
                path.moveTo(coordinates[0], coordinates[1]);
            }
            else {
                path.lineTo(coordinates[0], coordinates[1]);
            }
            first = false;
        }
        path.closePath();
        return path;
    }
    function createProjectilePath() {
        const path = new Path2D();
        path.rect(1, 1, 1, 1);
        return path;
    }
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Moveable {
        position = new Asteroids.Vector2(0, 0);
        velocity = new Asteroids.Vector2(0, 0);
        ;
        scale = new Asteroids.Vector2(1, 1);
        rotation = 0;
        path;
        drawOffset = new Asteroids.Vector2(0, 0);
        deletionQueued = false;
        constructor(_position) {
            if (_position) {
                this.position = _position.copy();
            }
        }
        get drawLineStrength() {
            return 1;
        }
        drawCenter() {
            this.path.rect(this.drawOffset.x, this.drawOffset.y, 3, 3);
        }
        move(_timeslice) {
            const offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < -50) {
                this.position.x += Asteroids.crc2.canvas.width + 50;
                //console.log("wrapped x");
            }
            if (this.position.x > Asteroids.crc2.canvas.width + 50) {
                this.position.x -= Asteroids.crc2.canvas.width + 50;
                //console.log("wrapped x");
            }
            if (this.position.y < -50) {
                this.position.y += Asteroids.crc2.canvas.height + 50;
                //console.log("wrapped y");
            }
            if (this.position.y > Asteroids.crc2.canvas.height + 50) {
                this.position.y -= Asteroids.crc2.canvas.height + 50;
                //console.log("wrapped y");
            }
        }
        draw() {
            Asteroids.crc2.save();
            Asteroids.crc2.strokeStyle = "white";
            Asteroids.crc2.lineWidth = this.drawLineStrength;
            ;
            Asteroids.crc2.translate(this.position.x, this.position.y);
            Asteroids.crc2.scale(this.scale.x, this.scale.y);
            Asteroids.crc2.translate(-this.drawOffset.x, -this.drawOffset.y);
            Asteroids.crc2.rotate(Asteroids.toRadian(this.rotation));
            Asteroids.crc2.stroke(this.path);
            Asteroids.crc2.restore();
        }
        delete() {
            this.deletionQueued = true;
        }
    }
    Asteroids.Moveable = Moveable;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Ship extends Asteroids.Moveable {
        thrust = 0;
        maxThrust = 2;
        maxSpeed = 100;
        constructor(_position = new Asteroids.Vector2(240, 180)) {
            super(_position);
            this.scale.set(0.6, 0.6);
            this.path = Asteroids.shipPath;
            this.drawOffset.set(-1, -1.5);
        }
        get drawLineStrength() {
            return 2;
        }
        move(_timeslice) {
            this.capSpeed();
            const acceleration = new Asteroids.Vector2(this.thrust, 0);
            acceleration.rotate(this.rotation);
            this.velocity.add(acceleration);
            super.move(_timeslice);
        }
        isHit(_hotspot) {
            const hitSize = 20;
            const vecBetween = new Asteroids.Vector2(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            if (vecBetween.length < hitSize) {
                return true;
            }
            else {
                return false;
            }
        }
        accelerate() {
            if (this.thrust < this.maxThrust) {
                this.thrust += 1;
            }
        }
        capSpeed() {
            if (this.thrust > 0) {
                this.thrust -= 0.2;
                if (this.thrust < 0) {
                    this.thrust = 0;
                }
            }
            if (this.velocity.length > this.maxSpeed) {
                this.velocity.length = this.maxSpeed;
            }
        }
    }
    Asteroids.Ship = Ship;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Asteroid extends Asteroids.Moveable {
        type;
        size;
        constructor(_size, _position = new Asteroids.Vector2(0, 0)) {
            super(_position);
            this.velocity.random(50, 60);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
            this.scale.set(this.size, this.size);
            this.path = Asteroids.asteroidPaths[this.type];
            this.drawOffset.set(43, 48);
        }
        get drawLineStrength() {
            return 2 / this.size;
        }
        isHit(_hotspot) {
            const hitSize = 50 * this.size;
            const vecBetween = new Asteroids.Vector2(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            if (vecBetween.length < hitSize) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    Asteroids.Asteroid = Asteroid;
})(Asteroids || (Asteroids = {}));
var Input;
(function (Input) {
    Input.inputMap = [
        { actionName: "left", key: "a" },
        { actionName: "right", key: "d" },
        { actionName: "forward", key: "w" },
        { actionName: "shoot", key: " " },
    ];
})(Input || (Input = {}));
var Asteroids;
(function (Asteroids) {
    window.addEventListener("load", handleLoad);
    const debug = true;
    const frameRate = 120;
    const startingAsteroids = 5;
    const moveables = [];
    //const moveables: Moveable[] = [];
    let prevTimeMillis = Date.now();
    let ship;
    let ufo;
    //process setup
    function handleLoad(_event) {
        console.log("Asteroids starting");
        Asteroids.createPaths();
        setUpCanvas();
        createAsteroids(startingAsteroids);
        ship = new Asteroids.Ship();
        moveables.push(ship);
        ufo = new Asteroids.Ufo();
        moveables.push(ufo);
        Input.setup();
        if (debug) {
            setUpDebug();
        }
        setInterval(processLoop, 1000 / frameRate);
    }
    function setUpDebug() {
        for (const moveable of moveables) {
            moveable.drawCenter();
        }
    }
    function setUpCanvas() {
        const canvas = document.querySelector("canvas");
        canvas.width = 480;
        canvas.height = 360;
        Asteroids.crc2 = canvas.getContext("2d");
        Asteroids.crc2.fillStyle = "black";
        Asteroids.crc2.strokeStyle = "white";
        clearBackground();
        installListeners(canvas);
    }
    function installListeners(_canvas) {
        _canvas.addEventListener("mouseup", shootLaser);
    }
    function clearBackground() {
        Asteroids.crc2.fillStyle = "black";
        Asteroids.crc2.fillRect(0, 0, Asteroids.crc2.canvas.width, Asteroids.crc2.canvas.height);
    }
    //game setup
    function createAsteroids(_amount) {
        for (let i = 0; i < _amount; i++) {
            const asteroid = new Asteroids.Asteroid(1.0);
            moveables.push(asteroid);
            //console.log(asteroid);
        }
    }
    //process
    function processLoop() {
        const delta = getDeltaTime();
        clearBackground();
        pollInput();
        for (const moveable of moveables) {
            moveable.move((delta / 1000));
            moveable.draw();
        }
        Input.updateBuffer();
        deleteQueued();
        //ufo.move(delta / 1000);
        //ufo.draw();
        //ship.move(delta / 1000);
        //ship.draw();
    }
    function getDeltaTime() {
        const delta = Date.now() - prevTimeMillis;
        prevTimeMillis = Date.now();
        return delta;
    }
    function shootLaser(_event) {
        //console.log("shootLaser");
        const hotspot = new Asteroids.Vector2(_event.clientX - Asteroids.crc2.canvas.offsetLeft, _event.clientY - Asteroids.crc2.canvas.offsetTop);
        const asteroidHit = getAsteroidHit(hotspot);
        if (asteroidHit) {
            breakAsteroid(asteroidHit);
        }
    }
    function pollInput() {
        if (Input.isInputPressed("forward")) {
            ship.accelerate();
        }
        if (Input.isInputPressed("left")) {
            ship.rotation -= 0.002;
        }
        else if (Input.isInputPressed("right")) {
            ship.rotation += 0.002;
        }
        if (Input.isInputJustPressed("shoot")) {
        }
    }
    function breakAsteroid(_asteroid) {
        if (_asteroid.size > 0.3) {
            for (let i = 0; i < 2; i++) {
                const fragment = new Asteroids.Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocity.add(_asteroid.velocity);
                moveables.push(fragment);
            }
        }
        _asteroid.delete();
    }
    function deleteQueued() {
        for (let i = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].deletionQueued) {
                moveables.splice(i, 1);
                console.log(moveables.length);
            }
        }
    }
    function getAsteroidHit(_hotspot) {
        for (const asteroid of moveables) {
            if (asteroid instanceof Asteroids.Asteroid) {
                if (asteroid.isHit(_hotspot)) {
                    return asteroid;
                }
            }
        }
        return null;
    }
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    function toDegree(_angleRad) {
        return _angleRad * (Math.PI / 180);
    }
    Asteroids.toDegree = toDegree;
    function toRadian(_angleDegree) {
        return _angleDegree * (180 / Math.PI);
    }
    Asteroids.toRadian = toRadian;
    function randomIntInRange(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
    Asteroids.randomIntInRange = randomIntInRange;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Projectile extends Asteroids.Moveable {
        lifeTime = 3;
        constructor(_position, _velocity) {
            super(_position.copy());
            this.velocity = _velocity.copy();
            this.velocity.scale(4);
            this.path = Asteroids.projectilePath;
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.lifeTime -= _timeslice;
            if (this.lifeTime <= 0) {
                this.delete();
            }
        }
    }
    Asteroids.Projectile = Projectile;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Ufo extends Asteroids.Moveable {
        projectileTimer = 60;
        constructor() {
            super();
            this.position = this.spawnPoint();
            this.velocity.set(10, 10);
            this.path = Asteroids.ufoPath;
            this.drawOffset.set(30, 20);
        }
        get spawnPoint() {
            const spawnHeight = Asteroids.randomIntInRange(20, Asteroids.crc2.canvas.height - 20);
            switch (Asteroids.randomIntInRange(0, 1)) {
                case 0: {
                    break;
                }
                case 1: {
                    break;
                }
            }
            const spawnPoint = new Asteroids.Vector2(0, spawnHeight);
        }
        move(_timeslice) {
            super.move(_timeslice);
        }
    }
    Asteroids.Ufo = Ufo;
})(Asteroids || (Asteroids = {}));
//# sourceMappingURL=Asteroids.js.map