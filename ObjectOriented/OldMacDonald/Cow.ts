namespace OldMacDonald {
    export class Cow extends Animal {
        public doSpecialAction(_day: number): void {
            if (_day % 4 == 0) {
                console.log(`${this.name} the ${this.species} produced milk.`);
            }
        }
    }
}