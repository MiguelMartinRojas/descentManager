using System.Security.Claims;
using System.Security.Principal;

namespace Descent.Web.Models
{
    public class User
    {
        private readonly ClaimsPrincipal _principal;

        public User(IPrincipal principal)
        {
            this._principal = new ClaimsPrincipal(principal);
        }

        public string Name => _principal.Identity.Name;
        public string UserId => _principal.FindFirst(ClaimTypes.NameIdentifier).Value;
        public string ProfileImage => _principal.FindFirst(ClaimTypes.Uri).Value;
        public string Email => _principal.FindFirst(ClaimTypes.Email).Value;
    }
}