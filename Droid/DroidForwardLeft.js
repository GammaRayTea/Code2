//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export var Droid;
(function (Droid) {
    const directions = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    };
    let cycle = false;
    function getCommand(_input) {
        console.log(_input);
        cycle = !cycle;
        if (cycle) {
            return { module: "Chassis", method: "move", data: directions.forward };
        }
        else {
            return { module: "Chassis", method: "move", data: directions.left };
        }
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidForwardLeft.js.map