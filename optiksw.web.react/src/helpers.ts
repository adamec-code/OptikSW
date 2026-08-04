
export function parseDecimal(string?: string): Number | undefined | null {
    if (!string) {
        return null;
    }

    string = string.replace(",", ".");

    let parsed = Number.parseFloat(string);
    if (isNaN(parsed)) {
        parsed = 0;
    }

    return parsed;
}
export function parseInteger(string?: string): Number | undefined | null {
    if (!string) {
        return null;
    }

    let parsed = Number.parseInt(string);
    if (isNaN(parsed)) {
        parsed = 0;
    }

    return parsed;
}