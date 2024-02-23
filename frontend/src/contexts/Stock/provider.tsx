import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

import { IStockState, StockAction, initialState, reducer } from "./reducer";

export const StockContext = createContext<{
  state: IStockState;
  dispatch: Dispatch<StockAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StockProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
};
