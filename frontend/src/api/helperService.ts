import { toast } from "react-toastify";
import { cookies } from "../contexts/Auth/reducer";
import { refreshToken } from "./authService";

export const ResponseGoneWrong = undefined;
export const ResponseUnauthorizedRetry = null;
export type ResponseAny<T, K = false> =
  | T
  | typeof ResponseGoneWrong
  | (K extends true ? typeof ResponseUnauthorizedRetry : T);

export const handleResponse = async <T, K = true>(
  response?: Response,
  retryOnUnauthorized = true
): Promise<ResponseAny<T, K>> => {
  if (!response) {
    return void toast.error("Failed to fetch");
  }

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.statusCode === 401 && retryOnUnauthorized) {
      return attemptTokenRefresh<T>() as ResponseAny<T, K>;
    } else if (!retryOnUnauthorized) {
      return ResponseUnauthorizedRetry as ResponseAny<T, K>;
    }
    return void toast.error(errorData.message || "Something went wrong");
  }
  return response.json() as T;
};

export const withCredentials = (headers: HeadersInit): HeadersInit => {
  return {
    ...headers,
    Authorization: `Bearer ${cookies.get("accessToken")}`,
  };
};

async function attemptTokenRefresh<T>(): Promise<ResponseAny<T, true>> {
  // try to refresh the token
  const response = await refreshToken({
    refreshToken: cookies.get("refreshToken"),
  });

  // if response has failed then the refresh token is expired
  if (response === ResponseUnauthorizedRetry) {
    // note: you should only ever get to here if you had the tab open overnight
    toast.error("Your session has expired.");
    return ResponseGoneWrong;
  }

  // if response is successful store the new token pair and retry last request
  // note: state here is not updated, just the local cookies, however we never
  //     : really use the state's value from the context api, so i don't give a fak
  cookies.set("accessToken", response?.accessToken);
  cookies.set("refreshToken", response?.refreshToken);
  return ResponseUnauthorizedRetry;
}
