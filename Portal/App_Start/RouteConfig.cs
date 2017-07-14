using System.Web.Mvc;
using System.Web.Routing;

namespace Descent.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional},
                new { controller = "Home|Account|System" }
            );

            routes.MapRoute(
                "AngularApp", // Route name
                "{*.}", // URL with parameters
                new {controller = "Home", action = "App"} // Parameter defaults
            );
        }
    }
}