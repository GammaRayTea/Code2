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
    const path = [directions.forward, directions.left, directions.forward, directions.left, directions.forward, directions.forward, directions.left, directions.forward, directions.forward, directions.left, directions.forward, directions.forward, directions.left, directions.forward, directions.left, directions.forward, directions.stop];
    let stepCounter = 0;
    function getCommand(_state) {
        console.log(_state);
        if (stepCounter < path.length) {
            stepCounter++;
            return { module: "Chassis", method: "move", data: path[stepCounter - 1] };
        }
        else {
            return { module: "Chassis", method: "move", data: directions.stop };
        }
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidFollowPath.js.map