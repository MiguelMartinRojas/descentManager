import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Schema } from '../schema';
import { splitCamelCaseString } from '../../utils/string-utils';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'dynamic-template-item',
    templateUrl: 'dynamic-template-item.component.html'
})
export class DynamicTemplateItemComponent {
    @Input()
    schema: Schema;

    @Input()
    templateSchema: Schema;

    @Input()
    form: FormGroup;

    isRequired(propertyName: string): boolean {
        return this.schema.required.indexOf(propertyName) !== -1;
    }

    splitWords(str: string) : string {
        return splitCamelCaseString(str);
    }

}