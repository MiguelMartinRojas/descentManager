import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './game/shared/services/auth.service';
import { CanActivateViaAuthGuard } from './game/guards/auth.guard';
import { CanDeactivateGuard } from './game/guards/save.guard';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { GameModule } from './game/game.module';
import { CardsService } from './game/shared/services/cards.service';
import { GameService } from './game/shared/services/game.service';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule, HttpModule, AppRoutingModule, SharedModule, ThemeModule, GameModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent
    ],
    providers: [
        AuthService,
        CanActivateViaAuthGuard,
        CanDeactivateGuard,
        CardsService,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

