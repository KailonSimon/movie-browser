import { Reducer } from "react";
import { DateRangePickerValue } from "@mantine/dates";

export interface FilterState {
  sortType: string | null;
  sortDirection: string | null;
  dateRange: DateRangePickerValue;
  ratingRange: [number, number];
  runtimeRange: [number, number];
  includeAdult: boolean;
  currentPage: number;
}

export type FilterFunctions = {
  setSortType: (sortType: string) => void;
  setSortDirection: (sortDirection: string) => void;
  setDateRange: (dateRange: DateRangePickerValue) => void;
  setRatingRange: (ratingRange: [number, number]) => void;
  setRuntimeRange: (runtimeRange: [number, number]) => void;
  setIncludeAdult: (includeAdult: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
};

type Action =
  | { type: "SET_SORT_TYPE"; payload: string | null }
  | { type: "SET_SORT_DIRECTION"; payload: string | null }
  | { type: "SET_DATE_RANGE"; payload: DateRangePickerValue }
  | { type: "SET_RATING_RANGE"; payload: [number, number] }
  | { type: "SET_RUNTIME_RANGE"; payload: [number, number] }
  | { type: "SET_INCLUDE_ADULT"; payload: boolean }
  | { type: "SET_CURRENT_PAGE"; payload: number };

export const initialState: FilterState = {
  sortType: "popularity",
  sortDirection: "desc",
  dateRange: [
    new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    new Date(),
  ],
  ratingRange: [60, 100],
  runtimeRange: [60, 100],
  includeAdult: false,
  currentPage: 1,
};

export const reducer: Reducer<FilterState, Action> = (
  state,
  action
): FilterState => {
  switch (action.type) {
    case "SET_SORT_TYPE":
      return {
        ...state,
        sortType: action.payload,
      };
    case "SET_SORT_DIRECTION":
      return {
        ...state,
        sortDirection: action.payload,
      };
    case "SET_DATE_RANGE":
      return {
        ...state,
        dateRange: action.payload,
      };
    case "SET_RATING_RANGE":
      return {
        ...state,
        ratingRange: action.payload,
      };
    case "SET_RUNTIME_RANGE":
      return {
        ...state,
        runtimeRange: action.payload,
      };
    case "SET_INCLUDE_ADULT":
      return {
        ...state,
        includeAdult: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
