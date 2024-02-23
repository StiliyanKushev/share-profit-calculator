import config from "../config/config";
import { ResponseAny, handleResponse, withCredentials } from "./helperService";

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<IAuthResponse | undefined> => {
  const response = await fetch(
    `${config.API_BASE_URL}/authentication/sign-in`,
    {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  ).catch(() => undefined);
  return handleResponse<IAuthResponse, false>(response);
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
}): Promise<IAuthResponse | undefined> => {
  const response = await fetch(
    `${config.API_BASE_URL}/authentication/sign-up`,
    {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  ).catch(() => undefined);
  return handleResponse<IAuthResponse, false>(response);
};

export const refreshToken = async (dto: {
  refreshToken: string;
}): Promise<ResponseAny<IAuthResponse, true>> => {
  const response = await fetch(
    `${config.API_BASE_URL}/authentication/refresh-token`,
    {
      method: "POST",
      credentials: "same-origin",
      headers: withCredentials({ "Content-Type": "application/json" }),
      body: JSON.stringify(dto),
    }
  ).catch(() => undefined);
  return handleResponse<IAuthResponse>(
    response,
    false /* we don't want to handle unauthorized */
  );
};
