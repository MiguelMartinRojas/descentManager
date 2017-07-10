import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Schema } from '../schema';
import { splitCamelCaseString } from '../../utils/string-utils';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'dynamic-item',
    templateUrl: 'dynamic-item.component.html'
})
export class DynamicItemComponent {
    @Input()
    schema: Schema;

    @Input()
    form: FormGroup;

    isRequired(propertyName: string): boolean {
        return this.schema.required.indexOf(propertyName) !== -1;
    }

    splitWords(str: string) : string {
        return splitCamelCaseString(str);
    }

}