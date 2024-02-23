import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

import { AuthAction, IAuthState, initialState, reducer } from "./reducer";

export const AuthContext = createContext<{
  state: IAuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
