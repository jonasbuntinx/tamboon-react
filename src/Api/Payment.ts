import { fetchJSON, Request } from "../Hooks/Api";

export type Payment = {
  charitiesId: number;
  amount: number;
  currency: string;
  id: number;
};

export type RequestBody = {
  charitiesId: number;
  amount: number;
  currency: string;
};

export const get = (): Request<Payment[]> => fetchJSON({ method: "GET", url: "/payments" });

export const post = (body: RequestBody): Request<Payment> => fetchJSON({ method: "POST", url: "/payments", body });
