

namespace Asteroids {
    window.addEventListener("load", handleLoad);

    const debug: boolean = true;
    const frameRate: number = 120;
    const startingAsteroids: number = 5;

    export let crc2: CanvasRenderingContext2D;
    const moveables: Moveable[] = [];
    //const moveables: Moveable[] = [];
    let prevTimeMillis: number = Date.now();


    let ship: Ship;
    let ufo: Ufo;
    //process setup
    function handleLoad(_event: Event): void {

        console.log("Asteroids starting");
        createPaths();
        setUpCanvas();

        createAsteroids(startingAsteroids);
        ship = new Ship();
        moveables.push(ship);
        ufo = new Ufo();
        moveables.push(ufo);
        Input.setup();
        if (debug) {
            setUpDebug();
        }
        setInterval(processLoop, 1000 / frameRate);
    }
    function setUpDebug(): void {
        for (const moveable of moveables) {
            moveable.drawCenter();
        }
    }
    function setUpCanvas(): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        canvas.width = 480;
        canvas.height = 360;

        crc2 = canvas.getContext("2d")!;
        crc2.fillStyle = "black";
        crc2.strokeStyle = "white";
        clearBackground();
        installListeners(canvas);
    }
    function installListeners(_canvas: HTMLCanvasElement): void {
        _canvas.addEventListener("mouseup", shootLaser);
        _canvas.addEventListener("ufoShoot", spawnProjectile);
    }

    function clearBackground(): void {
        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }


    //game setup
    function createAsteroids(_amount: number): void {

        for (let i: number = 0; i < _amount; i++) {
            const asteroid: Asteroid = new Asteroid(1.0);
            moveables.push(asteroid);
            //console.log(asteroid);

        }
    }

    //process
    function processLoop(): void {

        const delta: number = getDeltaTime();
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




    function getDeltaTime(): number {
        const delta: number = Date.now() - prevTimeMillis;
        prevTimeMillis = Date.now();
        return delta;
    }


    function shootLaser(_event: MouseEvent): void {
        //console.log("shootLaser");
        const hotspot: Vector2 = new Vector2(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop)
        const asteroidHit: Asteroid | null = getAsteroidHit(hotspot);

        if (asteroidHit) {
            breakAsteroid(asteroidHit);
        }
    }


    function pollInput(): void {

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


    function breakAsteroid(_asteroid: Asteroid): void {
        if (_asteroid.size > 0.3) {
            for (let i: number = 0; i < 2; i++) {
                const fragment: Asteroid = new Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocity.add(_asteroid.velocity);
                moveables.push(fragment);
            }
        }
        _asteroid.delete()

    }


    function deleteQueued(): void {
        for (let i: number = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].deletionQueued) {
                moveables.splice(i, 1);
                console.log(moveables.length);
            }
        }
    }

    function getAsteroidHit(_hotspot: Vector2): Asteroid | null {

        for (const asteroid of moveables) {
            if (asteroid instanceof Asteroid) {
                if (asteroid.isHit(_hotspot)) {
                    return asteroid;
                }
            }
        }
        return null;
    }

    function spawnProjectile(_event: Event): void {

        const ufo: Ufo = (_event as CustomEvent).detail.ufo
        console.log(ufo.position)
        const projectile: Projectile = new Projectile(ufo.position, ufo.velocity);
        moveables.push(projectile);
    }

}