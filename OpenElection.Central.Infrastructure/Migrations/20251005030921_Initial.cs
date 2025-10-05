using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenElection.Central.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Booth",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    BoothCode = table.Column<string>(type: "text", nullable: false),
                    BoothState = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booth", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VoteLedger",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VoterHash = table.Column<string>(type: "text", nullable: false),
                    ConstituencyId = table.Column<string>(type: "text", nullable: false),
                    CandidateId = table.Column<string>(type: "text", nullable: false),
                    VoteHash = table.Column<string>(type: "text", nullable: false),
                    PreviousVoteHash = table.Column<string>(type: "text", nullable: false),
                    DigitalSignature = table.Column<string>(type: "text", nullable: false),
                    BoothId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteLedger", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VoteLedger_BoothId",
                table: "VoteLedger",
                column: "BoothId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booth");

            migrationBuilder.DropTable(
                name: "VoteLedger");
        }
    }
}
