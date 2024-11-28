using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Data;
using VoyageReservationAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class UtilisateursController : ControllerBase
{
    private readonly VoyageContext _context;

    public UtilisateursController(VoyageContext context)
    {
        _context = context;
    }

    // R�cup�rer tous les utilisateurs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateurs()
    {
        return await _context.Utilisateurs.ToListAsync();
    }

    // M�thode d'enregistrement
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Utilisateur utilisateur)
    {
        if (string.IsNullOrEmpty(utilisateur.Nom) || string.IsNullOrEmpty(utilisateur.MotDePasse))
            return BadRequest("Le nom d'utilisateur et le mot de passe sont obligatoires.");

        if (string.IsNullOrEmpty(utilisateur.Email) || !IsValidEmail(utilisateur.Email))
            return BadRequest("Un email valide est obligatoire.");

        if (await _context.Utilisateurs.AnyAsync(u => u.Nom == utilisateur.Nom))
            return BadRequest("Le nom d'utilisateur existe d�j�.");

        // Hachage du mot de passe
        utilisateur.MotDePasse = BCrypt.Net.BCrypt.HashPassword(utilisateur.MotDePasse);

        // Ajout de l'utilisateur � la base
        _context.Utilisateurs.Add(utilisateur);
        await _context.SaveChangesAsync();

        // Renvoyer une r�ponse en JSON
        return Ok(new { message = "Utilisateur enregistr� avec succ�s." });
    }

    // M�thode de connexion
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (string.IsNullOrEmpty(loginRequest.Nom) || string.IsNullOrEmpty(loginRequest.MotDePasse))
            return BadRequest("Nom d'utilisateur et mot de passe sont obligatoires.");

        // R�cup�ration de l'utilisateur par son nom
        var existingUser = await _context.Utilisateurs
            .FirstOrDefaultAsync(u => u.Nom == loginRequest.Nom);

        // V�rification des identifiants
        if (existingUser == null || !BCrypt.Net.BCrypt.Verify(loginRequest.MotDePasse, existingUser.MotDePasse))
            return Unauthorized("Nom d'utilisateur ou mot de passe invalide.");

        // Retourner l'ID utilisateur dans une r�ponse JSON
        return Ok(new { utilisateurId = existingUser.UtilisateurId, message = "Connexion r�ussie." });
    }

    // Validation de l'email
    private bool IsValidEmail(string email)
    {
        try
        {
            var mailAddress = new System.Net.Mail.MailAddress(email);
            return true;
        }
        catch
        {
            return false;
        }
    }
}

// Classe pour la requ�te de connexion
public class LoginRequest
{
    public string Nom { get; set; } // Nom d'utilisateur
    public string MotDePasse { get; set; } // Mot de passe
}
