namespace Input {
    export interface Action {
        actionName: string,
        key: string
    }

    const registeredActions: Action[] = [];
    const activeActions: Action[] = [];
    let lastActiveActions: Action[] = [];

    export function setup(): void {
        createRegisteredInputList();
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

    }

    function createRegisteredInputList(): void {

        for (const input of inputMap) {
            registeredActions.push(input);
        }
    }

    export function updateBuffer(): void {
        lastActiveActions = activeActions.slice(0, activeActions.length);
    }

    function handleKeyDown(_event: KeyboardEvent): void {
        const foundRegistered: Action | undefined = registeredActions.find((_action) => { return _action.key == _event.key });
        const foundActive: Action | undefined = activeActions.find((_action) => { return _action.key == _event.key })
        //console.log(activeActions.includes(foundRegistered!))
        if (foundRegistered !== undefined && foundActive === undefined) {

            activeActions.push(registeredActions.find(_action => _action.key === _event.key)!);

        }
    }
    function handleKeyUp(_event: KeyboardEvent): void {
        const foundAction: Action | undefined = activeActions.find(_element => _element.key === _event.key)
        if (foundAction !== undefined) {
            activeActions.splice(activeActions.indexOf(foundAction), 1);
        }

    }

    export function isInputJustPressed(_recievedActionName: string): boolean {

        if (activeActions.find(_element => _element.actionName === _recievedActionName) && !lastActiveActions.find(_element => _element.actionName === _recievedActionName)) {

            return true;

        }
        else {

            return false;

        }
    }
    export function isInputJustReleased(_recievedActionName: string): boolean {

        if (!activeActions.find(_element => _element.actionName === _recievedActionName) && lastActiveActions.find(_element => _element.actionName === _recievedActionName)) {

            return true;

        }
        else {

            return false;

        }
    }
    export function isInputPressed(_recievedActionName: string): boolean {
        if (activeActions.find(_element => _element.actionName === _recievedActionName)) {

            return true;

        }
        else {

            return false;

        }
    }
}