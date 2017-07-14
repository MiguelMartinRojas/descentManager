import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ObservableMedia } from '@angular/flex-layout';
import { MdSnackBar, MdDialog } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { GameModule } from './game-routing.module';

import { UrlSerializer } from '@angular/router';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer-gesture-config';
import { GameCreatorComponent } from './creator/game-creator.component'
import { GameComponent } from './selector/game.component'

@NgModule({
    imports: [SharedModule, GameModule],
    declarations: [GameCreatorComponent, GameComponent],
    exports: []
})
export class Game {
}