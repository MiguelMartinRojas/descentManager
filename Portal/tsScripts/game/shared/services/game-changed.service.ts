import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class GameChangedService {
    private gameChanged = new Subject<boolean>();
    gameChanged$ = this.gameChanged.asObservable();

    updateGameChanged(value: boolean) {
        this.gameChanged.next(value);
    }

    HasGameChanged(){
        return this.gameChanged;
    }
}