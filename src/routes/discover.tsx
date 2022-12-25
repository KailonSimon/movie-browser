import { useEffect, Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import DiscoverFilter from "../components/DiscoverFilter";
import { FilterFunctions, FilterState, initialState } from "../services/Filter";
import {
  fetchAllMoviesProviders,
  fetchDiscoverResults,
  fetchGenres,
} from "../services/Films";
import { useReducer } from "react";
import {
  reducer as filterReducer,
  initialState as filterInitialState,
} from "../services/Filter";
import {
  QueryClient,
  useInfiniteQuery,
  useQueries,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import FilmCard from "../components/FilmCard";

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

const getSkeletonItemCount = (totalItems: number, shownItems: number) => {
  if (totalItems - shownItems > 20) {
    return 19;
  } else {
    return totalItems - shownItems - 1;
  }
};

export const loader = (queryClient: QueryClient) => async () => {
  const query = discoverQuery(initialState);
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

function Discover() {
  const [filterState, dispatch] = useReducer(filterReducer, filterInitialState);
  const { ref: loaderRef, inView } = useInView();

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
      <div className="flex flex-col items-center grow gap-8">
        {discoverIsSuccess && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(75px,150px))] w-full gap-4 justify-items-center md:justify-items-start">
              {data.pages.map((group) => (
                <Fragment key={group.page}>
                  {group.results.map((film) => {
                    if (!film.poster_path) {
                      return null;
                    }
                    return <FilmCard film={film} key={film.id} />;
                  })}
                </Fragment>
              ))}

              {hasNextPage && (
                <>
                  <div
                    className="w-[150px] h-[225px] bg-base-300 rounded-lg animate-pulse"
                    ref={loaderRef}
                  />
                  {[
                    ...Array(
                      getSkeletonItemCount(
                        data?.pages[0]?.total_results,
                        data?.pages?.length * 20
                      )
                    ),
                  ].map((o, i) => (
                    <FilmCard key={i} />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Discover;
