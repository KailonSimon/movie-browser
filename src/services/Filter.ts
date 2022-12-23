import { Reducer } from "react";

export interface Filter {
  medium: "movie" | "tv";
  sortType:
    | "popularity"
    | "release_date"
    | "original_title"
    | "vote_average"
    | "vote_count"
    | "revenue";
  activeProviders: number[];
  dateRange: [number, number];
  includedGenres: number[];
  excludedGenres: number[];
  ratingRange: [number, number];
  minimumRatingCount: number;
  runtimeRange: [number, number];
  monetizationTypes: string[];
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
  setActiveProviders: (providers: number[]) => void;
  setDateRange: (dateRange: [number, number]) => void;
  setIncludedGenres: (includedGenres: number[] | []) => void;
  setExcludedGenres: (excludedGenres: number[] | []) => void;
  setRatingRange: (ratingRange: [number, number]) => void;
  setMinimumRatingCount: (minimumRatingCount: number) => void;
  setRuntimeRange: (runtimeRange: [number, number]) => void;
  setMonetizationTypes: (monetizationTypes: string[]) => void;
  setIncludeAdult: (includeAdult: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
  reset: () => void;
}

export type FilterState = Pick<
  Filter,
  | "medium"
  | "sortType"
  | "activeProviders"
  | "dateRange"
  | "includedGenres"
  | "excludedGenres"
  | "ratingRange"
  | "minimumRatingCount"
  | "runtimeRange"
  | "monetizationTypes"
  | "includeAdult"
  | "currentPage"
>;

export type FilterFunctions = Pick<
  Filter,
  | "setMedium"
  | "setSortType"
  | "setActiveProviders"
  | "setDateRange"
  | "setIncludedGenres"
  | "setExcludedGenres"
  | "setRatingRange"
  | "setMinimumRatingCount"
  | "setRuntimeRange"
  | "setMonetizationTypes"
  | "setIncludeAdult"
  | "setCurrentPage"
  | "reset"
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
  | { type: "SET_ACTIVE_PROVIDERS"; payload: number[] }
  | { type: "SET_DATE_RANGE"; payload: [number, number] }
  | { type: "SET_INCLUDED_GENRES"; payload: number[] }
  | { type: "SET_EXCLUDED_GENRES"; payload: number[] }
  | { type: "SET_RATING_RANGE"; payload: [number, number] }
  | { type: "SET_MINIMUM_RATING_COUNT"; payload: number }
  | { type: "SET_RUNTIME_RANGE"; payload: [number, number] }
  | { type: "SET_MONETIZATION_TYPES"; payload: string[] }
  | { type: "SET_INCLUDE_ADULT"; payload: boolean }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "RESET" };

export const initialState: FilterState = {
  medium: "movie",
  sortType: "popularity",
  activeProviders: [2, 8, 9],
  dateRange: [0, 100],
  includedGenres: [] as number[],
  excludedGenres: [] as number[],
  ratingRange: [10, 100],
  minimumRatingCount: 0,
  runtimeRange: [0, 150],
  monetizationTypes: [],
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
    case "SET_ACTIVE_PROVIDERS":
      return {
        ...state,
        activeProviders: action.payload,
      };
    case "SET_DATE_RANGE":
      return {
        ...state,
        dateRange: action.payload,
      };
    case "SET_INCLUDED_GENRES":
      return {
        ...state,
        includedGenres: action.payload,
      };
    case "SET_EXCLUDED_GENRES":
      return {
        ...state,
        excludedGenres: action.payload,
      };
    case "SET_RATING_RANGE":
      return {
        ...state,
        ratingRange: action.payload,
      };
    case "SET_MINIMUM_RATING_COUNT":
      return {
        ...state,
        minimumRatingCount: action.payload,
      };
    case "SET_RUNTIME_RANGE":
      return {
        ...state,
        runtimeRange: action.payload,
      };
    case "SET_MONETIZATION_TYPES":
      return {
        ...state,
        monetizationTypes: action.payload,
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
    case "RESET":
      return { ...initialState, activeProviders: state.activeProviders };
  }
};
