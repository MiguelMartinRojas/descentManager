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
export class ImageSelectorComponent implements OnInit{

    cards : Promise<Array<CardDefinition>> = null;
    type: string = "";
    selectedCardsPromise: Promise<Array<CardDefinition>>;
    selectedCardsMap : Map<number, boolean> = new Map<number, boolean>();
    selectedIndex :number = -1;
    selectSingleCard: string;
    
    constructor(public dialogRef: MdDialogRef<ImageSelectorComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any,) {   
                    this.cards = this.cards || data.cards;
                    this.type = this.type || data.type;
                    this.selectedCardsPromise =  data.selectedCards || Promise.resolve( new Array<CardDefinition>());
                    this.selectSingleCard =   data.selectSingleCard ||  ""

    }

    ngOnInit(){
        this.selectedCardsPromise.then(selectedCards => {
            for(let selectedCard of selectedCards){
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
    })

    }

    selectCard(card: CardDefinition, index: number) {
        
        if(this.selectSingleCard !== ""){
            this.selectSingleCard = card.Url;
            this.dialogRef.close(card.Url);
        }
        
        this.removeCardZoom();
        
        this.selectedCardsPromise.then(selectedCards => {
            let removeCard = selectedCards.findIndex((selectedCard => selectedCard.Id === card.Id));
                if( removeCard !== -1){
                    selectedCards.splice(removeCard, 1);
                    this.selectedCardsMap.delete(index);
                }
                else {
                    let lastCard = selectedCards.pop();
                    selectedCards.push(card);
                    lastCard? selectedCards.push(lastCard): '';
                    this.selectedCardsMap.set(index,true);
                }
        });
    }

    closeDialog() {
        this.removeCardZoom();
        this.dialogRef.close(true);
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
