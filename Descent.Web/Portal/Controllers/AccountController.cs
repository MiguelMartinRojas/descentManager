using System.Web;
using System.Web.Mvc;

namespace Descent.Web.Portal.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult LogOff()
        {
            return RedirectToAction("Index", "Home");
        }
    }
}