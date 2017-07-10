import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Schema, schemaToProperties } from '../model/schema';
import { splitCamelCaseString } from '../utils/string-utils';

@Component({
    moduleId: module.id,
    selector: 'template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TemplateEditorComponent),
            multi: true
        }
    ]
})
export class TemplateEditorComponent implements ControlValueAccessor {

    @Input()
    set schema(schema: Schema) {
        if (schema) {
            this.properties = schemaToProperties(schema).map(property => {
                return { id: property, label: splitCamelCaseString(property) };
            });
        }
    }

    @Input()
    properties: Array<{ id: string, label: string }> = [];

    @ViewChild('editor', { read: ElementRef })
    editor: ElementRef;

    @ViewChild('viewer', { read: ElementRef })
    viewer: ElementRef;

    set value(value: string) {
        this.innerValue = value;
        this.onChange(value);
        this.onTouched();
    }

    get value() {
        return this.innerValue;
    }

    @Input()
    placeholder: string;

    @Input()
    label: string;

    isEditorVisible = false;

    private innerValue = '';

    private onChange: any = () => {};

    private onTouched: any = () => {};

    addProperty(property: any): void {
        const chip = this.createChip(property);
        this.editor.nativeElement.appendChild(chip);

        this.updateContent((this.value || '') + chip.textContent);
    }

    private createChip(property: any): HTMLSpanElement {
        const element = document.createElement('span');
        element.textContent = `{{${property.id}}}`;

        return element;
    }

    showEditor(): void {
        this.isEditorVisible = true;
        setTimeout(() => {
            this.editor.nativeElement.focus();
        });
    }

    hideEditor(): void {
        this.viewer.nativeElement.style.height = getComputedStyle(this.editor.nativeElement).height;
        this.isEditorVisible = false;
        this.onTouched();
    }

    updateContent(content: string): void {
        this.value = content;
    }

    writeValue(value: any): void {
        if (value) {
            this.value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}