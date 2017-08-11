import { Component, ElementRef, OnInit, Input, Inject, QueryList } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'save-button',
    templateUrl: './save.button.component.html',
    styleUrls: ['./save.button.component.css']
})
export class SaveButtonComponent{
    @Input()
    color: string = 'green';

}
