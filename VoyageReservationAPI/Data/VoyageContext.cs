using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Models;

namespace VoyageReservationAPI.Data
{
public class VoyageContext : DbContext
{
    public VoyageContext(DbContextOptions<VoyageContext> options) : base(options) { }

    public DbSet<Voyage> Voyages { get; set; }
        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
