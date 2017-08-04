import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';

import { CardDefinition } from '../models/card.model';


@Injectable()
export class CardsService {

    private _caracterCardsRef: Observable<Array<CardDefinition>>;
    private _objectsCardsRef: Observable<Array<CardDefinition>>;
    private _skillsCardsRef: Observable<Array<CardDefinition>>;

    constructor(private readonly _http: Http) { }

    getCharactersCards(): Promise<Array<CardDefinition>> {
        if (this._caracterCardsRef == null) {
            this._caracterCardsRef = this._http
                .get('api/game/character-cards')
                .map((response: Response) => {
                    const data : Array<CardDefinition> = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._caracterCardsRef.toPromise().catch(() => []);
    }

    getObjectsCards(): Promise<Array<CardDefinition>> {
        if (this._objectsCardsRef == null) {
            this._objectsCardsRef = this._http
                .get('api/game/objects-cards')
                .map((response: Response) => {
                    const data : Array<CardDefinition> = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._objectsCardsRef.toPromise().catch(() => []);
    }

    getSkillsCards(): Promise<Array<CardDefinition>> {
        if (this._skillsCardsRef == null) {
            this._skillsCardsRef = this._http
                .get('api/game/skills-cards')
                .map((response: Response) => {
                    const data : Array<CardDefinition> = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._skillsCardsRef.toPromise().catch(() => []);
    }

}