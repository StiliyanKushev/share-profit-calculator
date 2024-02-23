import config from "../config/config";
import { handleResponse, withCredentials } from "./helperService";

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
      headers: withCredentials({ "Content-Type": "application/json" }),
      body: JSON.stringify(credentials),
    }
  ).catch(() => undefined);
  return handleResponse<IAuthResponse>(response);
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
      headers: withCredentials({ "Content-Type": "application/json" }),
      body: JSON.stringify(credentials),
    }
  ).catch(() => undefined);
  return handleResponse<IAuthResponse>(response);
};

// todo: refresh token impl
