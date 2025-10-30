

namespace OldMacDonald {

    export class Animal {
        public species: string;
        public name: string;
        public sound: string;
        public food: string;
        public dailyConsumption: number;
        public nickName: string;

        public constructor(_species: string, _name: string, _sound: string, _food: string, _dailyConsumption: number, _nickname?: string) {
            this.species = _species;
            this.name = _name;
            this.sound = _sound;
            this.food = _food;
            this.dailyConsumption = _dailyConsumption;
            if (_nickname != undefined) {
                this.nickName = _nickname;
            }
            else {
                this.nickName = this.name;
            }

        }
        public eat(_stock: Stock): void {
            if ((_stock[this.food]-this.dailyConsumption) >= 0) {
                _stock[this.food]-=this.dailyConsumption;
            }
            else {
                
                console.log(`Not enough ${this.food}!`);
            }
            
            console.log(`
                ${this.name} the ${this.species} ate ${this.food}. \n
                ${this.food} remaining: ${_stock[this.food]}
                `);
        }
        public sing(): void {

            const song: string = `
                Old MacDonald had a farm,\n
                Ee i ee i oh!\n
                And on his farm he had some ${this.name}s,\n
                Ee i ee i oh!\n
                With a ${this.sound} - ${this.sound} here,\n
                And a ${this.sound} - ${this.sound} there\n
                Here a ${this.sound}, there a ${this.sound},\n
                Everywhere a ${this.sound} - ${this.sound}\n
                Old MacDonald had a farm\n
                Ee i ee i oh!
                `;

            const textToDisplay: string =
                `${this.name} the ${this.species} ${this.sound}s: \n ${song}`;
            console.log(textToDisplay);
        }
        public doSpecialAction(_day:number):void{

        }
    }
}
