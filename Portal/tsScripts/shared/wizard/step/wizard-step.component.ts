import { Component, Input } from '@angular/core';
import { WizardComponent } from '../wizard.component';

@Component({
    moduleId: module.id,
    selector: 'wizard-step',
    host: {
        '[class.hidden]': '!isCurrent'
    },
    templateUrl: './wizard-step.component.html'
})
export class WizardStepComponent {
    isCurrent: boolean;
    private step: number;

    constructor(private readonly parent: WizardComponent) {}

    ngOnInit() {
        this.step = this.parent.addStep();

        this.isCurrent = this.step === this.parent.currentStep;

        this.parent.stepChange.subscribe((step: number) => {
            this.isCurrent = this.step === step;
        });
    }
}