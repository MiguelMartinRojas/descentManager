import { Directive } from '@angular/core';

import { WizardComponent } from './wizard.component';


@Directive({
    selector: '[wz-next]',
    host: {
        '(click)': 'doAction()'
    }
})
export class WizardActionNextDirective {
    constructor(private readonly wizard: WizardComponent) {}

    doAction() {
        this.wizard.wzNext();
    }
}

@Directive({
    selector: '[wz-previous]',
    host: {
        '(click)': 'doAction()'
    }
})
export class WizardActionPreviousDirective {
    constructor(private readonly wizard: WizardComponent) { }

    doAction() {
        this.wizard.wzPrevious();
    }
}