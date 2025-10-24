//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export namespace Droid {
    
    interface Command {
        module: string,
        method: string,
        data: string
    }
    export const directions: { [key: string]: string } = {
        forward: "forward",
        backward: "backward",
        left: "left",
        right: "right",
        stop: "stop",
    }


    let cycle: boolean = false


    export function getCommand(_input: object): Command {
        console.log(_input);
        cycle = !cycle
        if (cycle) {
            return { module: "Chassis", method: "move", data: directions.forward };
        }
        else {
            return { module: "Chassis", method: "move", data: directions.left };

        }

    }
}