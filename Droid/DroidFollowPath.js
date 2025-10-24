//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
import { DroidPathData } from './DroidPathData';
export var Droid;
(function (Droid) {
    Droid.directions = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    };
    let stepCounter = 0;
    function getCommand(_state) {
        console.log(_state);
        if (stepCounter < DroidPathData.path.length) {
            stepCounter++;
            return { module: "Chassis", method: "move", data: DroidPathData.path[stepCounter - 1] };
        }
        else {
            return { module: "Chassis", method: "move", data: Droid.directions.stop };
        }
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidFollowPath.js.map