namespace OldMacDonald {
    export interface Stock {
        [food: string]: number
    }

    export class Farmer {
        public stock: Stock = {};

        public constructor(_foods: string[]) {
            this.restock(_foods, true);
        }


        public checkStock(_animals: Animal[]): void {
            const emptyFoods: string[] = []
            for (const food in this.stock) {
                let necessaryAmount: number = 0;
                for (const animal of _animals) {
                    if (food == animal.food) {

                        necessaryAmount += animal.dailyConsumption;
                        
                    }
                }


                if (this.stock[food] < necessaryAmount) {
                    emptyFoods.push(food);
                    console.log(`Ran out of ${food}`);
                }
            }
            if (emptyFoods.length > 0) {
                this.restock(emptyFoods);
            }
        }


        public restock(_emptyFoods: string[], _init: boolean = false): void {

            for (const food of _emptyFoods) {
                if (_init) {
                    this.stock[food] = 0
                }
                const newStockAmount: number = randomIntInRange(5, 20);
                this.stock[food] += newStockAmount;
                console.log(`${food} restocked to ${newStockAmount}`);
            }
        }

    }



    function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }

}