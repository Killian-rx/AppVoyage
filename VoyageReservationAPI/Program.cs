using Microsoft.EntityFrameworkCore;
using VoyageReservationAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Configuration de la base de données
builder.Services.AddDbContext<VoyageContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


// Configuration de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Ajouter les services MVC et Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Utilisation de CORS
app.UseCors("AllowAllOrigins");

app.UseStaticFiles();

// Middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Swagger pour la documentation
app.UseSwagger();
app.UseSwaggerUI();

app.Run();
