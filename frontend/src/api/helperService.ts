import { toast } from "react-toastify";
import { cookies } from "../contexts/Auth/reducer";

export const handleResponse = async <T>(
  response?: Response
): Promise<T | undefined> => {
  if (!response) {
    return void toast.error("Failed to fetch");
  }

  if (!response.ok) {
    const errorData = await response.json();
    return void toast.error(errorData.message || "Something went wrong");
  }
  return response.json() as T;
};

export const withCredentials = (headers: HeadersInit): HeadersInit => {
  return {
    ...headers,
    Authorization: `Bearer ${cookies.get("token")}`,
  };
};
