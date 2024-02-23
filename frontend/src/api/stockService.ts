import config from "../config/config";
import { handleResponse, withCredentials } from "./helperService";

export interface IStockQueryResult {
  buyDate: string;
  sellDate: string;
  buyPrice: number;
  sellPrice: number;
  sharesBought: number;
  profit: number;
}

export const findSolution = async (settings: {
  startUnixTimestamp: number;
  endUnixTimestamp: number;
  funds: number;
}): Promise<IStockQueryResult | undefined> => {
  const response = await fetch(`${config.API_BASE_URL}/solve`, {
    method: "POST",
    credentials: "same-origin",
    headers: withCredentials({ "Content-Type": "application/json" }),
    body: JSON.stringify(settings),
  }).catch(() => undefined);
  return handleResponse<IStockQueryResult>(response);
};
