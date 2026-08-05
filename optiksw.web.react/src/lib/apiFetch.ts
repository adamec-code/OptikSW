import config from "../config";

export interface ApiSuccess<T> {
    ok: true;
    data: T;
}

export interface ApiError {
    ok: false;
    status: number;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

async function request<T>(path: string, method: string, body?: unknown): Promise<ApiResult<T>> {
    let response: Response;
    try {
        response = await fetch(config.baseUrl + path, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        return { ok: false, status: 0, message: "Nepodařilo se spojit se serverem" };
    }

    if (!response.ok) {
        if (response.status === 400) {
            try {
                const problem = await response.json();
                return {
                    ok: false,
                    status: 400,
                    message: "Zadaná data nejsou platná",
                    fieldErrors: problem.errors,
                };
            } catch {
                return { ok: false, status: 400, message: "Zadaná data nejsou platná" };
            }
        }
        return { ok: false, status: response.status, message: "Při ukládání dat došlo k chybě" };
    }

    return { ok: true, data: (await response.json()) as T };
}

export const apiPost = <T>(path: string, body: unknown) => request<T>(path, "POST", body);
export const apiPut = <T>(path: string, body: unknown) => request<T>(path, "PUT", body);
