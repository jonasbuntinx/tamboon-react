import { fetchJSON, Request } from "../Hooks/Api";

export type Payment = {
  charitiesId: number;
  amount: number;
  currency: string;
  id: number;
};

export const get = (): Request<Payment[]> => fetchJSON({ method: "GET", url: "/payments" });
