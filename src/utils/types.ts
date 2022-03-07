export interface ISignResponse {
    status_code: number;
    message?: string;
    data?: { symbols: string[][]; sigml: string };
}
