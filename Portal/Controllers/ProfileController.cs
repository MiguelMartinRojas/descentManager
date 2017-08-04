using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using Descent.Web.Models;
using Descent.Web.Services;

namespace Descent.Web.Controllers
{
    [System.Web.Http.Authorize]
    [System.Web.Http.RoutePrefix("api/profile")]
    public class ProfileController : ApiController
    {

        [System.Web.Http.HttpGet]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetProfileAction()
        {
            var profile = new User(User);
            return Ok(profile);
        }

    }
}