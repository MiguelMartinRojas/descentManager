using System.Collections.Generic;
using System.Web.Mvc;
using Descent.Web.Models;
using Newtonsoft.Json;

namespace Descent.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Request.IsAuthenticated)
            {
                var user = new User(User);
                ViewBag.user = JsonConvert.SerializeObject(new Dictionary<string, string>
                {
                    {"id", user.UserId},
                    {"name", user.Name},
                    {"email", user.Email},
                    {"profile", user.ProfileImage}
                });
            }
            return View();
        }
    }
}