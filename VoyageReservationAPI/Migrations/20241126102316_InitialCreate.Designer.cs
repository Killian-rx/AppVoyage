﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VoyageReservationAPI.Data;

#nullable disable

namespace VoyageReservationAPI.Migrations
{
    [DbContext(typeof(VoyageContext))]
    [Migration("20241126102316_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("VoyageReservationAPI.Models.Reservation", b =>
                {
                    b.Property<int>("ReservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateReservation")
                        .HasColumnType("TEXT");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VoyageId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ReservationId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("VoyageReservationAPI.Models.Utilisateur", b =>
                {
                    b.Property<int>("UtilisateurId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MotDePasse")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UtilisateurId");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("VoyageReservationAPI.Models.Voyage", b =>
                {
                    b.Property<int>("VoyageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateDepart")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateRetour")
                        .HasColumnType("TEXT");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Prix")
                        .HasColumnType("TEXT");

                    b.HasKey("VoyageId");

                    b.ToTable("Voyages");
                });
#pragma warning restore 612, 618
        }
    }
}
