namespace OldMacDonald {
    export class Llama extends Animal {
        public doSpecialAction(_day: number): void {
            if (_day % 3 == 0) {
                console.log(`${this.name} the ${this.species} spat at the farmer.`);
            }
        }
    }
}