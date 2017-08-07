import { Component, ElementRef, OnInit, Input, Renderer, ViewChild, ViewChildren, QueryList, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';

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

    @Input() cards: Array<any> = null;
    @Input() window: number = 5;
    @Output() selectedItemChanged = new EventEmitter<Array<number>>();
    @ViewChild('carousel') figureDom: ElementRef;
    @ViewChildren('mycards') cardsDom: QueryList<ElementRef>;

    constructor() {    
    }

    selectedItem: number = -1;

    ngAfterViewChecked() {
        if(this.selectedItem < 0 && this.cardsDom.length){
            this.selectedItem = 0;
        }
        for(let i = 0; i < this.cardsDom.length; i++) {
            let card = this.cardsDom.toArray()[i];
            let scaleValue = this.getScale(this.cardsDom.length, i);
            let percentageValue = this.getPercentage();

            card.nativeElement.style = this.getTransformString(scaleValue, (this.cardsDom.length/i)>2?'':'-');
            card.nativeElement.style.maxWidth = percentageValue+'%';
            card.nativeElement.style.zIndex = this.getZIndex(this.cardsDom.length, i);
            this.hideElementsOutOfWindow(this.cardsDom.length, i, card);
        }


    }

    selectCard(index: number){
        this.selectedItem = index;
        this.selectedItemChanged.emit([this.selectedItem, this.cards.length]);
    }



    private hideElementsOutOfWindow(size: number, index: number, card: ElementRef)  {
        let leftDistance = this.selectedItem,
            rightDistance = size - this.selectedItem;

        if (index <= this.selectedItem - this.window/2 && Math.abs(index - this.selectedItem) > this.window - rightDistance){
            card.nativeElement.style.transform = 'translateX(-1000px)';
            card.nativeElement.style.maxWidth = '0';
        }
        else if (index >=  this.selectedItem + this.window/2 && Math.abs(index - this.selectedItem) >= this.window - leftDistance){
            card.nativeElement.style.transform = 'translateX(1000px)';
            card.nativeElement.style.maxWidth = '0';
        }
    }

    private getTransformString(scale: number, sign: string): string {
        
        return  "-webkit-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-moz-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-o-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "-ms-transform: scale3d("+ scale +", " + scale + ", 1); " +
                "transform: scale3d("+ scale +", " + scale + ", 1)";
    }


    private getTranslateValue(scale: number, percentage: number): number {
        if(scale < 1){
            return percentage;
        }
        return 0;
    }
    
    private getScale(size: number, currentIndex : number) : number {
        let scale = (size - Math.abs(this.selectedItem - currentIndex))/size + 0.5;
        return scale<1?1:scale;
    }

    private getZIndex(size: number, currentIndex : number) : number {
        return (size - Math.abs(this.selectedItem - currentIndex));
    }

    private getPercentage() : number  {
        return 100/this.window;
    }
}
