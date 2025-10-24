//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
import {DroidPathData} from './DroidPathData';
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


    let stepCounter:number = 0;
    
    export function getCommand(_state: object): Command {
        console.log(_state);
        
        if (stepCounter < DroidPathData.path.length) {
            stepCounter++;
            return { module: "Chassis", method: "move", data: DroidPathData.path[stepCounter-1] };
            
        }
        else {
            
            return { module: "Chassis", method: "move", data: directions.stop};
        }



    }
}