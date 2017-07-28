import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private _isLoggedIn : boolean;

    isLoggedIn(value?: boolean){
        if(value !== undefined){
            this._isLoggedIn = value;
        }

        return this._isLoggedIn;
    }
}