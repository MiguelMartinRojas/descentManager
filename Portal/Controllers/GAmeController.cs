using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Descent.Web.Models;
using Descent.Web.Services;

namespace Descent.Web.Controllers
{
    //[Authorize]
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        private readonly IGameServiceClient _gamesService;

        public GameController(IGameServiceClient gamesService)
        {
            _gamesService = gamesService;
        }


        [HttpGet]
        [Route("{email}")]
        [ResponseType(typeof(GamesModel))]
        public async Task<IHttpActionResult> GetGames(string email)
        {
            return Ok(await _gamesService.GetGames(email));
        }

        private struct Icons
        {
            public static string Pdf = "pdf.png";
            public static string Xls = "xls.png";
            public static string Doc = "doc.png";
            public static string Ppt = "ppt.png";
            public static string Draft = "draft.png";
        }
        [HttpGet]
        [Route("character-cards")]
        [ResponseType(typeof(List<CardModel>))]
        public IHttpActionResult GetCharacterCards()
        {
            return Ok(_gamesService.GetCharacterCards());
        }
        [HttpGet]
        [Route("objects-cards")]
        [ResponseType(typeof(List<CardModel>))]
        public IHttpActionResult GetObjectsCards()
        {
            return Ok(_gamesService.GetObjectsCards());
        }

        [HttpGet]
        [Route("skills-cards/{klazzType}/{klazz}")]
        [ResponseType(typeof(List<CardModel>))]
        public IHttpActionResult GetSkillsCards(string klazzType, string klazz)
        {
            return Ok(_gamesService.GetSkillsCards(klazzType, klazz));
        }


        [HttpGet]
        [Route("class/{klazzType}")]
        [ResponseType(typeof(List<CardModel>))]
        public IHttpActionResult GetSkillsCards(string klazzType)
        {
            return Ok(_gamesService.GetClassType(klazzType));
        }


        [HttpPost]
        [ResponseType(typeof(ProcessGameActionResponse))]
        [Route("save/{email}/{gameId}")]
        public async Task<IHttpActionResult> SaveGame(string email, int gameId, [FromBody] GameModel game)
        {
            return Ok(await _gamesService.SaveGames(email, gameId, game));
        }

        [HttpGet]
        [Route("remove/{gameId}")]
        [ResponseType(typeof(ProcessGameActionResponse))]
        public IHttpActionResult RemoveGame(int gameId)
        {
            return Ok(_gamesService.Remove(gameId));
        }
    }
}