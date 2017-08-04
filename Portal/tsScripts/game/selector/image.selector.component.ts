import { Component, ElementRef, OnInit, Input, Inject } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { CardDefinition } from '../shared/models/card.model';

@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './image.selector.component.html',
    styleUrls: ['./image.selector.component.css']
})
export class ImageSelectorComponent {
    
    cards : Promise<Array<CardDefinition>> = null;

    constructor(public dialogRef: MdDialogRef<ImageSelectorComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any,) {   
                    this.cards = data.cards;

    }

    closeDialog() {
        this.dialogRef.close(true);
    }

}
