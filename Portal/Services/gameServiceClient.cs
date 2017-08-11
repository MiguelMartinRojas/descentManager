using System;
using System.Web;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Descent.Web.Models;
using Descent.Web.Managers;
using System.Threading.Tasks;
using Microsoft.Data.OData.Query.SemanticAst;

namespace Descent.Web.Services
{
    public class GameServiceClient : IGameServiceClient
    {
        private const string ServicePath = "game";
        private readonly string _outputDir;

        readonly IGamesDocumentDbManager _gamesDocumentDbManager = null;
        public GameServiceClient(IGamesDocumentDbManager gamesDocumentDbManager)
        {
            _outputDir = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);
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

        public List<CardModel> GetCharacterCards()
        {
            string folderPath = GetFolderPath("\\Content\\images\\thumbnails\\BaseGame\\heroes\\images");
            List<CardModel> paths = ProcessDirectory(folderPath);
            return paths;
        }

        public List<CardModel> GetObjectsCards()
        {
            string folderPath = GetFolderPath("\\Content\\images\\thumbnails\\BaseGame\\heroes\\items");
            List<CardModel> paths = ProcessDirectory(folderPath);
            folderPath = GetFolderPath("\\Content\\images\\thumbnails\\BaseGame\\heroes\\relics");
            paths.AddRange(ProcessDirectory(folderPath));
            folderPath = GetFolderPath("\\Content\\images\\thumbnails\\BaseGame\\heroes\\search_cards");
            paths.AddRange(ProcessDirectory(folderPath));
            return paths;
        }

        public List<CardModel> GetSkillsCards(string klazzType, string klazz)
        {
            string folderPath = GetFolderPath($"\\Content\\images\\thumbnails\\BaseGame\\heroes\\classes\\{klazzType}\\{klazz}");
            List<CardModel> paths = ProcessDirectory(folderPath);
            return paths;
        }

        public List<string> GetClassType(string klazz)
        {
            string folderPath = GetFolderPath($"\\Content\\images\\thumbnails\\BaseGame\\heroes\\classes\\{klazz}");
            return GetFolders(folderPath);
        }



        private List<CardModel> ProcessDirectory(string targetDirectory)
        {
            List <CardModel> paths = new List<CardModel>();

            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                var contentPath = fileName.Replace(_outputDir.Replace("file:\\", "") +"\\", "");
                CardModel card = new CardModel {Id = fileName.GetHashCode().ToString(), Url = contentPath };
                paths.Add(card);

            }

            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                paths.AddRange(ProcessDirectory(subdirectory));
            }

            return paths;
        }


        private List<string> GetFolders(string targetDirectory)
        {
            List<string> folders = new List<string>();
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                var contentPath = subdirectory.Replace(_outputDir.Replace("file:\\", "") + "\\", "");
                folders.Add(contentPath.Split('\\').Last());

            }

            return folders;
        }



        private string GetFolderPath(string extraPath)
        {
            string path = _outputDir + extraPath;

            var uri = new Uri(path);
            return uri.LocalPath;
        }
    }
}