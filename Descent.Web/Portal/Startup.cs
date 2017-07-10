using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Owin;
using Owin;
using Descent.Web.Portal;

[assembly: OwinStartup(typeof(Startup))]

namespace Descent.Web.Portal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure((config) =>
            {
                ContainerConfig.Register(config);
                WebApiConfig.Register(config);
            });
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}