import { z } from "zod";
import { optionalDecimalRange, optionalIntRange, requiredDecimalRange } from "./common";

export const eyeMeasurementSchema = z.object({
    pupilDistance: optionalIntRange(20, 40, "PD"),
    sphere: requiredDecimalRange(-20, 20, "Sféra"),
    cylinder: optionalDecimalRange(-10, 10, "Cylindr"),
    angle: optionalIntRange(0, 180, "Osa"),
    prisma: optionalDecimalRange(0, 20, "Prisma"),
    basis: z.string().trim().max(50, "Basis je příliš dlouhé").optional().or(z.literal("")),
});

export type EyeMeasurementFormValues = z.infer<typeof eyeMeasurementSchema>;
