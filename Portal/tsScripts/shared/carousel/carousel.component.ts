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
    //@ViewChild('mycards') cardsDom:ElementRef;
    @ViewChildren('img') cardsDom: QueryList<any>;

    constructor() {    

    }

    ngAfterViewInit() {
        debugger;
        console.log(this.cardsDom.toArray);

    }


    ngOnDestroy(){
    }

}
