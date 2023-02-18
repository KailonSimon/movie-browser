import { Reducer } from "react";

/**
Filter interface for movie and TV show results
@interface Filter
*/
export interface Filter {
  /** The type of media to filter by ("movie" or "tv"). */
  medium: "movie" | "tv";
  /** The method of sorting results, which can be "popularity", "release_date", "original_title", "vote_average", "vote_count", or "revenue". */
  sortType:
    | "popularity"
    | "release_date"
    | "original_title"
    | "vote_average"
    | "vote_count"
    | "revenue";
  /** The IDs of the watch providers to filter by. */
  activeProviders: number[];
  /** The range of release dates to filter by. */
  dateRange: [number, number];
  /** The IDs of the genres to include in the results. */
  includedGenres: number[];
  /** The IDs of the genres to exclude from the results. */
  excludedGenres: number[];
  /** The range of ratings to filter by. */
  ratingRange: [number, number];
  /** The minimum number of ratings required for a result to be included. */
  minimumRatingCount: number;
  /** The range of runtimes to filter by. */
  runtimeRange: [number, number];
  /** The types of monetization to include in the results. */
  monetizationTypes: ("flatrate" | "free" | "ads" | "rent" | "buy")[];
  /** Whether to include adult content in the results. */
  includeAdult: boolean;
  /** The current page of results. */
  currentPage: number;
  /** A function to set the {@link Filter.medium| medium} property. */
  setMedium: (medium: "movie" | "tv") => void;
  /** A function to set the {@link Filter.sortType| sort type} property. */
  setSortType: (
    sortType:
      | "popularity"
      | "release_date"
      | "original_title"
      | "vote_average"
      | "vote_count"
      | "revenue"
  ) => void;
  /** A function to set the {@link Filter.activeProviders| active providers} property. */
  setActiveProviders: (providers: Filter["activeProviders"]) => void;
  /** A function to set the {@link Filter.dateRange| date range} property. */
  setDateRange: (dateRange: Filter["dateRange"]) => void;
  /** A function to set the {@link Filter.includedGenres| included genres} property. */
  setIncludedGenres: (includedGenres: Filter["includedGenres"]) => void;
  /** A function to set the {@link Filter.excludedGenres| excluded genres} property. */
  setExcludedGenres: (excludedGenres: Filter["excludedGenres"]) => void;
  /** A function to set the {@link Filter.ratingRange| rating range} property. */
  setRatingRange: (ratingRange: Filter["ratingRange"]) => void;
  /** A function to set the {@link Filter.minimumRatingCount| minimum rating count} property. */
  setMinimumRatingCount: (
    minimumRatingCount: Filter["minimumRatingCount"]
  ) => void;
  /** A function to set the {@link Filter.runtimeRange| runtime range} property. */
  setRuntimeRange: (runtimeRange: Filter["runtimeRange"]) => void;
  /** A function to set the {@link Filter.monetizationTypes| monetization types} property. */
  setMonetizationTypes: (
    monetizationTypes: Filter["monetizationTypes"]
  ) => void;
  /** A function to set the {@link Filter.includeAdult| include adult} property. */
  setIncludeAdult: (includeAdult: Filter["includeAdult"]) => void;
  /** A function to set the {@link Filter.currentPage| current page} property. */
  setCurrentPage: (currentPage: Filter["currentPage"]) => void;
  /** A function to reset all the {@link Filter| filter} properties to their default values. */
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
  | "reset"
>;

type Action =
  | { type: "SET_MEDIUM"; payload: Filter["medium"] }
  | { type: "SET_SORT_TYPE"; payload: Filter["sortType"] }
  | { type: "SET_ACTIVE_PROVIDERS"; payload: Filter["activeProviders"] }
  | { type: "SET_DATE_RANGE"; payload: Filter["dateRange"] }
  | { type: "SET_INCLUDED_GENRES"; payload: Filter["includedGenres"] }
  | { type: "SET_EXCLUDED_GENRES"; payload: Filter["excludedGenres"] }
  | { type: "SET_RATING_RANGE"; payload: Filter["ratingRange"] }
  | { type: "SET_MINIMUM_RATING_COUNT"; payload: Filter["minimumRatingCount"] }
  | { type: "SET_RUNTIME_RANGE"; payload: Filter["runtimeRange"] }
  | { type: "SET_MONETIZATION_TYPES"; payload: Filter["monetizationTypes"] }
  | { type: "SET_INCLUDE_ADULT"; payload: Filter["includeAdult"] }
  | { type: "RESET" };

export const initialState: FilterState = {
  medium: "movie",
  sortType: "popularity",
  activeProviders: [2, 8, 9],
  dateRange: [0, 100],
  includedGenres: [],
  excludedGenres: [],
  ratingRange: [10, 100],
  minimumRatingCount: 0,
  runtimeRange: [0, 150],
  monetizationTypes: [],
  includeAdult: false,
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
    case "RESET":
      return { ...initialState, activeProviders: state.activeProviders };
  }
};
