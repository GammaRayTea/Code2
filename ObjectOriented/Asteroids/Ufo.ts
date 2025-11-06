namespace Asteroids {
    export class Ufo extends Moveable {
        private static readonly projectileInterval: number = 120;
        private projectileTimer: number = Ufo.projectileInterval;
        public constructor() {
            super();
            //this.position.set(this.spawnPoint);
            
            this.path = ufoPath;
            this.drawOffset.set(30, 20);
            this.velocity.set(10, 0);
            this.position.set(this.makeSpawnPoint());
        }
        public move(_timeslice: number): void {
            if (this.projectileTimer == 0) {
                this.shoot();
                this.projectileTimer = Ufo.projectileInterval;
            }
            else {
                this.projectileTimer--;
            }
            super.move(_timeslice);
        }
        private makeSpawnPoint(): Vector2 {
            const spawnPoint: Vector2 = new Vector2(0, 0);
            const rand: number = randomIntInRange(0, 5);
            switch (rand) {
                case 0: {
                    spawnPoint.y = 0;
                    break;
                }
                case 1: {
                    spawnPoint.y = 60;
                    break;
                }
                case 2: {
                    spawnPoint.y = 120;
                    break;
                }
                case 3: {
                    spawnPoint.y = 180;
                    break;
                }
                case 4: {
                    spawnPoint.y = 240;
                    break;
                }
                case 5: {
                    spawnPoint.y = 360;
                    break;
                }
            }
            if (rand < 3) {
                spawnPoint.x = -20

            }
            else {
                spawnPoint.x = 500;
            }
            return spawnPoint;
        }

        private shoot(): void {
            const customEvent: CustomEvent = new CustomEvent("ufoShoot", { detail: { ufo: this } })
            crc2.canvas.dispatchEvent(customEvent);

        }
    }

}