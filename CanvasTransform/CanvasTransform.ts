

namespace CanvasTransform {
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    const transformBuffer: DOMMatrix[] = [];
    interface Transform {

        type: string,
        vector?: Vec2,
        angleDegree?: number
    }



    window.addEventListener("load", handleLoad);


    function handleLoad(this: Window, _event: Event): void {
        setUpCanvas();

    }



    const transformList: Transform[] = [
        { type: "scale", vector: new Vec2(2, 2) },
        { type: "translate", vector: new Vec2(50, 50) },
        { type: "rotate", angleDegree: 20 }
    ];

    function setUpCanvas(): void {
        canvas = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;

        canvas.height = 600;
        canvas.width = 600;
        crc2.fillStyle = "#7b6363ff";
        crc2.fillRect(0, 0, 600, 600);
        drawCoordinateSystem(new Vec2(0, 0), 200);
        drawLoop(transformList.length);
    }

    function drawLoop(_amount: number): void {
        for (let i: number = 0; i < _amount; i++) {

            doTransform(i);
            drawCoordinateSystem(new Vec2(0, 0), 200);
            crc2.strokeStyle = getRandomColor();
            transformBuffer.push(crc2.getTransform())
        }
        console.log(transformBuffer);
    }


    function drawCoordinateSystem(_origin: Vec2, _axisLength: number): void {
        const path: Path2D = new Path2D();

        //axes
        path.moveTo(_origin.x, _origin.y);
        path.lineTo(_origin.x, _origin.y + _axisLength);
        path.moveTo(_origin.x, _origin.y);
        path.lineTo(_origin.x + _axisLength, _origin.y);
        drawNotches(_axisLength, _origin, path);


    }

    function drawNotches(_axisLength: number, _origin: Vec2, _path: Path2D): void {
        const notchAmount: number = _axisLength / 10;
        for (let i: number = 1; i <= notchAmount; i++) {
            _path.moveTo(_origin.x + i * 10, _origin.y - 4);
            _path.lineTo(_origin.x + i * 10, _origin.y + 4);

            _path.moveTo(_origin.x - 4, _origin.y + i * 10);
            _path.lineTo(_origin.x + 4, _origin.y + i * 10);
        }

        crc2.stroke(_path);
    }


    function doTransform(_step: number): void {
        const transform: Transform = transformList[_step];

        switch (transformList[_step].type) {

            case "translate":
                crc2.translate(transform.vector!.x, transform.vector!.y);
                break;


            case "rotate":
                crc2.rotate(transform.angleDegree! * Math.PI / 180);
                break;

            case "scale":
                crc2.scale(transform.vector!.x, transform.vector!.y);
                break;
        }
    }

    function getRandomColor(): string {

        return `rgb(${randomIntInRange(20, 255)},${randomIntInRange(20, 255)},${randomIntInRange(20, 255)})`;
    }

    function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }


    function getRandomVector(_minVec: Vec2 = new Vec2(0, 0), _maxVec: Vec2 = new Vec2(canvas.width, canvas.height)): Vec2 {
        return new Vec2(randomIntInRange(_minVec.x, _maxVec.x), randomIntInRange(_minVec.y, _maxVec.y));
    }
}