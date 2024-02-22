import Cookies from "universal-cookie";

export const cookies = new Cookies();

export interface IAuthState {
  isLoggedIn: boolean;
  email: string;
  token: string;
  loading: boolean;
}

export const initialState: IAuthState = {
  isLoggedIn: cookies.get("isLogged") || false,
  token: cookies.get("token") || "",
  email: cookies.get("email") || "",
  loading: false,
};

export type AuthAction =
  | {
      type: "auth_successful";
      payload: { email: string; token: string };
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
      const { email, token } = action.payload;
      return {
        ...state,
        loading: false,
        isLoggedIn: (cookies.set("isLogged", true) as undefined) ?? true,
        email: (cookies.set("email", email) as undefined) ?? email,
        token: (cookies.set("token", token) as undefined) ?? token,
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
        token: (cookies.remove("token") as undefined) ?? "",
        email: (cookies.remove("email") as undefined) ?? "",
        loading: false,
      };
    }

    default:
      return state;
  }
};
