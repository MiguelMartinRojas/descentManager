import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ObservableMedia } from '@angular/flex-layout';
import { MdSnackBar, MdDialog } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { GameConfigurationModule } from './game-configuration-routing.module';

import { UrlSerializer } from '@angular/router';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer-gesture-config';
import { GameChooserComponent } from './game-chooser.component'

@NgModule({
    imports: [SharedModule, GameConfigurationModule],
    declarations: [GameChooserComponent],
    exports: []
})
export class GameConfiguration {
}