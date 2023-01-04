import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import DiscoverFilter from "../components/DiscoverFilter/DiscoverFilter";
import {
  fetchAllMoviesProviders,
  fetchDiscoverResults,
  fetchGenres,
} from "../services/Films";
import { useReducer } from "react";
import {
  FilterFunctions,
  reducer as filterReducer,
  initialState as filterInitialState,
  FilterState,
} from "../services/Filter";
import {
  QueryClient,
  useInfiniteQuery,
  useQueries,
} from "@tanstack/react-query";
import FilmGrid from "../components/Film/FilmGrid";

function discoverQuery(filterState: FilterState) {
  return {
    queryKey: ["movies", "discover"],
    queryFn: async ({ pageParam = 1 }) =>
      fetchDiscoverResults(filterState, pageParam),
  };
}

const filterQueries = [
  {
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: Infinity,
  },
  {
    queryKey: ["providers"],
    queryFn: fetchAllMoviesProviders,
    staleTime: Infinity,
  },
];

export const loader = (queryClient: QueryClient) => async () => {
  const query = discoverQuery(filterInitialState);
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

function Discover() {
  const [filterState, dispatch] = useReducer(filterReducer, filterInitialState);

  const initialData = useLoaderData() as any;
  const {
    data,
    isSuccess: discoverIsSuccess,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...discoverQuery(filterState),
    initialData,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null,
    refetchOnWindowFocus: false,
  });

  const [genreResults, providerResults] = useQueries({
    queries: filterQueries,
  });

  useEffect(() => {
    refetch();
  }, [filterState, refetch]);

  const filterFunctions: FilterFunctions = {
    setMedium: (value) => dispatch({ type: "SET_MEDIUM", payload: value }),
    setSortType: (value) => dispatch({ type: "SET_SORT_TYPE", payload: value }),
    setActiveProviders: (value) =>
      dispatch({ type: "SET_ACTIVE_PROVIDERS", payload: value }),
    setDateRange: (value) =>
      dispatch({ type: "SET_DATE_RANGE", payload: value }),
    setIncludedGenres: (value) =>
      dispatch({ type: "SET_INCLUDED_GENRES", payload: value }),
    setExcludedGenres: (value) =>
      dispatch({ type: "SET_EXCLUDED_GENRES", payload: value }),
    setRatingRange: (value) =>
      dispatch({ type: "SET_RATING_RANGE", payload: value }),
    setMinimumRatingCount: (value) =>
      dispatch({ type: "SET_MINIMUM_RATING_COUNT", payload: value }),
    setRuntimeRange: (value) =>
      dispatch({ type: "SET_RUNTIME_RANGE", payload: value }),
    setMonetizationTypes: (value) =>
      dispatch({ type: "SET_MONETIZATION_TYPES", payload: value }),
    setIncludeAdult: (value) =>
      dispatch({ type: "SET_INCLUDE_ADULT", payload: value }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return (
    <div className="flex flex-col w-full max-w-screen-2xl p-8 md:px-4 gap-8 md:gap-4">
      {discoverIsSuccess &&
        !!data?.pages?.length &&
        genreResults.isSuccess &&
        providerResults.isSuccess && (
          <DiscoverFilter
            state={filterState}
            functions={filterFunctions}
            genres={genreResults.data.genres}
            providers={providerResults.data.results}
            numberOfResults={data.pages[0].total_results}
          />
        )}

      {discoverIsSuccess && !!data?.pages?.length && (
        <FilmGrid
          films={data.pages.flatMap((page) => page.results.map((film) => film))}
          totalFilms={data.pages[0].total_results}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
}

export default Discover;
