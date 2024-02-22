import config from "../config/config";
import { handleResponse, withCredentials } from "./helperService";

export const findSolution = async (settings: {
  startUnixTimestamp: number;
  endUnixTimestamp: number;
  maxBalanceUSD: number;
}) => {
  const response = await fetch(`${config.API_BASE_URL}/solve`, {
    method: "POST",
    credentials: "same-origin",
    headers: withCredentials({ "Content-Type": "application/json" }),
    body: JSON.stringify(settings),
  });
  return handleResponse(response);
};
