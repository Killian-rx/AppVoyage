using System;
using System.ComponentModel.DataAnnotations;

namespace VoyageReservationAPI.Models
{
    public class Voyage
    {
        // Clé primaire pour le Voyage
        [Key]
        public int VoyageId { get; set; }

        // Destination du voyage
        [Required]
        public string Destination { get; set; }

        // Date de départ du voyage
        [Required]
        public DateTime DateDepart { get; set; }

        // Date de retour du voyage
        [Required]
        public DateTime DateRetour { get; set; }

        // Prix du voyage
        [Required]
        public decimal Prix { get; set; }

        public string ImagePath { get; set; }
    }
}
