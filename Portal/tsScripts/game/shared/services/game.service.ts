import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';

import { GameModelDefinition, GamesModelDefinition } from '../models/game.model';
import { UserDefinition } from '../models/user.model';
import { CardDefinition } from '../models/card.model';
import { GameResponseDefinition } from '../models/process-game-response.model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class GameService {

    private _gamesRef: Observable<GamesModelDefinition>;
    private _saveGameResult: Observable<GameResponseDefinition>;
    private _savedGame = new Subject<any>();

    savedTask$ = this._savedGame.asObservable();

    constructor(private readonly _http: Http) { }

    getGames(userValue: string, force: boolean = false): Promise<GamesModelDefinition> {
        if (this._gamesRef == null || force) {
            this._gamesRef = this._http
                .get('api/game/' + encodeURI(userValue))
                .map((response: Response) => {
                    const data : GamesModelDefinition = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._gamesRef.toPromise().catch(() => []);
    }

    getGameById(userValue: string, id: number): Promise<GameModelDefinition> {
        return this.getGames(userValue).then((gamesObject:GamesModelDefinition)=>{
            return gamesObject.Games[id];
        })
    }

    saveGame(userValue: string, game: GameModelDefinition): Promise<GameResponseDefinition> {
        let options = this.createRequestOptions();
        let data = this.createBody(game);

         this._saveGameResult = this._http
                .post('api/game/save/' + encodeURI(userValue) + '/' + game.Id , JSON.stringify(data.Game), options)
                .map((response: Response) => {
                    const data : GameResponseDefinition = response.json();

                    if(data && data.Success) {
                        this.getGames(userValue, true);
                    }

                    return data;
                })
                .publishReplay(1)
                .refCount();
        return this._saveGameResult.toPromise().catch(() => null);
    }

    createNewGame(userEmail: string): Promise<GameModelDefinition> {
        
        return this.getGames(userEmail).then((gamesObject:GamesModelDefinition) => {
            let game = new GameModelDefinition();
                game.Id = (gamesObject.Games.length >0) ? (+gamesObject.Games[gamesObject.Games.length - 1].Id + 1)+'' : '0',
                game.User= userEmail,
                game.Users= new Array<UserDefinition>(),
                game.Name= '',
                game.CharacterImage= null,
                game.Gold= null,
                game.Class= null,
                game.ClassType= null,
                game.Objects= new Array<CardDefinition>(),
                game.Skills= new Array<CardDefinition>(),
                game.Notes= null
            
            return game;
        })
    }

    getClasses(klazz: string): Promise<Array<string>> {
            return this._http
                .get('api/game/class/' + encodeURI(klazz))
                .map((response: Response) => {
                    const data : Array<string> = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount().toPromise().catch(() => []);
    }

    private createRequestOptions(): RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ 
            headers: headers 
        });
    }

    private createBody(game: GameModelDefinition): any {
   
        return {
            'Game': game
        };
    }
}