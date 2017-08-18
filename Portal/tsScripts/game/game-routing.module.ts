import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/save.guard';
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
                        component: GameComponent,
                        canDeactivate: [CanDeactivateGuard]
                    },
                    {
                        path: ':id',
                        component: GameComponent,
                        canDeactivate: [CanDeactivateGuard]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class GameRoutingModule { }