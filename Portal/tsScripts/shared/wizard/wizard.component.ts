import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'wizard',
    styleUrls: ['./wizard.component.css'],
    templateUrl: './wizard.component.html'
})
export class WizardComponent {
    @Output()
    stepChange = new EventEmitter<number>();

    @Input()
    set step(step: number) {
        if (typeof step === 'number') {
            this.currentStep = step;
        }
    }

    currentStep = 1;

    @Output()
    finish = new EventEmitter<number>();

    steps = 0;

    isOnFinalStep = () => this.currentStep === this.steps;

    isOnFirstStep = () => this.currentStep === 1;

    private nextStep() {
        this.stepChange.emit(++this.currentStep);
    }

    private previousStep() {
        this.stepChange.emit(--this.currentStep);
    }

    private finishWizard() {
        this.finish.emit();
    }

    addStep() {
        const newSteps = this.steps + 1;

        this.steps = newSteps;

        return newSteps;
    }

    wzNext() {
        if (!this.isOnFinalStep()) {
            this.nextStep();
        } else {
            this.finishWizard();
        }
    }

    wzPrevious() {
        if (!this.isOnFirstStep()) {
            this.previousStep();
        }
    }
}