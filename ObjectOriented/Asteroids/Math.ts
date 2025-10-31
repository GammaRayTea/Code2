namespace Asteroids {
    export function toDegree(_angleRad: number): number {
        return _angleRad * (Math.PI / 180)
    }
    export function toRadian(_angleDegree: number): number {
        return _angleDegree * (180 / Math.PI)
    }
    export function randomIntInRange(_min: number, _max: number): number {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
}