import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { GameModelDefinition } from '../../shared/model/game.model';
import { GameService } from '../../shared/services/game/game.service';
import { UserProfileService } from '../../shared/services/authentication/user-profile.service';

@Component({
    moduleId: module.id,
    selector: 'game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit{
    
    id: number;
    games: Promise<Array<GameModelDefinition>>;
    game : Promise<GameModelDefinition>;
    _userProfileServiceSubscription: Subscription;

    constructor(private _gameService: GameService, 
                private _userProfileService: UserProfileService,
                private router: Router,
                private route: ActivatedRoute) {    

    }

    ngOnInit(){
        this.id = this.route.snapshot.params['id'];
        this.game = this._gameService.getGameById(this._userProfileService.getUserProfile().getEmail(), +this.id);
        // this._userProfileServiceSubscription = this._userProfileService.userProfile$.subscribe(
        //     value => {
        //         if (value !== null && Object.keys(value).length > 0) {
        //             this.game = this._gameService.getGameById(value.getEmail(), +this.id);
        //         }
        //         else{
        //             this.game =  null;
        //         }
        // });
    }

    // ngOnDestroy(){
    //     this._userProfileServiceSubscription.unsubscribe();
    // }

}
