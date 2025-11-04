namespace Asteroids {
    export class Projectile extends Moveable {
        private lifeTime: number = 3;
        public constructor(_position: Vector2, _velocity: Vector2) {

            super(new Vector2(_position));
            this.velocity = _velocity;
            this.velocity.normalise();
            const rand: number = randomNumberInRange(-20, 20);
            console.log(rand);
            this.velocity.rotate(rand);
            this.velocity.scale(100);
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