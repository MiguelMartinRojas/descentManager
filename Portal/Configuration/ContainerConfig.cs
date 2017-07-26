using System.Net.Http;
using System.Web.Http;
using Descent.Web.Services;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace Descent.Web.Configuration
{
    public static class ContainerConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = GetContainer(config);

            config.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }

        private static void ConfigureDi(Container container)
        {
            container.Register<IGameServiceClient, GameServiceClient>();

            container.RegisterSingleton(new HttpClient());
        }

        private static Container GetContainer(HttpConfiguration config)
        {
            var container = new Container();

            ConfigureDi(container);

            container.Register(() => config, Lifestyle.Singleton);
            container.RegisterWebApiControllers(config);

            container.Verify();

            return container;
        }
    }
}