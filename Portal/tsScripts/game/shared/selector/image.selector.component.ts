import { Component, ElementRef, OnInit, Input, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { CardDefinition } from '../models/card.model';

declare global {
    interface Window { initLongPress: any; }
}
window.initLongPress = window.initLongPress || {};

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
    @ViewChildren('allcards') cardsDom: QueryList<ElementRef>;
    
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
                        if(selectedCard.Url === card.Url){
                                this.selectedCardsMap.set(j,true);
                        }
                        j++;
                    }
                })
            }
        }
    }

    ngAfterViewChecked() {
        this.fixLongPress();
    }

    selectCard(event: any, card: CardDefinition, index: number) {
        if(event.tapCount !== 1) {
            return false;
        }
        if(this.selectSingleCard){
            this.dialogRef.close(card.Url);
        }
        
        this.removeCardZoom();
        
        if(this.selectedCards) {
            let removeCard = this.selectedCards.findIndex((selectedCard => selectedCard.Url === card.Url));
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

    fixLongPress() {
        if(this.cardsDom.length)
        {       
            this.cardsDom.forEach(card => {
                window.initLongPress(card.nativeElement)
            });    
        } 
    }

    closeDialog() {
        this.removeCardZoom();
        this.dialogRef.close();
    }

    zoomCard(event: any, index: number) {
        //if(event.tapCount === 2) {
            this.selectedIndex = (this.selectedIndex == index)? -1 : index;
        //}
    }

    isCardSelected (index: number): boolean {
        return this.selectedCardsMap.get(index);
        
    }
    removeCardZoom(){
        this.selectedIndex = -1;
    }

}
