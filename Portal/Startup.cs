using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Descent.Web;
using Descent.Web.Configuration;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace Descent.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(config =>
            {
                ContainerConfig.Register(config);
                WebApiConfig.Register(config);
            });
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}