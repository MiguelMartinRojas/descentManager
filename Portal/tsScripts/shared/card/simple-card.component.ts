import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'simple-card',
    templateUrl: './simple-card.component.html'
})
export class SimpleCardComponent {
    @Input()
    title: string;

    @Input()
    description: string;

    @Input()
    avatar: string|boolean;

    @Input()
    icon: string;

    @Input()
    color: string;

    @Output()
    onClick = new EventEmitter<any>();
}