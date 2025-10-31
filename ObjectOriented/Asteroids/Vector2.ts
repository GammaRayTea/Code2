namespace Asteroids {

    export class Vector2 {
        public x!: number;
        public y!: number;




        public constructor(_x: number, _y: number) {
            this.set(_x, _y);
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
        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }
        public normalise(): void {
            const length: number = this.length;
            this.set(this.x / length, this.y / length);
        }
        public random(_minLength: number, _maxLength: number): void {
            const length: number = _minLength + Math.random() * (_maxLength - _minLength);
            const direction: number = Math.random() * 2 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        public copy(): Vector2 {
            return new Vector2(this.x, this.y);
        }

    }

}
