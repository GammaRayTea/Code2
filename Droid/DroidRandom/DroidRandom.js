//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export var Droid;
(function (Droid) {
    const directions = [
        "forward",
        "back",
        "left",
        "right",
        "stop",
    ];
    function getCommand(_input) {
        const randomNumber = Math.floor(Math.random() * directions.length);
        console.log(randomNumber);
        return { module: "Chassis", method: "move", data: directions[randomNumber] };
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidRandom.js.map