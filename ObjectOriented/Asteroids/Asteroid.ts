namespace Asteroids {
    export class Asteroid extends Moveable {
        public readonly type: number;
        public readonly size: number;

        public constructor(_size: number, _position: Vector2 = new Vector2(0, 0)) {
            super(_position);
            this.velocity  = Vector2.random(50, 60);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
            this.scale.set(this.size, this.size);
            this.path = asteroidPaths[this.type];
            this.drawOffset.set(43, 48);
        }


        protected get drawLineStrength(): number {
            return 2 / this.size;
        }




        public isHit(_hotspot: Vector2): boolean {
            const hitSize: number = 50 * this.size;

            const vecBetween: Vector2 = Vector2.getDifference(_hotspot, this.position);
            if (vecBetween.length < hitSize) {

                return true;
            }
            else {

                return false;
            }
        }
    }
}