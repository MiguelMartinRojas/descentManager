import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { GameModelDefinition, GamesModelDefinition } from '../shared/models/game.model';
import { ProfileDefinition } from '../shared/models/profile.model';
import { GameService } from '../shared/services/game.service';
import { CardsService } from '../shared/services/cards.service';
import { AuthService } from '../shared/services/auth.service';

import { ImageSelectorComponent } from '../selector/image.selector.component';


@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {

    _profile: Promise<ProfileDefinition>; 
    id: number;
    games: Promise<GamesModelDefinition>;
    game: Promise<GameModelDefinition>;


    constructor(private _gameService: GameService, 
                private router: Router,
                private route: ActivatedRoute,
                private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _authService: AuthService) {    }


    ngOnInit() {
        this._profile = this._authService.getProfile();
        this.id = this.route.snapshot.params['id'];
        this._profile.then((profile:ProfileDefinition)=>{
            this.games = this._gameService.getGames(profile.Email);
            this.game = this._gameService.getGameById(profile.Email, +this.id);
        })
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
