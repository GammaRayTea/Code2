namespace CanvasTransform {

    export class Vec3 {
        public x: number = 0;
        public y: number = 0;
        public z: number = 0;
        public constructor(_x: number = 0, _y: number = 0, _z: number = 0) {
            this.x = _x;
            this.y = _y;
            this.z = _z;
        }
        public add(_summand: Vec3): Vec3 {
            const x: number = this.x + _summand.x;
            const y: number = this.y + _summand.y;
            const z: number = this.z + _summand.z
            return new Vec3(x, y, z);
        }
        public scale(_factor: number): Vec3 {
            const x: number = this.x * _factor;
            const y: number = this.y * _factor;
            const z: number = this.z * _factor;
            return new Vec3(x, y, z);
        }

    }
}