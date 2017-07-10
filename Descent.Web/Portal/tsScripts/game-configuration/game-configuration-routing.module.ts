import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from './card.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'game-configuration',
                component: CardComponent,
            }
        ])
    ],
    exports: [RouterModule]
})
export class GameConfigurationModule { }