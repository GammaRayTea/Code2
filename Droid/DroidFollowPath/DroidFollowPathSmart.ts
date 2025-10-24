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


    let leftCounter:number = 0;
    let hitWall:boolean
    export function getCommand(_state: object): Command {
        console.log(_state);
        hitWall = checkState(_state);
        
        if (leftCounter <5 &&  !hitWall) {
            leftCounter++;
            return { module: "Chassis", method: "move", data: ""};
            
        }
        else {
            
            return { module: "Chassis", method: "move", data: directions.stop};
        }



    }
    function checkState(_state:object) :boolean{
        console.log(_state);
        return false
    }
}