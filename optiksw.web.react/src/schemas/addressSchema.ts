import { z } from "zod";
import { requiredString, requiredIntRange } from "./common";

export const addressCreateSchema = z.object({
    addressLine1: requiredString("Adresa (ulice, č.p.)").max(200, "Adresa je příliš dlouhá"),
    addressLine2: z.string().trim().max(200, "Doplňující údaje jsou příliš dlouhé").optional().or(z.literal("")),
    city: requiredString("Město").max(100, "Město je příliš dlouhé"),
    postCode: requiredIntRange(10000, 99999, "PSČ"),
});

export type AddressCreateFormValues = z.infer<typeof addressCreateSchema>;

// Permissive shape used where address fields are embedded in a larger form
// (e.g. only required when a particular tab/mode is active). Strict rules
// from addressCreateSchema are re-applied conditionally by the parent schema.
export const addressFormFieldSchema = z.object({
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    postCode: z.string().optional(),
});

export type AddressFormFieldValues = z.infer<typeof addressFormFieldSchema>;