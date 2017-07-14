import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';

import { GameModelDefinition } from '../game/models/game.model'

@Injectable()
export class GameService {

    private _gamesRef: Observable<Array<GameModelDefinition>>;

    constructor(private readonly _http: Http) { }

    getGames(userValue: string): Promise<Array<GameModelDefinition>> {
        if (this._gamesRef == null) {
            this._gamesRef = this._http
                .get('api/game/' + encodeURI(userValue))
                .map((response: Response) => {
                    const data : Array<GameModelDefinition> = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._gamesRef.toPromise().catch(() => []);
    }
}