export function isObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
}

export function isEmptyObject(obj: Object): boolean {
    return !obj || Object.keys(obj).length === 0 && obj.constructor === Object;
}