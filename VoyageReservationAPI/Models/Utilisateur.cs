using System.ComponentModel.DataAnnotations;

namespace VoyageReservationAPI.Models
{
    public class Utilisateur
    {
        [Key]
        public int UtilisateurId { get; set; }

        [Required]
        public string Nom { get; set; } // Nom obligatoire

        public string Email { get; set; } // Email non obligatoire

        [Required]
        public string MotDePasse { get; set; } // Mot de passe obligatoire
    }

}
