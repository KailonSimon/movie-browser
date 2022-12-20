import { Reducer } from "react";
import { DateRangePickerValue } from "@mantine/dates";

export interface Filter {
  medium: "movie" | "tv";
  sortType:
    | "popularity"
    | "release_date"
    | "original_title"
    | "vote_average"
    | "vote_count"
    | "revenue";
  sortDirection: "asc" | "desc";
  dateRange: DateRangePickerValue;
  ratingRange: [number, number];
  runtimeRange: [number, number];
  includeAdult: boolean;
  currentPage: number;
  setMedium: (medium: "movie" | "tv") => void;
  setSortType: (
    sortType:
      | "popularity"
      | "release_date"
      | "original_title"
      | "vote_average"
      | "vote_count"
      | "revenue"
  ) => void;
  setSortDirection: (sortDirection: "asc" | "desc") => void;
  setDateRange: (dateRange: DateRangePickerValue) => void;
  setRatingRange: (ratingRange: [number, number]) => void;
  setRuntimeRange: (runtimeRange: [number, number]) => void;
  setIncludeAdult: (includeAdult: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
}

export type FilterState = Pick<
  Filter,
  | "medium"
  | "sortType"
  | "sortDirection"
  | "dateRange"
  | "ratingRange"
  | "runtimeRange"
  | "includeAdult"
  | "currentPage"
>;

export type FilterFunctions = Pick<
  Filter,
  | "setMedium"
  | "setSortType"
  | "setSortDirection"
  | "setDateRange"
  | "setRatingRange"
  | "setRuntimeRange"
  | "setIncludeAdult"
  | "setCurrentPage"
>;

type Action =
  | { type: "SET_MEDIUM"; payload: "movie" | "tv" }
  | {
      type: "SET_SORT_TYPE";
      payload:
        | "popularity"
        | "release_date"
        | "original_title"
        | "vote_average"
        | "vote_count"
        | "revenue";
    }
  | { type: "SET_SORT_DIRECTION"; payload: "asc" | "desc" }
  | { type: "SET_DATE_RANGE"; payload: DateRangePickerValue }
  | { type: "SET_RATING_RANGE"; payload: [number, number] }
  | { type: "SET_RUNTIME_RANGE"; payload: [number, number] }
  | { type: "SET_INCLUDE_ADULT"; payload: boolean }
  | { type: "SET_CURRENT_PAGE"; payload: number };

export const initialState: FilterState = {
  medium: "movie",
  sortType: "popularity",
  sortDirection: "desc",
  dateRange: [
    new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    new Date(),
  ],
  ratingRange: [10, 100],
  runtimeRange: [60, 180],
  includeAdult: false,
  currentPage: 1,
};

export const reducer: Reducer<FilterState, Action> = (
  state,
  action
): FilterState => {
  switch (action.type) {
    case "SET_MEDIUM":
      return {
        ...state,
        medium: action.payload,
      };
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
