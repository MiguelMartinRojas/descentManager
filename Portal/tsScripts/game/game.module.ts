import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ObservableMedia } from '@angular/flex-layout';
import { MdSnackBar, MdDialog } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { GameRoutingModule } from './game-routing.module';

import { UrlSerializer } from '@angular/router';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer-gesture-config';
import { GameEditorComponent } from './creator/game-editor.component';
import { GameComponent } from './game.component';
import { ImageSelectorComponent } from './shared/selector/image.selector.component';

import { SaveButtonComponent } from './shared/save/save.button.component';
import { DiscardDialogComponent } from './dialog/discard-dialog.component';
import { ToolBarComponent } from './shared/ui/toolbar.component';


import { CardsService } from './shared/services/cards.service'
import { AuthService } from './shared/services/auth.service'
import { GameService } from './shared/services/game.service'
import { GameChangedService } from './shared/services/game-changed.service'



@NgModule({
    imports: [SharedModule, GameRoutingModule],
    declarations: [GameEditorComponent, ImageSelectorComponent, GameComponent, SaveButtonComponent, DiscardDialogComponent, ToolBarComponent],
    entryComponents: [GameComponent, ImageSelectorComponent, DiscardDialogComponent],
    providers: [CardsService, AuthService, GameService, GameChangedService,{ 
        provide: HAMMER_GESTURE_CONFIG, 
        useClass: CustomHammerConfig 
    }],
    exports: []
})
export class GameModule {
}