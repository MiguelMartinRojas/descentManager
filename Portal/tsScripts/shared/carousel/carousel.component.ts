import { Component, ElementRef, OnInit, Input, Renderer, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { CardDefinition } from '../model/card.model';
import { GameService } from '../../shared/services/game/game.service';

class CardComponent {

  @Input('img') data: ElementRef;
}

@Component({
    moduleId: module.id,
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['carousel.component.css']
})
export class CarouselComponent {

    @Input() cards: Array<CardDefinition> = null;
    @ViewChild('figure') figureDom: ElementRef;
    @ViewChildren('mycards') cardsDom: QueryList<any>;

    constructor() {    
    }

    selectedItem: number = -1;

    ngAfterViewChecked() {
        if(this.selectedItem < 0 && this.cardsDom.length){
            this.selectedItem = 0;
        }
        for(let i = 0; i < this.cardsDom.length; i++) {
            let card = this.cardsDom.toArray()[i];
            if(i > 12){
                card.nativeElement.style.display = 'none';
            }
            let rotationPer = this.getRotationPerc(this.cardsDom.length, i);
            card.nativeElement.style.transform = 'rotateY(' + rotationPer  + 'deg)';
        }
    }

    selectCard(index: number){
        if(this.selectedItem === index){
            return;
        }
        let angle = this.getRotationPerc(this.cardsDom.length, index) * -1;
        this.figureDom.nativeElement.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
        this.selectedItem = index;
    }


    private getRotationPerc(size: number, index: number): number {
        if(360/this.cardsDom.length > 40) {
            return 40*index;
        }
        else {
            return (45 * (index))
        }
    }


// let card = this.cardsDom.toArray()[i];
// let scaleValue = this.getScale(this.cardsDom.length, i);
// let percentageValue = this.getPercentage(this.cardsDom.length);
// translateXValue  = this.getTranslateValue(scaleValue, percentageValue);

// card.nativeElement.style = this.getTransformString(scaleValue);
// card.nativeElement.style.maxWidth = percentageValue+'%';
// card.nativeElement.style.position = 'relative';
// card.nativeElement.style.zIndex = this.getZIndex(this.cardsDom.length, i);










    private getTransformString(scale: number): string {

        return  "-webkit-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-moz-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-o-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-ms-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "transform: scale3d("+ scale +", " + scale + ", 1) translate("+scale+"%)";
    }


    private getTranslateValue(scale: number, percentage: number): number {
        if(scale < 1){
            return percentage;
        }
        return 0;
    }
    
    private getScale(size: number, currentIndex : number) : number {
        return (size - Math.abs(this.selectedItem - currentIndex))/size + 0.5;
    }

    private getZIndex(size: number, currentIndex : number) : number {
        return (size - Math.abs(this.selectedItem - currentIndex));
    }

    private getPercentage(size: number) : number  {
        return 100/size;
    }
}
