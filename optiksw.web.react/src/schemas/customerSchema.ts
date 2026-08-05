import { z } from "zod";
import { requiredString } from "./common";

export const customerCreateSchema = z.object({
    beforeName: z.string().trim().max(20, "Titul je příliš dlouhý").optional().or(z.literal("")),
    firstName: requiredString("Jméno").max(100, "Jméno je příliš dlouhé"),
    lastName: requiredString("Příjmení").max(100, "Příjmení je příliš dlouhé"),
    afterName: z.string().trim().max(20, "Titul je příliš dlouhý").optional().or(z.literal("")),
    birthNumber: z.string().trim().max(20, "Hodnota je příliš dlouhá").optional().or(z.literal("")),
    phone: z.string().trim().max(20, "Telefon je příliš dlouhý").optional().or(z.literal("")),
});

export type CustomerCreateFormValues = z.infer<typeof customerCreateSchema>;

// Permissive shape used where customer fields are embedded in a larger form
// (e.g. only required when a particular tab/mode is active). Strict rules
// from customerCreateSchema are re-applied conditionally by the parent schema.
export const customerFormFieldSchema = z.object({
    beforeName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    afterName: z.string().optional(),
    birthNumber: z.string().optional(),
    phone: z.string().optional(),
});

export type CustomerFormFieldValues = z.infer<typeof customerFormFieldSchema>;