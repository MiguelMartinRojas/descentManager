import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'custom-card',
    templateUrl: './custom-card.component.html',
    styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent {
    @Input()
    title: string;

    @Input()
    contentClass: string = 'custom-card-content-container';

    @Output()
    onClick = new EventEmitter<any>();
}