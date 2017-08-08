import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdDialogModule,
    MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule, 
    MdSlideToggleModule, MdListModule, MdChipsModule, MdSnackBarModule
} from '@angular/material';
const MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdListModule,
    MdChipsModule, 
    MdSnackBarModule
];
@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class SharedMaterialModule { }