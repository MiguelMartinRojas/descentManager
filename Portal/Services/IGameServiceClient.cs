using System;
using Descent.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Descent.Web.Services
{
    public interface IGameServiceClient
    {
        Task<GamesModel> GetGames(string email);
        List<CardModel> GetCharacterCards();
        List<CardModel> GetObjectsCards();
        List<CardModel> GetSkillsCards();


    }
}
