using System.Security.Claims;
using System.Security.Principal;

namespace Descent.Web.Models
{
    public class User : ClaimsPrincipal
    {
        public User(IPrincipal principal) : base(principal as ClaimsPrincipal)
        {
        }

        public string Name => Identity.Name;
        public string UserId => FindFirst(ClaimTypes.NameIdentifier).Value;
        public string ProfileImage => FindFirst(ClaimTypes.Uri).Value;
        public string Email => FindFirst(ClaimTypes.Email).Value;
    }
}