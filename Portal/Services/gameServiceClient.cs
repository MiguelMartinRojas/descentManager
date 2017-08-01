using System.Collections.Generic;
using Descent.Web.Models;
using Descent.Web.Managers;
using System.Threading.Tasks;

namespace Descent.Web.Services
{
    public class GameServiceClient : IGameServiceClient
    {
        private const string ServicePath = "game";

        IGamesDocumentDbManager _gamesDocumentDbManager = null;
        public GameServiceClient(IGamesDocumentDbManager gamesDocumentDbManager)
        {
            _gamesDocumentDbManager = gamesDocumentDbManager;
        }


        public async Task InsertGamesAsync(string email)
        {
            var gamesInstance = new GamesModel
            {
                Id = "aweloska@gmail.com",
                Games = new List<GameModel> {
                    new GameModel() {
                        Id = "1",
                        Name = "Game with Gonzalo and Pablo",
                        Notes = "some long text, this text can be very long it's used for taking some notes",
                        User = email,
                        CharacterImage = "Content/images/thumbnails/Heroes/LeoricoftheBook.png",
                        Objects = new List<CardModel> {
                            new CardModel { Id = "1", Url = "Content/images/thumbnails/pdf.png" },
                            new CardModel { Id = "2", Url = "Content/images/thumbnails/cls.png" }
                        },
                        Skills = new List<CardModel> {
                            new CardModel { Id = "1", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/0.skill Prayer of Healing..png" },
                            new CardModel { Id = "2", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/0.weapon Iron Mace..png" },
                            new CardModel { Id = "3", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/0.weapon Shield Wooden Shield..png" },
                            new CardModel { Id = "4", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/1.skill Armor of Faith..png" },
                            new CardModel { Id = "5", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/1.skill Blessed Strike..png" },
                            new CardModel { Id = "6", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/1.skill Blessed Strike..png" },
                            new CardModel { Id = "7", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/1.skill Blessed Strike..png" },
                            new CardModel { Id = "8", Url = "Content/images/thumbnails/BaseGame/heroes/classes/Healers/Disciple/1.skill Blessed Strike..png" },
                        },
                        Users = new List<UserModel> {
                            new UserModel {Id = "1", Name = "Migue", Value = "aweloska@gmail.com" },
                            new UserModel {Id = "2", Name = "Juanga", Value = "juangabreil@gmail.com" }
                        }
                    }
                }
            };


            await _gamesDocumentDbManager.AddGamesAsync(gamesInstance);
        }


        public async Task<GamesModel> GetGames(string email)
        {
            await InsertGamesAsync("aweloska@gmail.com");

            GamesModel games = _gamesDocumentDbManager.GetGames("aweloska@gmail.com");

            return games;
        }
    }
}