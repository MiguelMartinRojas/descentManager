import { UserDefinition } from './user.model';
import { CardDefinition } from './card.model';
import { Utils } from './utils';

export class GamesModelDefinition {
    Id: string;
    Games: Array<GameModelDefinition>;
}

export class GameModelDefinition {
   
    Id: string;
    User: string;
    Users: Array<UserDefinition>;
    Name: string;
    CharacterImage: string;
    Gold: string;
    Class:string;
    ClassType: string;
    Objects: Array<CardDefinition>;
    Skills: Array<CardDefinition>;
    Notes: string;

    clone_object(game: GameModelDefinition) {
        this.Id = game.Id;
        this.User = game.User;
        this.Users = Utils.clone(game.Users);
        this.Name = game.Name;
        this.CharacterImage = game.CharacterImage;
        this.Gold = game.Gold;
        this.Class = game.Class;
        this.ClassType = game.ClassType;
        this.Objects = Utils.clone(game.Objects);
        this.Skills = Utils.clone(game.Skills);
        this.Notes = game.Notes;

        return this;
    }

    isEqual(game: GameModelDefinition){
        if( this.Id !== game.Id ||
            this.User !== game.User ||
            this.Name !== game.Name ||
            this.CharacterImage !== game.CharacterImage ||
            this.Gold !== game.Gold ||
            this.Class !== game.Class ||
            this.ClassType !== game.ClassType ||
            this.Notes !== game.Notes ||
            !Utils.isEqual(this.Objects, game.Objects) ||
            !Utils.isEqual(this.Skills, game.Skills) ||
            !Utils.isEqualUsers(this.Users, game.Users) 
            ){
            return false;
        }
        return true;
    }



}