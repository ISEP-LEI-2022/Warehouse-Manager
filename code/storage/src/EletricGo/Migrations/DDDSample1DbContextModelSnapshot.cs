﻿// <auto-generated />
using System;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EletricGo.Migrations
{
    [DbContext(typeof(DDDSample1DbContext))]
    partial class DDDSample1DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EletricGo.Domain.Deliveries.Delivery", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DeliveryDate")
                        .HasColumnType("datetime2");

                    b.Property<double>("DeliveryWeight")
                        .HasColumnType("float");

                    b.Property<string>("FinalStorageId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("TimeToLoad")
                        .HasColumnType("float");

                    b.Property<double>("TimeToUnload")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("FinalStorageId");

                    b.ToTable("Delivery");
                });

            modelBuilder.Entity("EletricGo.Domain.Deliveries.Product", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DeliveryId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("LevelOfPolution")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("DeliveryId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Address", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CityId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Door")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Floor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.ChargingSystem", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ChargingTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StorageId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("StorageId");

                    b.ToTable("ChargingSystem");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.City", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("City");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Location", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AddressId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Altitude")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Latitude")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Longitude")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Storage", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Designation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocationId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("Storage");
                });

            modelBuilder.Entity("EletricGo.Domain.Deliveries.Delivery", b =>
                {
                    b.HasOne("EletricGo.Domain.Storages.Storage", "FinalStorage")
                        .WithMany("Deliveries")
                        .HasForeignKey("FinalStorageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FinalStorage");
                });

            modelBuilder.Entity("EletricGo.Domain.Deliveries.Product", b =>
                {
                    b.HasOne("EletricGo.Domain.Deliveries.Delivery", "Delivery")
                        .WithMany("Products")
                        .HasForeignKey("DeliveryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Delivery");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Address", b =>
                {
                    b.HasOne("EletricGo.Domain.Storages.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId");

                    b.Navigation("City");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.ChargingSystem", b =>
                {
                    b.HasOne("EletricGo.Domain.Storages.Storage", null)
                        .WithMany("ChargingSystems")
                        .HasForeignKey("StorageId");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Location", b =>
                {
                    b.HasOne("EletricGo.Domain.Storages.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Storage", b =>
                {
                    b.HasOne("EletricGo.Domain.Storages.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("EletricGo.Domain.Deliveries.Delivery", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("EletricGo.Domain.Storages.Storage", b =>
                {
                    b.Navigation("ChargingSystems");

                    b.Navigation("Deliveries");
                });
#pragma warning restore 612, 618
        }
    }
}