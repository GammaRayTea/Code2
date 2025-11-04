namespace Asteroids {
    export function toDegree(_angleRad: number): number {
        return _angleRad * (180 / Math.PI)
    }
    export function toRadian(_angleDegree: number): number {
        console.log(_angleDegree)
        return _angleDegree * (Math.PI / 180)
    }
    export function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
    export function randomNumberInRange(_min: number, _max: number): number {
        return _min + (_max - _min) * Math.random()
    }
}