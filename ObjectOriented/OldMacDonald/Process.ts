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
            new Animal("Cow", "Ingrid", "Moo", "Hay", 3),
            new Animal("Pig", "Gerhard", "Oink", "Carrot", 2),
            new Animal("Chicken", "Robert", "Cluck", "Grain", 1, "Chick"),
            new Animal("Horse", "Charlie", "Neigh", "Banana", 3),
            new Animal("Llama", "Karl", "Scream", "Hay", 2)
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
        console.log(farmer.stock)
        if (currentStep < dailySteps) {
            if (currentStep == 0) {
                console.log(`\n \n----------------Day ${day}----------------\n \n`)
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
}