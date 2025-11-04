namespace Asteroids {
    export class Ufo extends Moveable {
        public projectileTimer: number = 60;
        public constructor() {
            super();
            //this.position.set(this.spawnPoint);
            this.velocity.set(10, 10);
            this.path = ufoPath;
            this.drawOffset.set(30, 20);
        }
        // private get spawnPoint(): Vector2 {
        //     const spawnHeight: number = randomIntInRange(20, crc2.canvas.height - 20);

        //     switch (randomIntInRange(0, 1)) {
        //         case 0: {

        //             break;
        //         }
        //         case 1: {

        //             break;
        //         }
        //     }
        //     const spawnPoint: Vector2 = new Vector2(0, spawnHeight);
        // }
        public move(_timeslice: number): void {
            if (this.projectileTimer == 0) {
                this.shoot();
                this.projectileTimer = 60;
            }
            else {
                this.projectileTimer--;
            }


            super.move(_timeslice);
        }

        private shoot(): void {
            const customEvent: CustomEvent = new CustomEvent("ufoShoot", { detail: { ufo: this } })
            crc2.canvas.dispatchEvent(customEvent);
            
        }
    }

}