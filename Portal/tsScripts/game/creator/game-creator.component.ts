import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { ImageSelectorComponent } from '../selector/image.selector.component';
import { CardsService } from '../shared/services/cards.service';
import { GameService } from '../shared/services/game.service';
import { GameModelDefinition } from '../shared/models/game.model';


@Component({
    moduleId: module.id,
    selector: 'game-creator',
    templateUrl: './game-creator.component.html',
})
export class GameCreatorComponent {
    game : Promise<GameModelDefinition>
    
    constructor(private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _gameService: GameService) {
                this.game = _gameService.getGameById('aweloska@gmail.com', 0);
    }
    
    character: string;

    selectCharacter () {
    this.game.then( game => {
        this._dialog.open(ImageSelectorComponent, {
                data: {
                    cards: this._cardsService.getCharactersCards(),
                    selectSingleCard: game.CharacterImage
                },
                height: '432px',
                width: '378px',
                disableClose: true
            }).afterClosed().subscribe((result: any) => {
                if(result) {
                    game.CharacterImage =result;
                    //this._modifedTaskService.setTaskChanged(this.taskId);
                }
            });   
        })
    }

}
