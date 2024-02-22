import config from "../config/config";
import { handleResponse, withCredentials } from "./helperService";

interface IAuthResponse {
  token: string;
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<IAuthResponse | undefined> => {
  // todo: remove, only for testing
  return new Promise((resolve) =>
    setTimeout(() => resolve({ token: "abcdefgh" }), 500)
  );

  const response = await fetch(`${config.API_BASE_URL}/login`, {
    method: "POST",
    credentials: "same-origin",
    headers: withCredentials({ "Content-Type": "application/json" }),
    body: JSON.stringify(credentials),
  });
  return handleResponse<IAuthResponse>(response);
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
}): Promise<IAuthResponse | undefined> => {
  // todo: remove, only for testing
  return new Promise((resolve) =>
    setTimeout(() => resolve({ token: "abcdefgh" }), 500)
  );

  const response = await fetch(`${config.API_BASE_URL}/register`, {
    method: "POST",
    credentials: "same-origin",
    headers: withCredentials({ "Content-Type": "application/json" }),
    body: JSON.stringify(credentials),
  });
  return handleResponse<IAuthResponse>(response);
};
