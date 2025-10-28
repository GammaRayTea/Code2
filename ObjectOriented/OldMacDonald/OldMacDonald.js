"use strict";
var OldMacDonald;
(function (OldMacDonald) {
    class Animal {
        species;
        name;
        sound;
        food;
        dailyConsumption;
        nickName;
        constructor(_species, _name, _sound, _food, _dailyConsumption, _nickname) {
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
        eat(_stock) {
            if ((_stock[this.food] - this.dailyConsumption) >= 0) {
                _stock[this.food] -= this.dailyConsumption;
            }
            else {
                console.log(_stock[this.food]);
                console.log(`Not enough ${this.food}!`);
            }
            console.log(`
                ${this.name} the ${this.species} ate ${this.food}. \n
                ${this.food} remaining: ${_stock[this.food]}
                `);
        }
        sing() {
            const song = `
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
            const textToDisplay = `${this.name} the ${this.species} ${this.sound}s: \n ${song}`;
            console.log(textToDisplay);
        }
    }
    OldMacDonald.Animal = Animal;
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    class Farmer {
        stock = {};
        constructor(_foods) {
            this.restock(_foods, true);
        }
        checkStock(_animals) {
            const emptyFoods = [];
            for (const food in this.stock) {
                let necessaryAmount = 0;
                for (const animal of _animals) {
                    if (food == animal.food) {
                        necessaryAmount += animal.dailyConsumption;
                        console.log(necessaryAmount, food);
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
        restock(_emptyFoods, _init = false) {
            for (const food of _emptyFoods) {
                if (_init) {
                    this.stock[food] = 0;
                }
                const newStockAmount = randomIntInRange(5, 20);
                this.stock[food] += newStockAmount;
                console.log(`${food} restocked to ${newStockAmount}`);
            }
        }
    }
    OldMacDonald.Farmer = Farmer;
    function randomIntInRange(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    let day = 0;
    let dailySteps = 0;
    let currentStep = 0;
    let animals;
    let farmer;
    addEventListener("load", onLoad);
    function onLoad() {
        setup();
        setInterval(processLoop, 5000);
    }
    function setup() {
        animals = [
            new OldMacDonald.Animal("Cow", "Ingrid", "Moo", "Hay", 3),
            new OldMacDonald.Animal("Pig", "Gerhard", "Oink", "Carrot", 2),
            new OldMacDonald.Animal("Chicken", "Robert", "Cluck", "Grain", 1, "Chick"),
            new OldMacDonald.Animal("Horse", "Charlie", "Neigh", "Banana", 3),
            new OldMacDonald.Animal("Llama", "Karl", "Scream", "Hay", 2)
        ];
        dailySteps = animals.length;
        const foods = [];
        for (const animal of animals) {
            foods.push(animal.food);
        }
        farmer = new OldMacDonald.Farmer(foods);
        farmer.checkStock(animals);
    }
    function processLoop() {
        console.log(farmer.stock);
        if (currentStep < dailySteps) {
            if (currentStep == 0) {
                console.log(`\n \n----------------Day ${day}----------------\n \n`);
            }
            animals[currentStep].eat(farmer.stock);
            animals[currentStep].sing();
            currentStep++;
        }
        else {
            farmer.checkStock(animals);
            currentStep = 0;
            day++;
        }
    }
})(OldMacDonald || (OldMacDonald = {}));
//# sourceMappingURL=OldMacDonald.js.map