import { z } from "zod";

export const requiredString = (label: string) =>
    z.string().trim().min(1, `${label} je povinné pole`);

function parseNumberString(raw: string | undefined): number | undefined {
    if (raw === undefined) {
        return undefined;
    }
    const trimmed = raw.trim();
    if (trimmed === "") {
        return undefined;
    }
    return Number(trimmed.replace(",", "."));
}

function numberField(min: number, max: number, label: string, options: { required: boolean; integer: boolean }) {
    return z.string().optional().transform((raw, ctx) => {
        const parsed = parseNumberString(raw);

        if (parsed === undefined) {
            if (options.required) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${label} je povinné pole` });
                return z.NEVER;
            }
            return undefined;
        }

        if (Number.isNaN(parsed)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${label} musí být číslo` });
            return z.NEVER;
        }

        if (options.integer && !Number.isInteger(parsed)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${label} musí být celé číslo` });
            return z.NEVER;
        }

        if (parsed < min || parsed > max) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${label} musí být v rozsahu ${min} až ${max}` });
            return z.NEVER;
        }

        return parsed;
    });
}

export function requiredDecimalRange(min: number, max: number, label: string) {
    return numberField(min, max, label, { required: true, integer: false });
}

export function optionalDecimalRange(min: number, max: number, label: string) {
    return numberField(min, max, label, { required: false, integer: false });
}

export function requiredIntRange(min: number, max: number, label: string) {
    return numberField(min, max, label, { required: true, integer: true });
}

export function optionalIntRange(min: number, max: number, label: string) {
    return numberField(min, max, label, { required: false, integer: true });
}