import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';

import { GameModelDefinition, GamesModelDefinition } from '../models/game.model';
import { UserDefinition } from '../models/user.model';
import { CardDefinition } from '../models/card.model';

@Injectable()
export class GameService {

    private _gamesRef: Observable<GamesModelDefinition>;

    constructor(private readonly _http: Http) { }

    getGames(userValue: string): Promise<GamesModelDefinition> {
        if (this._gamesRef == null) {
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

    createNewGame(userEmail: string): Promise<GameModelDefinition> {
        
        return this.getGames(userEmail).then((gamesObject:GamesModelDefinition) => {
            gamesObject.Games.push(
                {
                    Id: (gamesObject.Games.length >0) ? (+gamesObject.Games[gamesObject.Games.length - 1].Id + 1)+'' : '0',
                    User: userEmail,
                    Users: new Array<UserDefinition>(),
                    Name: '',
                    CharacterImage: null,
                    Gold: null,
                    Class: null,
                    ClassType: null,
                    Objects: new Array<CardDefinition>(),
                    Skills: new Array<CardDefinition>(),
                    Notes: null
                }
            );
            return gamesObject.Games[gamesObject.Games.length - 1];
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
}