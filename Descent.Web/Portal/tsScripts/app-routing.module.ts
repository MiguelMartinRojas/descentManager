﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelectTenantComponent } from './select-tenant.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/game-configuration',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }