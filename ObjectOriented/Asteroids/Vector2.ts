namespace Asteroids {

    export class Vector2 {
        public x!: number;
        public y!: number;



        public constructor(_vector: Vector2);
        public constructor(_x: number, _y: number);
        public constructor(..._args: any[]) {
            if (_args.length === 2)
                this.set(_args[0], _args[1]);
            else if (_args.length === 1) {
                this.set(_args[0].x, _args[1].y)
            }
        }
        public static getDifference(_v0: Vector2, _v1: Vector2): Vector2 {
            const vector: Vector2 = new Vector2(_v0.x - _v1.x, _v0.y - _v1.y);
            return vector
        }
        public static random(_minLength: number, _maxLength: number): Vector2 {

            const length: number = _minLength + Math.random() * (_maxLength - _minLength);
            const direction: number = Math.random() * 2 * Math.PI;
            const vector: Vector2 = new Vector2(Math.cos(direction), Math.sin(direction));
            vector.scale(length);
            return vector
        }
        public get length(): number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
        public set length(_length: number) {
            this.normalise();
            this.scale(_length);
        }
        public add(_summand: Vector2): void {
            this.x += _summand.x;
            this.y += _summand.y;

        }
        public scale(_factor: number): void {
            this.y *= _factor;
            this.x *= _factor;

        }
        public rotate(_angleDegree: number): void {
            const angleRad: number = toRadian(_angleDegree);
            const xNew: number = this.x * Math.cos(angleRad) - this.y * Math.sin(angleRad);
            const yNew: number = this.y * Math.cos(angleRad) + this.x * Math.sin(angleRad);
            this.set(xNew, yNew);
        }
        public set(_vector: Vector2): void;
        public set(_x: number, _y: number): void;
        public set(..._args: any[]): void {
            if (_args.length === 1) {
                this.x = _args[0].x
                this.y = _args[0].y
            }
            else if (_args.length === 2) {
                this.x = _args[0];
                this.y = _args[1];
            }

        }

        public normalise(): void {
            const length: number = this.length;
            this.set(this.x / length, this.y / length);
        }
        public copy(): Vector2 {
            return new Vector2(this.x, this.y);
        }

    }

}
