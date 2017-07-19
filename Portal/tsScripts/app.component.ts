import { Component, ElementRef, OnInit, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { Subscription }   from 'rxjs/Subscription';

import { GameModelDefinition } from './game/models/game.model';
import { GameService } from './services/game.service'
import { UserProfileService } from './shared/services/authentication/user-profile.service';
import { GoogleSignInSuccess } from './google-button.component';

@Component({
    selector: 'descent-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    host: {'class': 'font-override descent-app'}
})
export class AppComponent implements OnInit{
    
    _userProfileServiceSubscription: Subscription;
    games: Promise<Array<GameModelDefinition>>;
    userProfile : Promise<any>;


    constructor(private readonly el: ElementRef,
        private readonly _iconRegistry: MdIconRegistry,
        private readonly _sanitizer: DomSanitizer,
        private readonly _media: ObservableMedia,
        private readonly _dialog: MdDialog,
        private readonly _gameService: GameService,
        private readonly _userProfileService: UserProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private _ngZone: NgZone) {

        const element = el.nativeElement;

        _iconRegistry.addSvgIcon('ic_success', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_success.svg'));
        _iconRegistry.addSvgIcon('ic_error', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_error.svg'));
        _iconRegistry.addSvgIcon('ic_warning', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_warning.svg'));
        _iconRegistry.addSvgIcon('ic_spinner', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_spinner.svg'));
        _iconRegistry.addSvgIcon('ic_document_draft', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_document_draft.svg'));
        _iconRegistry.addSvgIcon('ic_doc_pdf', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_pdf.svg'));
        _iconRegistry.addSvgIcon('ic_doc_xls', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_xls.svg'));
        _iconRegistry.addSvgIcon('ic_doc_ppt', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_ppt.svg'));
        _iconRegistry.addSvgIcon('ic_doc_doc', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_doc.svg'));
        _iconRegistry.addSvgIcon('ic_importance', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_importance.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_top', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_top.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_down', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_down.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_right', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_right.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_left', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_left.svg'));
        
        this._userProfileServiceSubscription = this._userProfileService.userProfile$.subscribe(
            value => {
                this.runOutSideAngular(this.setUserProfile.bind(this, value));
        });

        this.games = _gameService.getGames("aweloska@gmail.com");
        this.games.then((games : Array<GameModelDefinition>)=>{
            console.log(); 
        })
    }

    myClientId: string = '1030197237184-1qtod5qe8of2f4unucqqq9pf2r04cj6u.apps.googleusercontent.com';
    myLongTitle: string = 'Sign in';
    myScope: string = 'profile email';
    
    
    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        let googleUser: gapi.auth2.GoogleUser = event.googleUser;
        let id: string = googleUser.getId();
        let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        this._userProfileService.setUserProfile(profile);
        this.runOutSideAngular(this.setUserProfile.bind(this, profile));
                
    }

    onLogOut(){
        this.runOutSideAngular(this.removeUserProfile.bind(this));
    }


    setUserProfile(profile: any){
        this.userProfile = new Promise<any>((resolve, reject) => {
            resolve(profile);
            if(profile){
                this.router.navigate(['game/1'],{relativeTo: this.route});
            }
        });
    }

    removeUserProfile(){
        this._userProfileService.setUserProfile({});
    }

    ngOnInit(): void {
    }

    runOutSideAngular(func: Function){
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.run(() => {
                func();
             });
        });
    }

    ngOnDestroy(){
        this._userProfileServiceSubscription.unsubscribe();
    }

}