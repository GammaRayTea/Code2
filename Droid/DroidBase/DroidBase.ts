
 export namespace DroidBase {

    export interface Command {
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
}
