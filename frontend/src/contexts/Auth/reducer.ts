import Cookies from "universal-cookie";

export const cookies = new Cookies();

export interface IAuthState {
  isLoggedIn: boolean;
  email: string;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
}

export const initialState: IAuthState = {
  isLoggedIn: cookies.get("isLogged") || false,
  accessToken: cookies.get("accessToken") || "",
  refreshToken: cookies.get("refreshToken") || "",
  email: cookies.get("email") || "",
  loading: false,
};

export type AuthAction =
  | {
      type: "auth_successful";
      payload: { email: string; accessToken: string; refreshToken: string };
    }
  | {
      type: "auth_loading";
    }
  | {
      type: "auth_failed";
    }
  | {
      type: "auth_logout";
    };

export const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case "auth_loading": {
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    }

    case "auth_successful": {
      const { email, accessToken, refreshToken } = action.payload;
      return {
        ...state,
        loading: false,
        isLoggedIn: (cookies.set("isLogged", true) as undefined) ?? true,
        email: (cookies.set("email", email) as undefined) ?? email,
        accessToken:
          (cookies.set("accessToken", accessToken) as undefined) ?? accessToken,
        refreshToken:
          (cookies.set("refreshToken", refreshToken) as undefined) ??
          refreshToken,
      };
    }

    case "auth_failed": {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    }

    case "auth_logout": {
      return {
        ...state,
        isLoggedIn: (cookies.remove("isLogged") as undefined) ?? false,
        accessToken: (cookies.remove("accessToken") as undefined) ?? "",
        refreshToken: (cookies.remove("refreshToken") as undefined) ?? "",
        email: (cookies.remove("email") as undefined) ?? "",
        loading: false,
      };
    }

    default:
      return state;
  }
};
