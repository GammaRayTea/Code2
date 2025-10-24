
namespace Droid {
    interface Command {
        module: string,
        method: string,
        data: string
    }
    const directions: { [key: string]: string } = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    }

    export function getCommand(_input: object): Command {
        console.log(_input);
        return { module: "Chassis", method: "move", data: directions.forward };
    }
}