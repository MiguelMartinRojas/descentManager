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
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    @Input() cards: Array<any> = null;
    @Input() window: number = 5;
    @Output() selectedItemChanged = new EventEmitter<Array<number>>();
    @ViewChild('carousel') figureDom: ElementRef;
    @ViewChildren('mycards') cardsDom: QueryList<ElementRef>;

    constructor() {    
    }
    selectedItem: number = -1;

    ngAfterViewChecked() {
        
        if((this.selectedItem < 0 && this.cardsDom.length)|| this.cardsDom.length === 1){
            this.selectedItem = 0;
        }
        for(let i = 0; i < this.cardsDom.length; i++) {
            let card = this.cardsDom.toArray()[i];
            let scaleValue = this.getScale(this.cardsDom.length, i);
            let percentageValue = this.getPercentage();

            card.nativeElement.style = this.getTransformString(scaleValue);
            card.nativeElement.style.maxWidth = percentageValue+'%';
            card.nativeElement.style.zIndex = this.getZIndex(this.cardsDom.length, i);
            this.hideElementsOutOfWindow(this.cardsDom.length, i, card);
        }


    }

    selectCard(event: any,index: number){
        if( event.tapCount === 1) {
            this.unZoomCards();
            this.emitSelectedCard(index)
        }
    }

    emitSelectedCard(index: number){
        this.selectedItem = index;
        this.selectedItemChanged.emit([this.selectedItem, this.cards.length]);
    }

    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        // out of range
        if (currentIndex > this.cardsDom.length || currentIndex < 0) return;

        this.unZoomCards();

        let nextIndex = 0;
        if (action === this.SWIPE_ACTION.LEFT) {
            const isLast = currentIndex === this.cardsDom.length - 1;
            nextIndex = isLast ? this.cardsDom.length - 1 : currentIndex + 1;
        }

        if (action === this.SWIPE_ACTION.RIGHT) {
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? 0 : currentIndex - 1;
        }

        this.selectedItem = nextIndex;
    }

    zoomCard(event: any, index: number) {
        this.unZoomCards();
        if(event.tapCount >= 2) {
            this.emitSelectedCard(index);
            let card = this.cardsDom.toArray()[index];
            card.nativeElement.className += 'zoom';
            return true;
        }
        return false;
    }

    unZoomCards() {
        this.cardsDom.toArray().forEach( card => {
            card.nativeElement.className = '';
        });
    }


    private hideElementsOutOfWindow(size: number, index: number, card: ElementRef)  {
        let leftDistance = this.selectedItem,
            rightDistance = size - this.selectedItem;
            card.nativeElement.style.opacity = '1';

        if (index <= this.selectedItem - this.window/2 && Math.abs(index - this.selectedItem) > this.window - rightDistance){
            card.nativeElement.style.opacity = '0';
            card.nativeElement.style.maxWidth = '0';
        }
        else if (index >=  this.selectedItem + this.window/2 && Math.abs(index - this.selectedItem) >= this.window - leftDistance){
            card.nativeElement.style.opacity = '0';
            card.nativeElement.style.maxWidth = '0';
        }
    }

    private getTransformString(scale: number): string {
        
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
