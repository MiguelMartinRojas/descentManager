using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Descent.Web.Models;
using Descent.Web.Services;

namespace Descent.Web.Controllers
{
    [Authorize]
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
    }
}