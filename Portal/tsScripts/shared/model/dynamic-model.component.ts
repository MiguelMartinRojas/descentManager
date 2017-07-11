import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, NgForm } from '@angular/forms';
import { Schema } from './schema';

export const templateMode = 'template';

@Component({
    moduleId: module.id,
    selector: 'dynamic-model',
    templateUrl: 'dynamic-model.component.html'
})
export class DynamicModelComponent implements OnChanges {
    @Input()
    schema: Schema;

    @Input()
    suggestions: Schema;

    @Input()
    value?: any;

    @Input()
    name = 'schema';

    @Input()
    mode: string;

    @Output()
    valueChange = new EventEmitter<any>();

    innerSchema: Schema;

    form = new FormGroup({});

    constructor(@Optional() private readonly parentForm?: NgForm) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['schema']) {

            if (this.schema) {
                const group: any = {};
                const innerSchema = JSON.parse(JSON.stringify(this.schema));

                this.createForm(group, innerSchema);

                this.form = new FormGroup(group);
                this.innerSchema = innerSchema;

                this.form.valueChanges
                    .subscribe((value: any) => {
                        this.valueChange.emit(value);
                    });

                if (this.parentForm) {
                    this.parentForm.form.removeControl(this.name);
                    this.parentForm.form.addControl(this.name, this.form);
                }
            } else {
                this.innerSchema = null;
                this.form = new FormGroup({});
                if (this.parentForm) {
                    this.parentForm.form.removeControl(this.name);
                }
            }

        }

        if (changes['value'] && this.value) {
            this.form.patchValue(this.value);
        }
    }

    private createForm(group: any, schema: Schema, prefix: string = '') {
        Object.keys(schema.properties).forEach(key => {
            const property = schema.properties[key];
            const keyInGroup = prefix ? `${prefix}.${key}` : key;

            if (property.type !== 'object') {
                property.$keyInGroup = keyInGroup;
                group[keyInGroup] = new FormControl('', this.getValidators(key, schema));
            }
        });
    }

    private getValidators(property: string, schema: Schema): Array<ValidatorFn> {
        const validators: any = [];

        if (schema.required.indexOf(property) !== -1) {
            validators.push(Validators.required);
        }

        return validators;
    }

    isTemplateMode(): boolean {
        return !!this.suggestions || this.mode === templateMode;
    }
}