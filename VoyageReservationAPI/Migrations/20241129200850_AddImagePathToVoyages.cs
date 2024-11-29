using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VoyageReservationAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddImagePathToVoyages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Utilisateurs_UtilisateurId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_UtilisateurId",
                table: "Reservations");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Voyages",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Voyages");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UtilisateurId",
                table: "Reservations",
                column: "UtilisateurId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Utilisateurs_UtilisateurId",
                table: "Reservations",
                column: "UtilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "UtilisateurId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
