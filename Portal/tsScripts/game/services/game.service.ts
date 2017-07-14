import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { GameModelDefinition } from '../models/game.model'

@Injectable()
export class TitleService {

    private _titlesRef: Observable<Array<GameModelDefinition>>;
    private _titlesList: Array<string>;

    constructor(private readonly _http: Http) { }

    getTitles(titleIds: number[]): Promise<Array<GameModelDefinition>> {
        this._titlesRef = this._http
            .get('api/tasks/titles/' + titleIds.join(','))
            .map((response: Response) => {
                const data : Array<GameModelDefinition> = response.json().Titles;
                return data;
            })
            .publishReplay(1)
            .refCount();

        return this._titlesRef.toPromise().catch(() => []);
    }

    getTitle(titleId: number, defaultTitle: string = "No title defined"): Promise<string> {
        let titlePromise = new Promise<string>((resolve, reject) => {
            resolve(defaultTitle);
        });

        if(this._titlesRef) {
            titlePromise = this._titlesRef.toPromise().then( titles => {
                let title = titles.find(title => {
                    return parseInt(title.Id) == titleId;
                });
                return title ? title.Name : defaultTitle
            })
        }
        return titlePromise;
    }

}