import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
    @Input()
    img: string;

    @Input()
    set title(title: string) {
        if (title) {
            const words = title.split(/\s+/);
            this.initials = this.getInitial(words[0]);
            if (words.length > 1 && this.isLetter(words[1][0])) {
                this.initials += this.getInitial(words[1]);
            }
        } 
    }

    private isLetter(letter: string) {
        return letter.match(/[a-z]/i);
    }

    private getInitial(word: string): string {
        return word[0][0].toUpperCase();
    }

    initials = '';
}