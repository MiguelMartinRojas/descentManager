using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;

namespace Descent.Web.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login(string returnUrl = "/")
        {
            // Request a redirect to the external login provider
            return new ChallengeResult("Google",
                Url.Action("ExternalLoginCallback", "Account", new {ReturnUrl = returnUrl}));
        }

        public ActionResult ExternalLoginCallback(string returnUrl)
        {
            return new RedirectResult(returnUrl);
        }

        public ActionResult LogOff()
        {
            Request.GetOwinContext().Authentication.SignOut();
            return Redirect("/");
        }

        // Implementation copied from a standard MVC Project, with some stuff
        // that relates to linking a new external login to an existing identity
        // account removed.
        private class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
            }

            private string LoginProvider { get; }
            private string RedirectUri { get; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties {RedirectUri = RedirectUri};
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
    }
}