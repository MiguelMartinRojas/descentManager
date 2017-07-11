import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ObservableMedia } from '@angular/flex-layout';
import { MdSnackBar, MdDialog } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { GameConfigurationModule } from './game-configuration-routing.module';

import { UrlSerializer } from '@angular/router';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer-gesture-config';
import { CardComponent } from './card.component'

@NgModule({
    imports: [SharedModule, GameConfigurationModule],
    declarations: [CardComponent],
    exports: []
})
export class GameConfiguration {
}