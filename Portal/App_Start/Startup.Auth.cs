using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;

namespace Descent.Web
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ExternalCookie
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            var authOptions = new GoogleOAuth2AuthenticationOptions
            {
                ClientId = "1030197237184-1qtod5qe8of2f4unucqqq9pf2r04cj6u.apps.googleusercontent.com",
                ClientSecret = "qh9zPd4YGvzvW0EVBqh184Sd"
            };
            authOptions.Scope.Add("profile");
            authOptions.Scope.Add("email");
            authOptions.Provider = new GoogleOAuth2AuthenticationProvider
            {
                OnAuthenticated = context =>
                {
                    var profileUrl = context.User["image"]["url"].ToString();
                    context.Identity.AddClaim(new Claim(ClaimTypes.Uri, profileUrl));
                    return Task.FromResult(0);
                }
            };
            app.UseGoogleAuthentication(authOptions);
        }
    }
}