import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedMaterialModule } from './shared-material.module';
import { CarouselComponent } from './carousel/carousel.component';

import 'hammerjs';


const MODULES  = [BrowserAnimationsModule, CommonModule, RouterModule, SharedMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule];
const COMPONENTS  = [CarouselComponent];

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports:[...MODULES] ,
    declarations: [...COMPONENTS],
    //providers: [...PROVIDERS],
    exports: [
        ...MODULES,
        ...COMPONENTS
    ]
})
export class SharedModule {
}
