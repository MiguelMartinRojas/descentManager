import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {  
    private currentTimeout: any;
    
    isDelayedRunning: boolean = false;

    @Input()
     delay: number = 300;

    @Input()
    set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}