import { toast } from "react-toastify";

export const handleResponse = async <T>(
  response: Response
): Promise<T | undefined> => {
  if (!response.ok) {
    const errorData = await response.json();
    return void toast.error(errorData.message || "Something went wrong");
  }
  return response.json() as T;
};

export const withCredentials = (headers: HeadersInit): HeadersInit => {
  return {
    ...headers,
    // todo: add jwt token
  };
};
