namespace ObjectOriented {

    export class Vec3 {
        public x: number = 0;
        public y: number = 0;
        public z: number = 0;
        public constructor(_x: number = 0, _y: number = 0, _z: number = 0) {
            this.x = _x;
            this.y = _y;
            this.z = _z;
        }
        public add(_summand: Vec3): void {
            this.x += _summand.x;
            this.y += _summand.y;
            this.z += _summand.z

        }
        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
            this.z *= _factor;
        }
        public setValues(_x: number, _y: number, _z: number): void {
            this.x = _x
            this.y = _y
            this.z = _z
        }

    }
}