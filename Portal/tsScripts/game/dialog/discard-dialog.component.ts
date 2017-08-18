import { Component} from '@angular/core';
import { GameEditorComponent } from "../creator/game-editor.component";
import { GameService } from '../shared/services/game.service';
import { MdDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'discard-dialog',
    templateUrl: './discard-dialog.component.html',
})
export class DiscardDialogComponent {

    constructor(public dialogRef: MdDialogRef<DiscardDialogComponent>, ) {
    }

    discard(value: boolean){
        this.dialogRef.close(value);
    }
}