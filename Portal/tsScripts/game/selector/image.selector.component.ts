import { Component, ElementRef, OnInit, Input, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
    selectedCards: Array<number> = [];
    selectedIndex :number = -1;
    constructor(public dialogRef: MdDialogRef<ImageSelectorComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any,) {   
                    this.cards = data.cards;

    }

    selectCard(i: number) {
        let removeCard = this.selectedCards.find((index => index == i));

        if( removeCard !== undefined){
            this.selectedCards.splice(i);
        }
        else{
            this.selectedCards.push(i);
        }
    }

    closeDialog() {
        this.dialogRef.close(true);
    }

    zoomCard(eventType: string, index: number) {
        this.selectedIndex = (this.selectedIndex == index)? -1 : index;
    }

    isCardSelected (index: number): boolean{
        let findCard =  this.selectedCards.find((card => card === index));
        return findCard || findCard === 0? true:false;
    }

}
