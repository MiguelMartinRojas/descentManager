import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { ImageSelectorComponent } from './shared/selector/image.selector.component';
import { CardsService } from './shared/services/cards.service';
import { GameService } from './shared/services/game.service';
import { GameModelDefinition } from './shared/models/game.model';
import { ProfileDefinition } from './shared/models/profile.model';
import { AuthService } from './shared/services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './game.component.html',
})
export class GameComponent {
    game : Promise<GameModelDefinition>
    id: number;    
    _profile: Promise<ProfileDefinition>; 
    
    constructor(private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _gameService: GameService,
                private _authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
        this._profile = this._authService.getProfile();
        this.id = this.route.snapshot.params['id'];
        this._profile.then((profile:ProfileDefinition) =>{
        
            if(this.id){
                    this.game = this._gameService.getGameById(profile.Email, +this.id);
            }
            else{
                this.game = _gameService.createNewGame(profile.Email);
            }
        })
        
    }
    
    character: string;

    classes: Array<string> = new Array('Disciple', 'SpiritSpeaker')
    selectedClass: string;

    selectCharacter () {
        this.game.then( game => {
            this._dialog.open(ImageSelectorComponent, {
                    data: {
                        cards: this._cardsService.getCharactersCards(),
                        selectSingleCard: game.CharacterImage
                    },
                    height: '432px',
                    width: '378px'
                }).afterClosed().subscribe((result: any) => {
                    if(result && result !== "") {
                        game.CharacterImage = result;
                    }
                });   
            })
    }

    addUsers(){}

}
