using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EletricGo.Migrations
{
    public partial class ChargingSystems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChargingSystem",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ChargingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StorageId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargingSystem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChargingSystem_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChargingSystem_StorageId",
                table: "ChargingSystem",
                column: "StorageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChargingSystem");
        }
    }
}
