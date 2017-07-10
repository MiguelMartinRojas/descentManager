import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedMaterialModule } from './shared-material.module';

import 'hammerjs';

import { SelectorComponent } from './selector/selector.component';
import { SelectorItemComponent } from './selector/selector-item.component';
import { SearchBarComponent } from './search/search-bar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SimpleCardComponent } from './card/simple-card.component';
import { CustomCardComponent } from './card/custom-card.component';
import { DynamicSectionComponent } from './dynamic/dynamic-section.component';
import { SnackBarErrorComponent } from './snack-bar-error/snack-bar-error.component';

import { WizardComponent } from './wizard/wizard.component';
import { WizardStepComponent } from './wizard/step/wizard-step.component';
import { WizardActionNextDirective, WizardActionPreviousDirective } from './wizard/wizard-action.directive';
import { WizardProgressComponent } from './wizard/progress/wizard-progress.component';

import { MapToIterablePipe } from './map-to-iterable.pipe';
import { DynamicModelComponent } from './model/dynamic-model.component';
import { DynamicItemComponent } from './model/item/dynamic-item.component';
import { DynamicTemplateItemComponent } from './model/template-item/dynamic-template-item.component';
import { ChipifyPipe } from './template/chipify.pipe';
import { TemplateEditorComponent } from './template/template-editor.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MasterAndDetailComponent } from './master-detail/master-and-detail.component';
import { CircleProgressComponent } from './circle-progress-bar/circle-progress-bar.component';
import { TitleService } from './services/title/title.service';

export { MasterAndDetailComponent, CircleProgressComponent, SpinnerComponent, TitleService, SnackBarErrorComponent };

const MODULES  = [BrowserAnimationsModule, CommonModule, RouterModule, SharedMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule];
const COMPONENTS  = [   SelectorComponent, SearchBarComponent, SelectorItemComponent,
                        AvatarComponent, SimpleCardComponent, CustomCardComponent,
                        WizardComponent, WizardStepComponent, WizardActionNextDirective, WizardActionPreviousDirective, WizardProgressComponent,
                        MapToIterablePipe, DynamicModelComponent, DynamicItemComponent, DynamicTemplateItemComponent,
                        ChipifyPipe, TemplateEditorComponent, SpinnerComponent, MasterAndDetailComponent, CircleProgressComponent, DynamicSectionComponent, 
                        SnackBarErrorComponent ];
const PROVIDERS = [
    TitleService
];

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports:[...MODULES] ,
    declarations: [...COMPONENTS],
    providers: [...PROVIDERS],
    entryComponents:[SnackBarErrorComponent],
    exports: [
        ...MODULES,
        ...COMPONENTS
    ]
})
export class SharedModule {
}
