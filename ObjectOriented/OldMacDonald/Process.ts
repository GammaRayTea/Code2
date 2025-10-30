namespace OldMacDonald {
    let day: number = 0;
    let dailySteps: number = 0;
    let currentStep: number = 0;
    let animals: Animal[];
    let farmer: Farmer;
    addEventListener("load", onLoad);

    function onLoad(): void {
        setup();
        setInterval(processLoop, 5000);
    }


    function setup(): void {
        animals = [
            new Cow("Cow", "Ingrid", "Moo", "Hay", 3),
            new Pig("Pig", "Gerhard", "Oink", "Carrot", 2),
            new Chicken("Chicken", "Robert", "Cluck", "Grain", 1, "Chick"),
            new Horse("Horse", "Charlie", "Neigh", "Banana", 3),
            new Llama("Llama", "Karl", "Scream", "Hay", 2)
        ]
        dailySteps = animals.length;

        const foods: string[] = [];
        for (const animal of animals) {
            foods.push(animal.food);
        }
        farmer = new Farmer(foods);
        farmer.checkStock(animals);
    }




    function processLoop(): void {
        if (currentStep < dailySteps) {
            if (currentStep == 0) {
                console.log(`\n \n----------------Day ${day}----------------\n \n`);
            }
            animals[currentStep].eat(farmer.stock);
            animals[currentStep].sing();
            (animals[currentStep]).doSpecialAction(day) ;
            currentStep++;

        }
        else {
            farmer.checkStock(animals);
            currentStep = 0;
            day++;
        }
    }
}