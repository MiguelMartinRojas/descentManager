import { AuthService } from './game/shared/services/auth.service';
import { GameService } from './game/shared/services/game.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { ProfileDefinition } from './game/shared/models/profile.model';
import { GamesModelDefinition } from './game/shared/models/game.model';

@Component({
    selector: 'descent-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    host: { 'class': 'font-override descent-app' }
})
export class AppComponent implements OnInit {

    userProfile: Promise<ProfileDefinition>;
    games: Promise<GamesModelDefinition>;

    constructor(
        private readonly el: ElementRef,
        private readonly _iconRegistry: MdIconRegistry,
        private readonly _sanitizer: DomSanitizer,
        private readonly _authService: AuthService,
        private readonly _gameService: GameService
    ) {
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
        _iconRegistry.addSvgIcon('ic_box_frame', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_box_frame_black_24px.svg'));
        _iconRegistry.addSvgIcon('ic_add_card', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/thumbnails/add_card.svg'));
        _iconRegistry.addSvgIcon('ic_add_weapon', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/thumbnails/add_card_weapon.svg'));
        _iconRegistry.addSvgIcon('ic_add_skill', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/thumbnails/add_card_skill.svg'));

    }

    imageUrlProfile: string;
    nameProfile: string;

    ngOnInit() {
        this._authService.isLoggedIn(this.el.nativeElement.getAttribute('isAuthenticated') === 'true');
        this.userProfile = this._authService.getProfile();
        this.getGames();
    }

    getGames(){
        this.userProfile.then((profile: ProfileDefinition)=>{
            this.games = this._gameService.getGames(profile.Email);
        })
    }

    onLogOut(){}

}