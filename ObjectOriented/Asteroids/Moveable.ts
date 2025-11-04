namespace Asteroids {
    export abstract class Moveable {
        public readonly position: Vector2 = new Vector2(0, 0);
        public velocity: Vector2 = new Vector2(0, 0);
        public readonly scale: Vector2 = new Vector2(1, 1);
        public rotation: number = 0;
        public path?: Path2D;
        public deletionQueued: boolean = false;
        protected readonly drawOffset: Vector2 = new Vector2(0, 0);
        public constructor(_position?: Vector2) {
            if (_position) {
                this.position = new Vector2(_position);
            }
        }


        protected get drawLineStrength(): number {
            return 1
        }

        public drawCenter(): void {
            this.path!.rect(this.drawOffset.x, this.drawOffset.y, 3, 3);
        }

        public move(_timeslice: number): void {
            const offset: Vector2 = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < -50) {
                this.position.x += crc2.canvas.width + 50;
                //console.log("wrapped x");
            }
            if (this.position.x > crc2.canvas.width + 50) {
                this.position.x -= crc2.canvas.width + 50;
                //console.log("wrapped x");
            }
            if (this.position.y < -50) {
                this.position.y += crc2.canvas.height + 50;
                //console.log("wrapped y");
            }
            if (this.position.y > crc2.canvas.height + 50) {
                this.position.y -= crc2.canvas.height + 50;
                //console.log("wrapped y");
            }

        }


        public draw(): void {
            crc2.save();
            crc2.strokeStyle = "white";
            crc2.lineWidth = this.drawLineStrength;;
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.scale.x, this.scale.y);
            crc2.translate(-this.drawOffset.x, -this.drawOffset.y);
            crc2.rotate(toRadian(this.rotation));
            crc2.stroke(this.path!);
            crc2.restore();
        }
        public delete(): void {
            this.deletionQueued = true;
        }


    }
}