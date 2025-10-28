


namespace CanvasTest {



    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let programID: string;
    const programList: string[] = ["RandomTris", "TriCircle"];
    let deltaTime: number;
    let previousTime: number = 0;
    

    //let lastTriangleVectors:[]

    let seed: number;

    let drawStack: Path2D[] = [];


    //process setup
    window.addEventListener("load", handleLoad);
    function handleLoad(this: Window, _event: Event): void {


        setUpSeed();

        canvas = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;
        scaleCanvas();
        drawBackground();

       setInterval(processLoop, 16.6666);

        chooseProgramme();
        drawStack = assembleDrawStack();
    }

    function askAmount(_promptText: string): number {

        const amount: number = Number(prompt(_promptText + " Please enter an integer."))

        if (amount == Number.NaN || !Number.isInteger(amount)) {
            alert("not an int")
            askAmount(_promptText);
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


    function chooseProgramme(): void {
        let promptText: string = "";
        for (const program of programList) {
            promptText = promptText + program + " \n"
        }
        const input: string = prompt("Please choose a program by entering its name:" + "\n" + promptText)!;
        if (programList.indexOf(input) == -1) {
            alert("Enter a valid programm!");
            chooseProgramme();
        }
        else {
            programID = input;
        }
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




    //--drawing--

    //draw stack   
    function assembleDrawStack(): Path2D[] {
        let paths: Path2D[] = [];
        switch (programID) {
            case programList[0]:
                paths = makeRandomTriangles()
                break;

            case programList[1]:
                paths = makeTriangleCircle()
                break;
        }


        //paths = paths.concat(makeRandomTriangles());
        //paths = paths.concat(makeTriangleCircle());
        return paths
    }


    function makeRandomTriangles(): Path2D[] {
        const paths: Path2D[] = [];
        const amount: number = askAmount("Enter the amount of random traingles?");
        for (let i: number = 0; i < amount; i++) {
            const vectors: Vec2[] = [];
            for (let i: number = 0; i < 3; i++) {
                vectors.push(getRandomVector());
            }
            paths.push(createTrianglePath(vectors[0], vectors[1], vectors[2],))
        }
        return paths
    }


    function makeTriangleCircle(): Path2D[] {

        const paths: Path2D[] = [];
        const rad: number = askAmount("Enter the radius.");
        const amount: number = askAmount("Enter the amount of triangles the circle should consist of.");
        const center: Vec2 = getRandomVector();


        //corners
        const corners: Vec2[] = [];
        for (let i: number = 0; i < amount; i++) {
            const newVec: Vec2 = new Vec2(
                Math.sin((2 * Math.PI / amount) * i),
                Math.cos((2 * Math.PI / amount) * i)
            ).scale(rad);
            corners.push(newVec.add(center));
        }
        //console.log(corners)
        for (let i: number = 0; i < amount; i++) {

            paths.push(createTrianglePath(center, corners[i], corners[(i + 1) % amount]));
            console.log(i % amount);
        }




        return paths
    }


    //   triangle
    function createTrianglePath(_a: Vec2, _b: Vec2, _c: Vec2): Path2D {
        const path: Path2D = new Path2D();
        const points: Vec2[] = [_b, _c, _a];
        //console.log(points);
        path.moveTo(_a.x, _a.y);

        for (let i: number = 0; i <= 2; i++) {
            path.lineTo(points[i].x, points[i].y);
        }

        return path;

    }



    function drawBackground(): void {
        crc2.fillStyle = "#5a5a5aff";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }






    //--finalize drawing--
    function executeDrawStack(): void {

        for (let i: number = 0; i < drawStack.length; i++) {
            crc2.stroke(drawStack[i]);
            drawStack.splice(i, 1);

        }
        // if (drawStack.length == 0) {
            
        // }
    }


    //Math
    function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }


    function getRandomVector(_minVec: Vec2 = new Vec2(0, 0), _maxVec: Vec2 = new Vec2(canvas.width, canvas.height)): Vec2 {

        return new Vec2(randomIntInRange(_minVec.x, _maxVec.x), randomIntInRange(_minVec.y, _maxVec.y));
    }
}
