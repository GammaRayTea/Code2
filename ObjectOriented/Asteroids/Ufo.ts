namespace Asteroids {
    export class Ufo extends Moveable {
        public projectileTimer: number = 60;
        public constructor() {
            super();
            this.velocity.set(10, 10);
            this.path = ufoPath;
            this.drawOffset.set(30, 20);

        }
    }

}