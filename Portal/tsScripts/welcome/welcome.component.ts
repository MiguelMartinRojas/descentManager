import { AuthService } from './../game/shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    isAuthenticated: boolean;

    constructor(private readonly authService: AuthService){}

    ngOnInit(){
        this.isAuthenticated = this.authService.isLoggedIn();
    }
}