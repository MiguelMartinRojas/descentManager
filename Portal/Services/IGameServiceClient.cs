using Descent.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Descent.Web.Portal.Services
{
    public interface IGameServiceClient
    {
        Task<GamesModel> GetGames(string email);
        
    }
}
