using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OptikSW.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CustomerCreatable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Customer",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateDeleted",
                table: "Customer",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateUpdated",
                table: "Customer",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "DateDeleted",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "DateUpdated",
                table: "Customer");
        }
    }
}
