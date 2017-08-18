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


        

        public async Task<GamesModel> GetGames(string email)
        {

            GamesModel games = _gamesDocumentDbManager.GetGames(email);

            if (games == null)
            {
                await InsertEmptyGamesAsync(email);
                games = _gamesDocumentDbManager.GetGames(email);
            }


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


        public async Task<ProcessGameActionResponse> SaveGames(string email, int gameId, GameModel game)
        {
            ProcessGameActionResponse response;

            GamesModel games = _gamesDocumentDbManager.GetGames(email);
            GameModel gameDb = games.Games.Find(x => x.Id == gameId + "");
            if (gameDb != null)
            {
                games.Games.Remove(gameDb);
                response = await InsertGame(games, game);
            }
            else
            {
                response = await InsertGame(games, game);
            }

            return response;
        }


        private async Task InsertEmptyGamesAsync(string email)
        {
            var gamesInstance = new GamesModel
            {
                Id = email,
                Games = new List<GameModel> ()
            };


            await _gamesDocumentDbManager.AddGamesAsync(gamesInstance);
        }


        private async Task<ProcessGameActionResponse> InsertGame(GamesModel games, GameModel game)
        {
            games.Games.Add(game);
            await _gamesDocumentDbManager.UpdateGamesAsync(games);
            return new ProcessGameActionResponse()
            {
                Id = game.Id,
                Success = true,
                Errors = new string[0]
            };
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