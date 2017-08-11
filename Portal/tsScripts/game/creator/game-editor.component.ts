import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { ImageSelectorComponent } from '../shared/selector/image.selector.component';
import { CardsService } from '../shared/services/cards.service';
import { GameService } from '../shared/services/game.service';
import { GameModelDefinition } from '../shared/models/game.model';
import { CardDefinition } from '../shared/models/card.model';


@Component({
    moduleId: module.id,
    selector: 'game-editor',
    templateUrl: './game-editor.component.html',
})
export class GameEditorComponent implements OnInit{
    
    @Input()
    game : GameModelDefinition;

    @Input()
    isCreated : GameModelDefinition;
    
    constructor(private _dialog: MdDialog,
                private _cardsService: CardsService,
                private _gameService: GameService) {
    }
    
    character: string;

    classes: Array<string> = new Array('');

    ngOnInit(): void {
    }

    selectCharacter () {
        if (this.game) {
            this._dialog.open(ImageSelectorComponent, {
                data: {
                    cards: this._cardsService.getCharactersCards(),
                    selectSingleCard: true
                },
                height: '432px',
                width: '378px'
            }).afterClosed().subscribe((result: any) => {
                if(result && result !== "") {
                    this.game.Class = null;
                    this.game.CharacterImage = result;
                    this.game.ClassType = this.getClassType(this.game.CharacterImage);
                    this._gameService.getClasses(this.game.ClassType).then((klazz: Array<string>) =>{
                        this.classes = klazz;
                    })
                    
                }
            });   
        }

    }

    AddCard (event: Array<number>, type: string) {
        if(event[0] === event[1]-1){
            this._dialog.open(ImageSelectorComponent, {
                    data: {
                        type: type,
                        selectedCards: type ==="objects"? this.game.Objects: this.game.Skills,
                        cards: type ==="objects"? this._cardsService.getObjectsCards(): this._cardsService.getSkillsCards(this.game.ClassType, this.game.Class)
                    },
                    height: '432px',
                    width: '378px'
                }).afterClosed().subscribe((result: any) => {
                    
                });   
        }
    }

    addUsers(){}

    onClassChanged(){
        this.game.Skills = CardDefinition.emptySkillsDeck();
        this.game.Objects = CardDefinition.emptyObjectsDeck();
    }

    getClassType(characterUrl: string): string{
        let urlSplited = characterUrl.split('\\');
        return urlSplited[urlSplited.length-1].split('-')[0];
        
    }
    
}
