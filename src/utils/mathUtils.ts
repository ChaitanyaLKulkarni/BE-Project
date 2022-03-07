export function round(num: number, decimalPlaces: number = 2): number {
    var p = Math.pow(10, decimalPlaces);
    var n = num * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
