using Descent.Web.Models;
using System.Collections.Generic;

namespace Descent.Web.Portal.Services
{
    public interface IGameServiceClient
    {
        List<GameModel> GetGames(string email);
        
    }
}
