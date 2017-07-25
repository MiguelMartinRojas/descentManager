import { UserDefinition } from './user.model';
import { CardDefinition } from './card.model';

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