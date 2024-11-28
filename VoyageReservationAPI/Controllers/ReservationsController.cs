using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Data;
using VoyageReservationAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class ReservationsController : ControllerBase
{
    private readonly VoyageContext _context;

    public ReservationsController(VoyageContext context)
    {
        _context = context;
    }

    // GET: api/reservations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
    {
        return await _context.Reservations
            .ToListAsync();
    }

    // GET: api/reservations/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Reservation>> GetReservation(int id)
    {
        var reservation = await _context.Reservations
            .FirstOrDefaultAsync(r => r.ReservationId == id);

        if (reservation == null)
        {
            return NotFound("Réservation non trouvée.");
        }

        return reservation;
    }

    [HttpPost]
    public async Task<ActionResult<Reservation>> CreateReservation(Reservation reservation)
    {
        // Vérification si l'utilisateur et le voyage existent
        var utilisateur = await _context.Utilisateurs.FindAsync(reservation.UtilisateurId);
        var voyage = await _context.Voyages.FindAsync(reservation.VoyageId);

        if (utilisateur == null)
        {
            return BadRequest("Utilisateur non trouvé.");
        }

        if (voyage == null)
        {
            return BadRequest("Voyage non trouvé.");
        }

        // Ajouter le voyage à la réservation pour que les détails soient envoyés dans la réponse
        reservation.Voyage = voyage;
        reservation.DateReservation = DateTime.UtcNow;

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        // Retourner la réservation créée
        return CreatedAtAction(nameof(GetReservation), new { id = reservation.ReservationId }, reservation);
    }


    // PUT: api/reservations/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReservation(int id, Reservation reservation)
    {
        if (id != reservation.ReservationId)
        {
            return BadRequest("L'ID de la réservation ne correspond pas.");
        }

        // Vérifie si la réservation existe
        var existingReservation = await _context.Reservations.FindAsync(id);
        if (existingReservation == null)
        {
            return NotFound("Réservation non trouvée.");
        }

        // Met à jour les champs nécessaires
        existingReservation.UtilisateurId = reservation.UtilisateurId;
        existingReservation.VoyageId = reservation.VoyageId;
        existingReservation.DateReservation = reservation.DateReservation;

        _context.Entry(existingReservation).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return StatusCode(500, "Erreur lors de la mise à jour de la réservation.");
        }

        return NoContent();
    }

    // DELETE: api/reservations/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReservation(int id)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound("Réservation non trouvée.");
        }

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("utilisateur/{utilisateurId}")]
    public async Task<IActionResult> GetReservationsByUtilisateur(int utilisateurId)
    {
        var reservations = await _context.Reservations
            .Where(r => r.UtilisateurId == utilisateurId)
            .Include(r => r.Voyage) // Inclure les informations de Voyage
            .Select(r => new
            {
                Id = r.ReservationId,
                r.Voyage.VoyageId,
                DateReservation = r.DateReservation.ToString("yyyy-MM-dd"), // Format de date
                VoyageNom = r.Voyage.Destination // Remplacer `Nom` par `Destination`
            })
            .ToListAsync();

        if (!reservations.Any())
        {
            return NotFound("Aucune réservation trouvée pour cet utilisateur.");
        }

        return Ok(reservations);
    }



}
