import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Subscription }   from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params, NavigationEnd, NavigationStart } from '@angular/router';

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
    
    game: Promise<GameModelDefinition>
    id: number;    
    _profile: Promise<ProfileDefinition>; 
    _routerSubscription: Subscription;

    constructor(private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _gameService: GameService,
                private _authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {

        this._profile = this._authService.getProfile();
        this._routerSubscription = this.router.events.subscribe(
            (event) => {
                this._profile.then((profile:ProfileDefinition) =>{
                   
                     if(event instanceof NavigationEnd) {
                        this.id = this.route.snapshot.params['id'];
                        if(this.id){
                                this.game = this._gameService.getGameById(profile.Email, +this.id);
                                this.game = this.createCopy(this.game);
                        }
                        else{
                            this.game = _gameService.createNewGame(profile.Email);
                        }
                    }
                })
            }
        );        
    }

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

    ngOnDestroy() {
        this._routerSubscription.unsubscribe();
    }


    createCopy(gamePromise: Promise<GameModelDefinition>) :Promise<GameModelDefinition>{ 
        let gamePromiseCopy = new Promise<GameModelDefinition>((resolve) => {
                gamePromise.then((game: GameModelDefinition) => {
                    let gameCopy = new GameModelDefinition();
                    gameCopy.clone_object(game);
                    return resolve(gameCopy);
                })
            })

        return gamePromiseCopy;
    }
}
