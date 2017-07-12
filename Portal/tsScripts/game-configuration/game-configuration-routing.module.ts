import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameChooserComponent } from './game-chooser.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'game-configuration',
                component: GameChooserComponent,
            }
        ])
    ],
    exports: [RouterModule]
})
export class GameConfigurationModule { }