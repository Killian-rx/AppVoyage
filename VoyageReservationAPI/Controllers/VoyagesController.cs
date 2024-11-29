using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Data;
using VoyageReservationAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class VoyagesController : ControllerBase
{
    private readonly VoyageContext _context;

    public VoyagesController(VoyageContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Voyage>>> GetVoyages()
    {
        return await _context.Voyages.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Voyage>> GetVoyage(int id)
    {
        var voyage = await _context.Voyages.FindAsync(id);

        if (voyage == null)
        {
            return NotFound();
        }

        // Construire le chemin de l'image en fonction de la destination
        string imagePath = $"/images/voyages/{voyage.Destination.ToLower()}.jpg";

        // Retourner le voyage avec le chemin de l'image
        return Ok(new
        {
            voyage.VoyageId,
            voyage.Destination,
            voyage.DateDepart,
            voyage.DateRetour,
            voyage.Prix,
            ImagePath = imagePath // Ajouter le chemin de l'image
        });
    }


    [HttpGet("recherche")]
public async Task<IActionResult> RechercheVoyages(string query)
{
    var voyages = _context.Voyages.AsQueryable();

    if (!string.IsNullOrEmpty(query))
    {
        voyages = voyages.Where(v => v.Destination.Contains(query));
    }

    var resultats = await voyages.ToListAsync();
    return Ok(resultats);
}



    [HttpPost]
    public async Task<ActionResult<Voyage>> PostVoyage(Voyage voyage)
    {
        _context.Voyages.Add(voyage);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVoyages), new { id = voyage.VoyageId }, voyage);  // Fixed reference here
    }
}