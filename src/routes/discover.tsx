import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import DiscoverFilter from "../components/DiscoverFilter";
import { FilterFunctions, FilterState, initialState } from "../services/Filter";
import { fetchDiscoverResults } from "../services/Movies";
import { useReducer } from "react";
import {
  reducer as filterReducer,
  initialState as filterInitialState,
} from "../services/Filter";
import { Pagination } from "@mantine/core";
import { QueryClient, useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";

const discoverQuery = (state: FilterState) => ({
  queryKey: ["movies", "discover"],
  queryFn: async () => fetchDiscoverResults(state),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = discoverQuery(initialState);
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

function Discover() {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data, refetch }: any = useQuery({
    ...discoverQuery(state),
    initialData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, state]);

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
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    reset: () => dispatch({ type: "RESET" }),
  };

  const handlePageChange = (value: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: value });
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col w-full max-w-screen-2xl p-8 md:px-4 gap-8 md:gap-4">
      {data?.genres && (
        <DiscoverFilter
          state={state}
          functions={filterFunctions}
          genres={data.genres}
          providers={data?.providers}
          numberOfResults={data?.discoveries?.total_results}
        />
      )}
      <div className="flex flex-col items-center grow gap-8">
        {data?.discoveries && (
          <>
            <div
              className="grid w-full gap-2 justify-items-center md:justify-items-start"
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
              }}
            >
              {data?.discoveries.results.map((movie: any) => {
                if (!movie.poster_path) {
                  return null;
                }
                return (
                  <MovieCard movie={movie} withRating={false} key={movie.id} />
                );
              })}
            </div>
            <Pagination
              total={data.discoveries.total_pages}
              size="xl"
              page={state.currentPage}
              onChange={(value: number) => handlePageChange(value)}
              classNames={{
                item: "bg-base-200 data-active:bg-neutral-content text-white data-active:text-black hover:bg-base-300 hover:data-dots:bg-base-100 hover:disabled:bg-base-200 border-none",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Discover;
