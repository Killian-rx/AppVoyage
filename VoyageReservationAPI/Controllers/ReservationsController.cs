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
            return NotFound("R�servation non trouv�e.");
        }

        return reservation;
    }

    // POST: api/reservations
    [HttpPost]
    public async Task<ActionResult<Reservation>> CreateReservation(Reservation reservation)
    {
        // Validation si l'utilisateur ou le voyage n'existe pas
        var utilisateur = await _context.Utilisateurs.FindAsync(reservation.UtilisateurId);
        var voyage = await _context.Voyages.FindAsync(reservation.VoyageId);

        if (utilisateur == null)
        {
            return BadRequest("Utilisateur non trouv�.");
        }

        if (voyage == null)
        {
            return BadRequest("Voyage non trouv�.");
        }

        reservation.DateReservation = DateTime.UtcNow; // D�finit la date de r�servation
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetReservation), new { id = reservation.ReservationId }, reservation);
    }

    // PUT: api/reservations/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReservation(int id, Reservation reservation)
    {
        if (id != reservation.ReservationId)
        {
            return BadRequest("L'ID de la r�servation ne correspond pas.");
        }

        // V�rifie si la r�servation existe
        var existingReservation = await _context.Reservations.FindAsync(id);
        if (existingReservation == null)
        {
            return NotFound("R�servation non trouv�e.");
        }

        // Met � jour les champs n�cessaires
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
            return StatusCode(500, "Erreur lors de la mise � jour de la r�servation.");
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
            return NotFound("R�servation non trouv�e.");
        }

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/reservations/utilisateur/{utilisateurId}
    [HttpGet("utilisateur/{utilisateurId}")]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByUtilisateur(int utilisateurId)
    {
        var reservations = await _context.Reservations
            .Where(r => r.UtilisateurId == utilisateurId)
            .ToListAsync();

        if (!reservations.Any())
        {
            return NotFound("Aucune r�servation trouv�e pour cet utilisateur.");
        }

        return reservations;
    }
}