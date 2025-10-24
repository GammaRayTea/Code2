namespace CanvasTest {

    interface Vector2 { x: number, y: number }
    interface Vector3 { x: number, y: number, z: number }

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let deltaTime: number;
    let previousTime: number = 0;
    let myInterval: NodeJS.Timeout;

    //let lastTriangleVectors:[]

    let seed: number;

    let drawStack: Path2D[] = [];
    let stepAmount: number;

    //process setup
    window.addEventListener("load", handleLoad);
    function handleLoad(this: Window, _event: Event): void {
        stepAmount = getStepAmount();

        setUpSeed();

        canvas = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;
        scaleCanvas();
        drawBackground();
        drawStack = assembleDrawStack();
        myInterval = setInterval(processLoop, 16.6666);
    }

    function getStepAmount(): number {

        const amount: number = Number(prompt("Please enter an integer"))

        if (amount == Number.NaN || !Number.isInteger(amount)) {
            alert("not an int")
            getStepAmount();
        }
        else {
            return amount
        }
        return 0;
    }
    function scaleCanvas(): void {
        canvas.width = visualViewport!.width;
        canvas.height = (canvas.width / 16) * 9;
    }

    //random setup
    function setUpSeed(): void {
        seed = Math.floor(Math.random() * 10000000000000000);
        const seedString: string = seed.toString();
       
    }


    //process
    function processLoop(): void {
        calcDeltaTime();
        
        executeDrawStack();
    }


    function calcDeltaTime(): void {
        const currentTime: number = Date.now();
        deltaTime = currentTime - previousTime;
        previousTime = currentTime;

    }





    //generate draw Stack

    function assembleDrawStack(): Path2D[] {
        const paths: Path2D[] = [];
        for (let i: number = 0; i < stepAmount; i++) {
            const vectors: Vector2[] = getTriangleVectors(i);

            paths.push(drawTriangle(vectors[0], vectors[1], vectors[2],))
            
        }
        return paths
    }




    //drawing
    //   triangele
    function drawTriangle(_a: Vector2, _b: Vector2, _c: Vector2): Path2D {
        const path: Path2D = new Path2D();
        const points: Vector2[] = [_b, _c, _a];

        path.moveTo(_a.x, _a.y);
       
        for (let i: number = 0; i <= 2; i++) {
            path.lineTo(points[i].x, points[i].y);
        }
        console.log(Path2D);
        return path

    }

    function getTriangleVectors(_step: number): Vector2[] {
        //if (_step == 0) {
        //}
        const vectors: Vector2[] = [];
        for (let i:number =0;i<3;i++){
            vectors.push({ x: randomIntInRange(0, canvas.width), y: randomIntInRange(0, canvas.height) })
        }
        return vectors;
    }

    function drawBackground(): void {
        crc2.fillStyle = "#5a5a5aff";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }


    function executeDrawStack(): void {

        for (let i: number = 0; i < drawStack.length; i++) {
            crc2.stroke(drawStack[i]);
            drawStack.splice(i, 1);
            
        }
        if (drawStack.length == 0) {
            clearInterval(myInterval);
        }
    }


    //Math
    function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());



    }
}
