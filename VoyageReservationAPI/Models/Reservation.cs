using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VoyageReservationAPI.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        // Clé étrangère pour Utilisateur
        [ForeignKey("Utilisateur")]
        public int UtilisateurId { get; set; }

        // Clé étrangère pour Voyage
        [ForeignKey("Voyage")]
        public int VoyageId { get; set; }

        // Date de la réservation
        [Required]
        public DateTime DateReservation { get; set; }

        // Utilisateur associé à la réservation
        public Voyage Voyage { get; set; }
    }
}
