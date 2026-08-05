import { z } from "zod";
import { addressCreateSchema, addressFormFieldSchema, AddressCreateFormValues } from "./addressSchema";
import { customerCreateSchema, customerFormFieldSchema, CustomerCreateFormValues } from "./customerSchema";
import { eyeMeasurementSchema, EyeMeasurementFormValues } from "./eyeMeasurementSchema";

const eyeMeasurementPairSchema = z.object({
    rightEye: eyeMeasurementSchema,
    leftEye: eyeMeasurementSchema,
});

export interface EyeMeasurementPairFormValues {
    rightEye: EyeMeasurementFormValues;
    leftEye: EyeMeasurementFormValues;
}

export interface OrderCreateFormValues {
    customerMode: "new" | "existing";
    existingCustomerId?: string;
    existingAddressId?: string;
    newCustomer: CustomerCreateFormValues;
    newAddress: AddressCreateFormValues;
    note?: string;
    distance: EyeMeasurementPairFormValues;
    nearby: EyeMeasurementPairFormValues;
}

export const orderCreateFormSchema = z.object({
    customerMode: z.enum(["new", "existing"]),
    existingCustomerId: z.string().optional(),
    existingAddressId: z.string().optional(),
    newCustomer: customerFormFieldSchema,
    newAddress: addressFormFieldSchema,
    note: z.string().trim().max(2000, "Poznámka je příliš dlouhá").optional().or(z.literal("")),
    distance: eyeMeasurementPairSchema,
    nearby: eyeMeasurementPairSchema,
}).superRefine((data, ctx) => {
    if (data.customerMode === "existing") {
        if (!data.existingCustomerId) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Vyberte stávajícího zákazníka",
                path: ["existingCustomerId"],
            });
        }
        return;
    }

    const customerResult = customerCreateSchema.safeParse(data.newCustomer);
    if (!customerResult.success) {
        for (const issue of customerResult.error.issues) {
            ctx.addIssue({ ...issue, path: ["newCustomer", ...issue.path] });
        }
    }

    const addressResult = addressCreateSchema.safeParse(data.newAddress);
    if (!addressResult.success) {
        for (const issue of addressResult.error.issues) {
            ctx.addIssue({ ...issue, path: ["newAddress", ...issue.path] });
        }
    }
}).transform((data): OrderCreateFormValues => {
    if (data.customerMode === "new") {
        const customerResult = customerCreateSchema.safeParse(data.newCustomer);
        const addressResult = addressCreateSchema.safeParse(data.newAddress);
        return {
            ...data,
            newCustomer: customerResult.success ? customerResult.data : (data.newCustomer as unknown as CustomerCreateFormValues),
            newAddress: addressResult.success ? addressResult.data : (data.newAddress as unknown as AddressCreateFormValues),
        };
    }
    return data as unknown as OrderCreateFormValues;
});

export type OrderCreateFormInput = z.input<typeof orderCreateFormSchema>;