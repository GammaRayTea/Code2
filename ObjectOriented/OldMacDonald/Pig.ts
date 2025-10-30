namespace OldMacDonald {
    export class Pig extends Animal {
        public doSpecialAction(_day: number): void {
            if (_day % 5 == 0) {
                console.log(`${this.name} the ${this.species} covered itself in mud.`);
            }
        }
    }
}