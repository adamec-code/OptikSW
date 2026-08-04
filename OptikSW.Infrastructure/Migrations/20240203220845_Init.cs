using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OptikSW.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderEyeMeasurement",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RightEye_Sphere = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    RightEye_Cylinder = table.Column<decimal>(type: "decimal(4,2)", nullable: true),
                    RightEye_Angle = table.Column<int>(type: "int", nullable: true),
                    RightEye_Prisma = table.Column<int>(type: "int", nullable: true),
                    RightEye_Basis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RightEye_PupilDistance = table.Column<int>(type: "int", nullable: true),
                    LeftEye_Sphere = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    LeftEye_Cylinder = table.Column<decimal>(type: "decimal(4,2)", nullable: true),
                    LeftEye_Angle = table.Column<int>(type: "int", nullable: true),
                    LeftEye_Prisma = table.Column<int>(type: "int", nullable: true),
                    LeftEye_Basis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LeftEye_PupilDistance = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Layer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LayerPrice = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: true),
                    Frames = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FramesPrice = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(34)", maxLength: 34, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderEyeMeasurement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BeforeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AfterName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customer_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderAddress",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AddressId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderAddress_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Prefix = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrderAddressId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DistanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NearbyId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrderStatus = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateDeleted = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Address_OrderAddressId",
                        column: x => x.OrderAddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Order_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customer",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Order_OrderEyeMeasurement_DistanceId",
                        column: x => x.DistanceId,
                        principalTable: "OrderEyeMeasurement",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Order_OrderEyeMeasurement_NearbyId",
                        column: x => x.NearbyId,
                        principalTable: "OrderEyeMeasurement",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customer_AddressId",
                table: "Customer",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_CustomerId",
                table: "Order",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_DistanceId",
                table: "Order",
                column: "DistanceId",
                unique: true,
                filter: "[DistanceId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Order_NearbyId",
                table: "Order",
                column: "NearbyId",
                unique: true,
                filter: "[NearbyId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Order_OrderAddressId",
                table: "Order",
                column: "OrderAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAddress_AddressId",
                table: "OrderAddress",
                column: "AddressId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "OrderAddress");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "OrderEyeMeasurement");

            migrationBuilder.DropTable(
                name: "Address");
        }
    }
}
