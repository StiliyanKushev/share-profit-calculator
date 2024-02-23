import Cookies from "universal-cookie";
import { IStockQueryResult } from "../../api/stockService";

export const cookies = new Cookies();

export interface IStockState {
  loading: boolean;
  results: IStockQueryResult[];
}

export const initialState: IStockState = {
  results: cookies.get("results") || [],
  loading: false,
};

export type StockAction =
  | {
      type: "stock_found";
      payload: IStockQueryResult;
    }
  | {
      type: "stock_loading";
    }
  | {
      type: "stock_failed";
    };

export const reducer = (
  state: IStockState,
  action: StockAction
): IStockState => {
  switch (action.type) {
    case "stock_found": {
      const newResults = [action.payload, ...state.results];
      return {
        ...state,
        loading: false,
        results:
          (cookies.set("results", newResults) as undefined) ?? newResults,
      };
    }

    case "stock_loading": {
      return {
        ...state,
        loading: true,
      };
    }

    case "stock_failed": {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};
