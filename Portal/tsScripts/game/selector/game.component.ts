import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { GameModelDefinition, GamesModelDefinition } from '../../shared/model/game.model';
import { GameService } from '../../shared/services/game/game.service';
import { CardsService } from '../../shared/services/game/cards.service';
import { UserProfileService } from '../../shared/services/authentication/user-profile.service';

import { ImageSelectorComponent } from '../selector/image.selector.component';


@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {

    id: number;
    games: Promise<Array<GameModelDefinition>>;
    game: Promise<GameModelDefinition>;
    constructor(private _gameService: GameService, 
                private _userProfileService: UserProfileService,
                private router: Router,
                private route: ActivatedRoute,
                private _dialog: MdDialog,
                private _cardsService: CardsService) {    }


    ngOnInit() {
    }

    AddSkills () {
      this._dialog.open(ImageSelectorComponent, {
            data: {
                cards: this._cardsService.getObjectsCards()
            },
            height: '432px',
            width: '378px',
            disableClose: true
        }).afterClosed().subscribe((result: boolean) => {
            if(result) {
                //this._modifedTaskService.setTaskChanged(this.taskId);
            }
        });   
    }
}
