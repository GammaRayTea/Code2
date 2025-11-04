namespace Asteroids {
    export class Projectile extends Moveable {
        public lifeTime: number = 3;
        public constructor(_position: Vector2, _velocity: Vector2) {

            super(new Vector2(_position));
            this.velocity = new Vector2(_velocity);
            const rand: number = randomNumberInRange(-1, 1);
            console.log(rand);
            this.velocity.rotate(rand);
            this.velocity.scale(4);
            this.path = projectilePath;
        }
        public move(_timeslice: number): void {
            super.move(_timeslice);
            this.lifeTime -= _timeslice;
            if (this.lifeTime <= 0) {
                this.delete();
            }
        }
    }
}