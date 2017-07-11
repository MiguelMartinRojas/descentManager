import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
    selector: 'tasks-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    host: {'class': 'font-override tasks-app'}
})
export class AppComponent {
    logOutUrl: string;
    tenantId: string;

    mustActivateBackButton: boolean;

    constructor(private readonly el: ElementRef,
        private readonly _iconRegistry: MdIconRegistry,
        private readonly _sanitizer: DomSanitizer,
        private readonly _media: ObservableMedia,
        private readonly _dialog: MdDialog) {

        const element = el.nativeElement;
        this.logOutUrl = element.getAttribute('logOutUrl');

        _iconRegistry.addSvgIcon('ic_success', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_success.svg'));
        _iconRegistry.addSvgIcon('ic_error', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_error.svg'));
        _iconRegistry.addSvgIcon('ic_warning', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_warning.svg'));
        _iconRegistry.addSvgIcon('ic_spinner', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_spinner.svg'));
        _iconRegistry.addSvgIcon('ic_document_draft', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_document_draft.svg'));
        _iconRegistry.addSvgIcon('ic_doc_pdf', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_pdf.svg'));
        _iconRegistry.addSvgIcon('ic_doc_xls', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_xls.svg'));
        _iconRegistry.addSvgIcon('ic_doc_ppt', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_ppt.svg'));
        _iconRegistry.addSvgIcon('ic_doc_doc', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_doc_doc.svg'));
        _iconRegistry.addSvgIcon('ic_no_tasks', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_no_tasks.svg'));
        _iconRegistry.addSvgIcon('ic_importance', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_importance.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_top', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_top.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_down', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_down.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_right', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_right.svg'));
        _iconRegistry.addSvgIcon('ic_arrow_left', _sanitizer.bypassSecurityTrustResourceUrl('Content/images/ic_arrow_left.svg'));
        
    }
    
    reloadPage(){
    }

    backToMaster(){
    }

    showAbout() {
        let isMobileView = this._media.isActive('xs');
    }
}