namespace OldMacDonald {
    export class Chicken extends Animal {
        public doSpecialAction(_day: number): void {
            if (_day % 1 == 0) {
                console.log(`${this.name} the ${this.species} layed an egg.`);
            }
        }
    }
}