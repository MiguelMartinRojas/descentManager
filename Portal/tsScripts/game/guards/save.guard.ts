import { Injectable }           from '@angular/core';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }  from '@angular/router';
import { MdDialog } from '@angular/material';

import { GameEditorComponent } from '../creator/game-editor.component';
import { GameModelDefinition } from '../shared/models/game.model';
import { AuthService } from '../shared/services/auth.service';
import { CardsService } from '../shared/services/cards.service';
import { GameService } from '../shared/services/game.service';
import { ProfileDefinition } from '../shared/models/profile.model';
import { DiscardDialogComponent } from '../dialog/discard-dialog.component';



@Injectable()
export class CanDeactivateGuard implements CanDeactivate<GameEditorComponent> {
    _profile : Promise<ProfileDefinition>;
    constructor(private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _gameService: GameService,
                private _authService: AuthService,){
            this._profile = this._authService.getProfile();
    }

  canDeactivate(
    component: GameEditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    
    let discardChanges = new Promise<boolean>((resolve =>{
        return component.game.then((game: any)=> {
                return this._profile.then((profile:ProfileDefinition) => {
                    return this.gameHasChanged(this._gameService.getGameById(profile.Email, +game.Id), game).then((hasChanged: boolean) =>{
                        if(!hasChanged) {
                            resolve(true);
                            return;
                        }

                        this._dialog.open(DiscardDialogComponent, {
                                    height: '150px',
                                    width: '378px'
                        }).afterClosed().subscribe((result: any) => {
                            if(result && result !== "" && result === true) { //discard
                                component.game = this._gameService.getGameById(profile.Email, +game.id);
                                resolve(true);
                            }
                            else {  //save before
                                resolve(false);
                            }
                        });   
                    })
                })
            });
    }))

    return discardChanges
  }

      gameHasChanged(gameOriginal: Promise<GameModelDefinition>, gameActual: GameModelDefinition): Promise<boolean> {
        let hasChanged = new Promise<boolean>((resolve =>{
            gameOriginal.then((gameServer: GameModelDefinition) => {
                if(!gameActual || !gameServer) {//new game case
                    resolve(true);
                    return;
                }
                if (gameActual.isEqual(gameServer)){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            })
        }))

        return hasChanged;
    }

}