import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: WelcomeComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }