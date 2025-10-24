"use strict";
var Droid;
(function (Droid) {
    const directions = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    };
    function getCommand(_input) {
        console.log(_input);
        return { module: "Chassis", method: "move", data: directions.forward };
    }
    Droid.getCommand = getCommand;
})(Droid || (Droid = {}));
//# sourceMappingURL=DroidSimpleCommand.js.map