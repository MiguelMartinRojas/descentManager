import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameCreatorComponent } from './creator/game-creator.component';
import { GameComponent } from './selector/game.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'games',
                canActivate: [CanActivateViaAuthGuard],
                children: [
                    {
                        path: 'new',
                        component: GameCreatorComponent
                    },
                    {
                        path: ':id',
                        component: GameComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class GameRoutingModule { }