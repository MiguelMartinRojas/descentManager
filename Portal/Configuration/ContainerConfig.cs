using System.Net.Http;
using System.Web.Http;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using Descent.Web.Portal.Services;
using Descent.Web.Managers;

namespace Descent.Web.Portal
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
            container.Register<IGamesDocumentDbManager, AzureDocumentDbManager>(Lifestyle.Singleton);
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