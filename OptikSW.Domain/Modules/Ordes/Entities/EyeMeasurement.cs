using System.ComponentModel.DataAnnotations.Schema;

namespace OptikSW.Domain.Modules.Ordes.Entities
{
    public class EyeMeasurement
    {
        public decimal Sphere { get; set; } = 0;
        public decimal? Cylinder { get; set; }
        public int? Angle { get; set; }
        public int? Prisma { get; set; }
        public string? Basis { get; set; }
        public int? PupilDistance { get; set; }

        public EyeMeasurement(decimal sphere, decimal? cylinder, int? angle, int? prisma, string? basis, int? pupilDistance)
        {
            Sphere = sphere;
            Cylinder = cylinder;
            Angle = angle;
            Prisma = prisma;
            Basis = basis;
            PupilDistance = pupilDistance;
        }
    }
}