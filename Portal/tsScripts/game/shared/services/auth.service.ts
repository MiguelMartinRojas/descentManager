import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

import { ProfileDefinition } from '../models/profile.model';

@Injectable()
export class AuthService {

    private _isLoggedIn : boolean;
    private _profileRef: Observable<ProfileDefinition>;
    

    isLoggedIn(value?: boolean){
        if(value !== undefined){
            this._isLoggedIn = value;
        }

        return this._isLoggedIn;
    }

    constructor(private readonly _http: Http) { }

    getProfile(): Promise<ProfileDefinition> {
        if (this._profileRef == null) {
            this._profileRef = this._http
                .get('api/profile')
                .map((response: Response) => {
                    const data : ProfileDefinition = response.json();
                    return data;
                })
                .publishReplay(1)
                .refCount();
        }
        return this._profileRef.toPromise().catch(() => []);
    }
}