namespace Asteroids {
    export class Asteroid extends Moveable {
        public type: number;
        public size: number;

        public constructor(_size: number, _position: Vector2 = new Vector2(0, 0)) {
            super(_position);
            this.velocity.random(50, 60);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
            this.scale.set(this.size, this.size);
            this.path = asteroidPaths[this.type];
            this.drawOffset.set(43, 48);
        }


        public get drawLineStrength(): number {
            return 2 / this.size;
        }




        public isHit(_hotspot: Vector2): boolean {
            const hitSize: number = 50 * this.size;

            const vecBetween: Vector2 = new Vector2(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            if (vecBetween.length < hitSize) {

                return true;
            }
            else {

                return false;
            }
        }
    }
}