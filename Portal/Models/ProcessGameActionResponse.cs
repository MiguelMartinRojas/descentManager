using System;

namespace Descent.Web.Models
{
    public class ProcessGameActionResponse
    {
        public string Id { get; set; }
        public Boolean Success { get; set; }
        public string[] Errors { get; set; }
    }
}