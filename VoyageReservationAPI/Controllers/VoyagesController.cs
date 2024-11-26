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


    [HttpPost]
    public async Task<ActionResult<Voyage>> PostVoyage(Voyage voyage)
    {
        _context.Voyages.Add(voyage);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVoyages), new { id = voyage.VoyageId }, voyage);  // Fixed reference here
    }
}