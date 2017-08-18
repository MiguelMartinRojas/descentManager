export class UserDefinition {
    Id: string;
    Name: string;
    Role: string;

    compare(cardsToCompare: UserDefinition){
        return this.Id === cardsToCompare.Id;
    }
}