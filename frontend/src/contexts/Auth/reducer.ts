import Cookies from "universal-cookie";

const cookies = new Cookies();

export interface IAuthState {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

export const initialState: IAuthState = {
  isLoggedIn: cookies.get("isLogged") || false,
  token: cookies.get("token") || "",
  username: cookies.get("username") || "",
};

export type AuthAction =
  | { type: "login_successful"; payload: { username: string; token: string } }
  | { type: "login_failed" };

export const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case "login_successful": {
      const { username, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        username,
        token,
      };
    }

    case "login_failed": {
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        token: "",
      };
    }

    default:
      return state;
  }
};
