using MimeTypes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace Descent.Web.Portal.Controllers
{
    [RoutePrefix("api/cards")]
    public class TasksController : ApiController
    {
        private struct Icons
        {
            public static string Pdf = "pdf.png";
            public static string Xls = "xls.png";
            public static string Doc = "doc.png";
            public static string Ppt = "ppt.png";
            public static string Draft = "draft.png";
        }

        private readonly Services.ITasksServiceClient _tasksService;
        public TasksController(Services.ITasksServiceClient taskService)
        {
            _tasksService = taskService;
        }

        [HttpGet]
        [ResponseType(typeof(Object))]
        public IHttpActionResult GetCards()
        {
            return Ok(_tasksService.GetCards());
        }
        
    }
}