import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { SelectTenantComponent } from './select-tenant.component';

@NgModule({
    imports: [BrowserModule, HttpModule, AppRoutingModule, SharedModule, ThemeModule, TasksModule],
    declarations: [AppComponent, SelectTenantComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}