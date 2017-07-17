import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';


@Injectable()
export class UserProfileService {

    private _userProfile= new Subject<any>();
    private _currenctValue: any;

    userProfile$ = this._userProfile.asObservable();

    setUserProfile(userProfile : any){
        this._userProfile.next(userProfile);
        this._currenctValue = userProfile
    }
    getUserProfile(){
        return this._currenctValue;
    }
}