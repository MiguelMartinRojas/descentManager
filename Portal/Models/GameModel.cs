using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Descent.Web.Models
{
    public class GameModel
    {
        public string Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string CharacterImage { get; set; }
        public List<UserModel> Users { get; set; }
        public List<CardModel> Objects { get; set; }
        public List<CardModel> Skills { get; set; }
    }
}