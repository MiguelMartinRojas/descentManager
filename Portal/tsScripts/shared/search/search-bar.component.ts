import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    moduleId: module.id,
    selector: 'search-bar',
    template: `
<md-input-container fxLayout="row">
    <input mdInput placeholder="Search..." (keyup)="search(searchBox.value)" #searchBox>
</md-input-container>
`
})
export class SearchBarComponent implements OnInit {

    @Input()
    delay = 300;

    @Output()
    onSearch = new EventEmitter<string>();

    private searchTerms = new Subject<string>();

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.searchTerms
            .debounceTime(this.delay)
            .distinctUntilChanged()
            .subscribe((term: string) => { this.onSearch.emit(term) });
    }
}