using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VoyageReservationAPI.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        // Cl� �trang�re pour Utilisateur
        [ForeignKey("Utilisateur")]
        public int UtilisateurId { get; set; }

        // Cl� �trang�re pour Voyage
        [ForeignKey("Voyage")]
        public int VoyageId { get; set; }

        // Date de la r�servation
        [Required]
        public DateTime DateReservation { get; set; }

        // Utilisateur associ� � la r�servation
        public Voyage Voyage { get; set; }
    }
}
