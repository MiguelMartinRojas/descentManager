import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'master-and-detail',
    templateUrl: './master-and-detail.component.html',
    styleUrls: ['master-and-detail.component.css']
})
export class MasterAndDetailComponent implements OnInit{
    hideMaster: boolean = false;
    chooseItemTitle: Promise<string>;
    selectTaskTitle: Promise<string>;

    constructor(private router: Router,
                private route: ActivatedRoute) {
        router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                if(event.url.indexOf('(details:')!=-1){
                    this.hideMaster = true;
                }else if(event.url === '/tasks') {
                    this.hideMaster = false;
                }
            }
        })
    }

    ngOnInit(): void {
    }

    backToMaster(){
        this.hideMaster = false;
        this.router.navigate(['../'],{relativeTo: this.route})
    }
}