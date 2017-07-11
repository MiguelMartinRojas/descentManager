export function splitCamelCaseString(camelCaseStr: string): string {
    return camelCaseStr.split(/(?=[A-Z])/).join(' ');
}