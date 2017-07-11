import { Component } from '@angular/core';

import { WizardComponent } from '../wizard.component';

@Component({
    moduleId: module.id,
    selector: 'wizard-progress',
    templateUrl: './wizard-progress.component.html',
    styleUrls: ['./wizard-progress.component.css']
})
export class WizardProgressComponent {
    constructor(public wizard: WizardComponent) { }
}