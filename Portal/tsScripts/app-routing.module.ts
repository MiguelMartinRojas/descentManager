import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelectTenantComponent } from './select-tenant.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/game/1',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }