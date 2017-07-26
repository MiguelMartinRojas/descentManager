import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { Game} from './game/game.module';

import { AppComponent } from './app.component';

import { GameService } from './shared/services/game/game.service'
import { UserProfileService } from './shared/services/authentication/user-profile.service'


@NgModule({
    imports: [BrowserModule, HttpModule, AppRoutingModule, SharedModule, ThemeModule, Game],
    declarations: [AppComponent],
    providers:[GameService, UserProfileService],
    bootstrap: [AppComponent]
})
export class AppModule {
}