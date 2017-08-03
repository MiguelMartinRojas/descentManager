import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ObservableMedia } from '@angular/flex-layout';
import { MdSnackBar, MdDialog } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { GameRoutingModule } from './game-routing.module';

import { UrlSerializer } from '@angular/router';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer-gesture-config';
import { GameCreatorComponent } from './creator/game-creator.component';
import { GameComponent } from './selector/game.component';
import { ImageSelectorComponent } from './selector/image.selector.component';


@NgModule({
    imports: [SharedModule, GameRoutingModule],
    declarations: [GameCreatorComponent, GameComponent, ImageSelectorComponent],
    entryComponents: [ImageSelectorComponent],
    exports: []
})
export class GameModule {
}