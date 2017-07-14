import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameCreatorComponent } from './creator/game-creator.component';
import { GameComponent } from './selector/game.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'new-game',
                component: GameCreatorComponent,
            }
        ]),
         RouterModule.forChild([
            {
                path: 'game/:id',
                component: GameCreatorComponent,
            }
        ])
    ],
    exports: [RouterModule]
})
export class GameModule { }