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
    let leftCounter = 0;
    let hitWall;
    function getCommand(_state) {
        console.log(_state);
        hitWall = checkState(_state);
        if (leftCounter < 5 && !hitWall) {
            leftCounter++;
            return { module: "Chassis", method: "move", data: "" };
        }
        else {
            return { module: "Chassis", method: "move", data: directions.stop };
        }
    }
    Droid.getCommand = getCommand;
    function checkState(_state) {
        console.log(_state);
        return false;
    }
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidFollowPathSmart.js.map