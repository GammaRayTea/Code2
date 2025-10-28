namespace ObjectOriented {

    export class Vec2 {
        public x: number = 0;
        public y: number;
        public constructor(_x: number = 0, _y: number = 0) {
            this.x = _x;
            this.y = _y;
        }
        public add(_summand: Vec2): void {
            this.x += _summand.x;
            this.y += _summand.y;

        }
        public scale(_factor: number): void {
            this.y *= _factor;
            this.x *= _factor;

        }
        public setValues(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

    }
    
}
