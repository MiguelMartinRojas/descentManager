import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { TitleService } from '../services/title/title.service';

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
                private route: ActivatedRoute,
                private _titleService: TitleService) {
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
        this.getTitles();
    }

    getTitles(){
        this.chooseItemTitle = this._titleService.getTitle(0, 'Please choose an item from the list to view its details.');
        this.selectTaskTitle = this._titleService.getTitle(0, 'Select a task');
    }

    backToMaster(){
        this.hideMaster = false;
        this.router.navigate(['../'],{relativeTo: this.route})
    }
}