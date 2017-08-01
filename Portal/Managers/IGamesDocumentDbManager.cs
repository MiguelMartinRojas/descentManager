using Descent.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Descent.Web.Managers
{
    public interface IGamesDocumentDbManager
    {
        Task AddGamesAsync(GamesModel games);
        Task UpdateGamesAsync(GamesModel games);
        Task DeleteGamesAsync(GamesModel games);
        GamesModel GetGames(string id);
    }
}