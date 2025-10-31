namespace Asteroids {
    export class Projectile extends Moveable {
        public lifeTime: number = 3;
        public constructor(_position: Vector2, _velocity: Vector2) {
            super(_position.copy());
            this.velocity = _velocity.copy();
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