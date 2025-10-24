//import { Command } from './DroidBase';
//import { directions } from './DroidBase';
export namespace Droid {

    interface Command {
        module: string,
        method: string,
        data: string
    }
    const directions: string[] = [

        "forward",
        "back",
        "left",
        "right",
        "stop",
    ]

    export function getCommand(_input: object): Command {

        const randomNumber: number = Math.floor(Math.random() * directions.length)
        console.log(randomNumber)
        return { module: "Chassis", method: "move", data: directions[randomNumber] };


    }
}