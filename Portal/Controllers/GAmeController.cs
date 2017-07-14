using Descent.Web.Models;
using MimeTypes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace Descent.Web.Portal.Controllers
{
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        private struct Icons
        {
            public static string Pdf = "pdf.png";
            public static string Xls = "xls.png";
            public static string Doc = "doc.png";
            public static string Ppt = "ppt.png";
            public static string Draft = "draft.png";
        }

        private readonly Services.IGameServiceClient _gamesService;
        public GameController(Services.IGameServiceClient gamesService)
        {
            _gamesService = gamesService;
        }

        [HttpGet]
        [Route("{email}")]
        [ResponseType(typeof(List<GameModel>))]
        public IHttpActionResult GetGames(string email)
        {
            return Ok(_gamesService.GetGames(email));
        }
        
    }
}