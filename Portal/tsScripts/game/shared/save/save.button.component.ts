import { Component, ElementRef, OnInit, Input, Inject, QueryList } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';

import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';
import { GameModelDefinition } from '../models/game.model';


@Component({
    moduleId: module.id,
    selector: 'save-button',
    templateUrl: './save.button.component.html',
    styleUrls: ['./save.button.component.css']
})
export class SaveButtonComponent{
    @Input()
    color: string = 'green';
    @Input()
    game: GameModelDefinition;

    saveSuccess:boolean = false;

    constructor(private _gameService: GameService,
                private _authService: AuthService,
                public snackBar: MdSnackBar){}

    saveGame(){
        this._authService.getProfile().then((profile) =>{
            this._gameService.saveGame(profile.Email, this.game).then((data) =>{
                this.openSnackBar(data.Success? 'Game saved correctly': 'There was an error while saving', 'Close');
            })
            
        })
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
            extraClasses: [this.color]
        });
    }

}
