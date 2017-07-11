import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges, ContentChild, TemplateRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit, OnChanges {
    @Input()
    options: Array<Object> = [];

    @Input('sortBy')
    name = 'name';

    private selectable = true;

    @Input()
    set isSelectable(value: string) {
        this.selectable = value === 'true';
    }

    @Output()
    onSelection = new EventEmitter<Object>();

    @ContentChild(TemplateRef)
    tmpl: TemplateRef<any>;

    data: Array<Object>;
    
    modeAsc: boolean;

    private orderedOptionsAsc: Array<Object> = [];

    private orderedOptionsDesc: Array<Object> = [];

    ngOnInit(): void {
        this.setOrder(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const options = changes['options'];
        if (options && Array.isArray(options.currentValue)) {
            this.prepareData(options.currentValue);
            this.setOrder(this.modeAsc);
        }
    }

    private prepareData(options: Array<Object>): void {
        options = options || [];
        this.orderedOptionsAsc = options.slice().sort((a: any, b: any) => this.sortHandler(a, b));
        this.orderedOptionsDesc = this.orderedOptionsAsc.slice().reverse();
    }

    setOrder(asc: boolean) {
        this.data = asc ? this.orderedOptionsAsc : this.orderedOptionsDesc;
        this.modeAsc = asc;
    }

    private sortHandler(a: any, b: any): number {
        const v1 = a[this.name];
        const v2 = b[this.name];

        if (v1 < v2) {
            return -1;
        }

        if (v1 > v2) {
            return 1;
        }

        return 0;
    }

    filter(term: string) {
        term = term.toLocaleLowerCase();
        const filteredOptions = this.options.filter(x => x[this.name].toLocaleLowerCase().indexOf(term) !== -1);
        this.prepareData(filteredOptions);
        this.setOrder(this.modeAsc);
    }


    selected(item: Object): void {
        this.onSelection.emit(item);
    }
}