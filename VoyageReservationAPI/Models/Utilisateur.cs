using System.ComponentModel.DataAnnotations;

namespace VoyageReservationAPI.Models
{
    public class Utilisateur
    {
        [Key]
        public int UtilisateurId { get; set; }

        // Nom de l'utilisateur avec validation
        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Le nom doit avoir entre 3 et 100 caractères.")]
        public string Nom { get; set; }

        
        [EmailAddress(ErrorMessage = "Format de l'email invalide.")]
        public string Email { get; set; }

        // Mot de passe de l'utilisateur avec validation
        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Le mot de passe doit avoir au moins 6 caractères.")]
        public string MotDePasse { get; set; }
    }
}
