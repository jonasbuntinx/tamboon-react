import { fetchJSON, Request } from "../Hooks/Api";

export type Charity = {
  id: number;
  name: string;
  image: string;
  currency: string;
};

export const get = (): Request<Charity[]> => fetchJSON({ method: "GET", url: "/charities" });
