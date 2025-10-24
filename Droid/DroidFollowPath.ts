//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export namespace Droid {

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


    const path: string[] = [directions.forward, directions.left, directions.forward, directions.left, directions.forward, directions.forward, directions.left,directions.forward, directions.forward,directions.left,directions.forward, directions.forward,directions.left,directions.forward,directions.left,directions.forward,directions.stop]
    let stepCounter:number = 0;
    
    export function getCommand(_state: object): Command {
        console.log(_state);
        
        if (stepCounter < path.length) {
            stepCounter++;
            return { module: "Chassis", method: "move", data: path[stepCounter-1] };
            
        }
        else {
            
            return { module: "Chassis", method: "move", data: directions.stop};
        }



    }
}