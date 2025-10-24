//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export var Droid;
(function (Droid) {
    Droid.directions = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    };
    const path = [Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.left, Droid.directions.forward, Droid.directions.stop];
    let stepCounter = 0;
    function getCommand(_state) {
        console.log(_state);
        if (stepCounter < path.length) {
            stepCounter++;
            return { module: "Chassis", method: "move", data: path[stepCounter - 1] };
        }
        else {
            return { module: "Chassis", method: "move", data: Droid.directions.stop };
        }
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidFollowPath.js.map