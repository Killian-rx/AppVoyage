using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Data;
using VoyageReservationAPI.Models;
using BCrypt.Net;

[Route("api/[controller]")]
[ApiController]
public class UtilisateursController : ControllerBase  // Renamed UsersController to UtilisateursController
{
    private readonly VoyageContext _context;

    public UtilisateursController(VoyageContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateurs()
    {
        return await _context.Utilisateurs.ToListAsync();
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Utilisateur utilisateur)
    {
        if (string.IsNullOrEmpty(utilisateur.Nom) || string.IsNullOrEmpty(utilisateur.MotDePasse))
            return BadRequest("Le nom d'utilisateur et le mot de passe sont obligatoires.");

        if (!IsValidEmail(utilisateur.Email))  // Fonction de validation pour l'email
            return BadRequest("L'email n'est pas valide.");

        if (await _context.Utilisateurs.AnyAsync(u => u.Nom == utilisateur.Nom))
            return BadRequest("Le nom d'utilisateur existe déjà.");

        utilisateur.MotDePasse = BCrypt.Net.BCrypt.HashPassword(utilisateur.MotDePasse);
        _context.Utilisateurs.Add(utilisateur);
        await _context.SaveChangesAsync();

        return Ok("Utilisateur enregistré avec succès.");
    }

    // Exemple de fonction de validation d'email
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




    // Méthode de connexion
    [HttpPost("login")]
    public async Task<IActionResult> Login(Utilisateur utilisateur)
    {
        var existingUser = await _context.Utilisateurs
            .FirstOrDefaultAsync(u => u.Nom == utilisateur.Nom);

        if (existingUser == null || !BCrypt.Net.BCrypt.Verify(utilisateur.MotDePasse, existingUser.MotDePasse))
            return Unauthorized("Nom d'utilisateur ou mot de passe invalide.");

        return Ok("Connexion réussie.");
    }
}