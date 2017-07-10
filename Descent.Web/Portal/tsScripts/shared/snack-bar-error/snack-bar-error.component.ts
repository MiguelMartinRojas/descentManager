import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'snack-bar-error',
    templateUrl: './snack-bar-error.component.html',
    styleUrls: ['./snack-bar-error.component.css'],
})
export class SnackBarErrorComponent {
    message: String;
    showIcon: boolean = true;
}