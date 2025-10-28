namespace CanvasTransform {

    export class Vec2 {
        public x: number = 0;
        public y: number = 0;
        public constructor(_x: number = 0, _y: number = 0) {
            this.x = _x;
            this.y = _y;
        }
        public add(_summand: Vec2): Vec2 {
            const x: number = this.x + _summand.x;
            const y: number = this.y + _summand.y;
            return new Vec2(x, y);
        }
        public scale(_factor: number): Vec2 {
            const x: number = this.x * _factor;
            const y: number = this.y * _factor;
            return new Vec2(x, y);
        }
        public setValues(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

    }
}