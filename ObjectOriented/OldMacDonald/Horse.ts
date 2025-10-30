namespace OldMacDonald {
    export class Horse extends Animal {
        public doSpecialAction(_day: number): void {
            if (_day % 10 == 0) {
                console.log(`${this.name} the ${this.species} jumped over the fence.`);
            }
        }
    }
}