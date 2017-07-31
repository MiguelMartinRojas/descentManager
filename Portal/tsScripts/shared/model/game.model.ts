import { UserDefinition } from './user.model';
import { CardDefinition } from './card.model';

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
    Objects: Array<CardDefinition>;
    Skills: Array<CardDefinition>;
    Notes: string;
}