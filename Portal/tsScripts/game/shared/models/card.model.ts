export class CardDefinition {
    Id: string;
    Url: string;

    constructor(id: string, url: string){
        this.Id = id;
        this.Url = url;
    }

    static emptySkillsDeck(){
        return new Array<CardDefinition>(new CardDefinition('0', 'Content/images/thumbnails/add_card_skill.svg'))
    }
    static emptyObjectsDeck(){
        return new Array<CardDefinition>(new CardDefinition('0', 'Content/images/thumbnails/add_card_weapon.svg'))
    }

    compare(cardsToCompare: CardDefinition){
        return this.Id === cardsToCompare.Id;
    }
}
