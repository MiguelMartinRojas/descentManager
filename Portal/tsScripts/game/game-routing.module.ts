import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameComponent } from './game.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'games',
                canActivate: [CanActivateViaAuthGuard],
                children: [
                    {
                        path: 'new',
                        component: GameComponent
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