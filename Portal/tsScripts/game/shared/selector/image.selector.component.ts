import { Component, ElementRef, OnInit, Input, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { CardDefinition } from '../models/card.model';

@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './image.selector.component.html',
    styleUrls: ['./image.selector.component.css']
})
export class ImageSelectorComponent implements OnInit{
    color: string = 'Healer';
    cards : Promise<Array<CardDefinition>> = null;
    type: string = "";
    selectedCards: Array<CardDefinition>;
    selectedCardsMap : Map<number, boolean> = new Map<number, boolean>();
    selectedIndex :number = -1;
    selectSingleCard: string;
    
    constructor(public dialogRef: MdDialogRef<ImageSelectorComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any,) {   
                    this.color = this.color || data.color;
                    this.cards = this.cards || data.cards;
                    this.type = this.type || data.type;
                    this.selectedCards =  data.selectedCards || Array<CardDefinition>();
                    this.selectSingleCard =   data.selectSingleCard ||  false

    }

    ngOnInit(){
        if (this.selectedCards) {
            for(let selectedCard of this.selectedCards){
                this.cards.then(allCards => {
                    let j = 0;
                    for(let card of allCards){
                        if(selectedCard.Id === card.Id){
                                this.selectedCardsMap.set(j,true);
                        }
                        j++;
                    }
                })
            }
        }

    }

    selectCard(card: CardDefinition, index: number) {
        
        if(this.selectSingleCard){
            this.dialogRef.close(card.Url);
        }
        
        this.removeCardZoom();
        
        if(this.selectedCards) {
            let removeCard = this.selectedCards.findIndex((selectedCard => selectedCard.Id === card.Id));
                if( removeCard !== -1){
                    this.selectedCards.splice(removeCard, 1);
                    this.selectedCardsMap.delete(index);
                }
                else {
                    let lastCard = this.selectedCards.pop();
                    this.selectedCards.push(card);
                    lastCard? this.selectedCards.push(lastCard): '';
                    this.selectedCardsMap.set(index,true);
                }
        };
    }

    closeDialog() {
        this.removeCardZoom();
        this.dialogRef.close();
    }

    zoomCard(eventType: string, index: number) {
        this.selectedIndex = (this.selectedIndex == index)? -1 : index;
    }

    isCardSelected (index: number): boolean {
        return this.selectedCardsMap.get(index);
        
    }
    removeCardZoom(){
        this.selectedIndex = -1;
    }

}
