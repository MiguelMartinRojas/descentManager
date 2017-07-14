using System.Web;
using System.Web.Mvc;

namespace Descent.Web.Portal.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult App()
        {
            return View();
        }

    }
}