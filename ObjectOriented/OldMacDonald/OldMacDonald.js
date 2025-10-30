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
        doSpecialAction(_day) {
        }
    }
    OldMacDonald.Animal = Animal;
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    class Chicken extends OldMacDonald.Animal {
        doSpecialAction(_day) {
            if (_day % 1 == 0) {
                console.log(`${this.name} the ${this.species} layed an egg.`);
            }
        }
    }
    OldMacDonald.Chicken = Chicken;
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    class Cow extends OldMacDonald.Animal {
        doSpecialAction(_day) {
            if (_day % 4 == 0) {
                console.log(`${this.name} the ${this.species} produced milk.`);
            }
        }
    }
    OldMacDonald.Cow = Cow;
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
    class Horse extends OldMacDonald.Animal {
        doSpecialAction(_day) {
            if (_day % 10 == 0) {
                console.log(`${this.name} the ${this.species} jumped over the fence.`);
            }
        }
    }
    OldMacDonald.Horse = Horse;
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    class Llama extends OldMacDonald.Animal {
        doSpecialAction(_day) {
            if (_day % 3 == 0) {
                console.log(`${this.name} the ${this.species} spat at the farmer.`);
            }
        }
    }
    OldMacDonald.Llama = Llama;
})(OldMacDonald || (OldMacDonald = {}));
var OldMacDonald;
(function (OldMacDonald) {
    class Pig extends OldMacDonald.Animal {
        doSpecialAction(_day) {
            if (_day % 5 == 0) {
                console.log(`${this.name} the ${this.species} covered itself in mud.`);
            }
        }
    }
    OldMacDonald.Pig = Pig;
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
            new OldMacDonald.Cow("Cow", "Ingrid", "Moo", "Hay", 3),
            new OldMacDonald.Pig("Pig", "Gerhard", "Oink", "Carrot", 2),
            new OldMacDonald.Chicken("Chicken", "Robert", "Cluck", "Grain", 1, "Chick"),
            new OldMacDonald.Horse("Horse", "Charlie", "Neigh", "Banana", 3),
            new OldMacDonald.Llama("Llama", "Karl", "Scream", "Hay", 2)
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
        if (currentStep < dailySteps) {
            if (currentStep == 0) {
                console.log(`\n \n----------------Day ${day}----------------\n \n`);
            }
            animals[currentStep].eat(farmer.stock);
            animals[currentStep].sing();
            (animals[currentStep]).doSpecialAction(day);
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