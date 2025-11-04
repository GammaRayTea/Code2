namespace Asteroids {
    export class Ship extends Moveable {
        
        private static readonly maxThrust: number = 2;
        private static readonly maxSpeed: number = 100;
        private thrust: number = 0

        public constructor(_position: Vector2 = new Vector2(240, 180)) {
            super(_position);
            this.scale.set(0.6,0.6);
            this.path = shipPath;
            this.drawOffset.set(-1,-1.5);

        }


        protected get drawLineStrength(): number {
            return 2;
        }


        public move(_timeslice: number): void {
            this.capSpeed();
            const acceleration: Vector2 = new Vector2(this.thrust, 0);
            acceleration.rotate(this.rotation);
            this.velocity.add(acceleration);
            super.move(_timeslice);
            

        }


        public isHit(_hotspot: Vector2): boolean {
            const hitSize: number = 20;
            const vecBetween: Vector2 = new Vector2(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            if (vecBetween.length < hitSize) {
                return true;
            }
            else {
                return false;
            }
        }


        public accelerate(): void {
            if (this.thrust < Ship.maxThrust) {
                this.thrust += 1;
            }

        }


        private capSpeed(): void {
            if (this.thrust > 0) {
                this.thrust -= 0.2;
                if (this.thrust < 0) {
                    this.thrust = 0;
                }
            }
            if (this.velocity.length > Ship.maxSpeed) {
                this.velocity.length = Ship.maxSpeed;
            }


        }

    }
}