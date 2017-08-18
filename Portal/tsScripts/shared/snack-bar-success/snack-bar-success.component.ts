import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'snack-bar-success',
    templateUrl: './snack-bar-success.component.html',
    styleUrls: ['./snack-bar-success.component.css'],
})
export class SnackBarSuccessComponent {
    message: String;
    showIcon: boolean = true;
}