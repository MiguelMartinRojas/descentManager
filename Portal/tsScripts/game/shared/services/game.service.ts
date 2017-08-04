import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';

import { GameModelDefinition, GamesModelDefinition } from '../models/game.model'

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
}