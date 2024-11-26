using System.ComponentModel.DataAnnotations;

namespace VoyageReservationAPI.Models
{
    public class Voyage
    {
        [Key]
        public int VoyageId { get; set; }

        public string Destination { get; set; }

        public DateTime DateDepart { get; set; }

        public DateTime DateRetour { get; set; }

        public decimal Prix { get; set; }
    }

    public class Utilisateur
    {
        [Key]
        public int UtilisateurId { get; set; }

        public string Nom { get; set; }

        public string Email { get; set; }

        public string MotDePasse { get; set; }
    }

    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        public int UtilisateurId { get; set; }

        public int VoyageId { get; set; }

        public DateTime DateReservation { get; set; }
    }
}
