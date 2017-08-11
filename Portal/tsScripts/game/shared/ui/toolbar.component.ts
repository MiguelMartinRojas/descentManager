import { Component, ElementRef, OnInit, Input, Inject, QueryList } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolBarComponent{
    @Input()
    color: string = 'Scout';

}
