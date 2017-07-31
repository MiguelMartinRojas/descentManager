using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Descent.Web.Models
{
    public class GamesModel
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id;
        public List<GameModel> Games;

    }
}