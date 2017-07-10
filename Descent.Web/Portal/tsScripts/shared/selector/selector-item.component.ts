import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'selector-item',
    template: `
<simple-card mdRipple [title]="title" [description]="description" [avatar]="avatar"></simple-card>
`
})
export class SelectorItemComponent {
    @Input()
    title: string;

    @Input()
    description: string;

    @Input()
    avatar: string;
}