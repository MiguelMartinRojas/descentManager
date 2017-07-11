import { Pipe, PipeTransform } from '@angular/core';

const chipRegex = /{{\s*([\w\.]+)\s*}}/g;

@Pipe({
    name: 'chipify'
})
export class ChipifyPipe implements PipeTransform {
    transform(value: string, ...args: any[]): any {
        let result = value || '';
        let match: RegExpExecArray;
        const suggestions: string[] = args[0] || [];

        while ((match = chipRegex.exec(value)) !== null) {
            if (match.index === chipRegex.lastIndex) {
                chipRegex.lastIndex++;
            }

            const replaceRegex = new RegExp(match[0], 'g');
            const verifiedChip = suggestions.find((x: any) => x.id === match[1]);
            result = result.replace(replaceRegex, `<div class="chip ${verifiedChip ? 'verified' : ''}">${match[1]}</div>`);
        }

        return result;
    }
}