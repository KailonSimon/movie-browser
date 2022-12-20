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
import { DateRangePickerValue } from "@mantine/dates";
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
  const {
    data: discoveries,
    refetch,
    isRefetching,
  }: any = useQuery({
    ...discoverQuery(state),
    initialData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, state.currentPage]);

  const filterFunctions: FilterFunctions = {
    setMedium: (value: "movie" | "tv") =>
      dispatch({ type: "SET_MEDIUM", payload: value }),
    setSortType: (
      value:
        | "popularity"
        | "release_date"
        | "original_title"
        | "vote_average"
        | "vote_count"
        | "revenue"
    ) => dispatch({ type: "SET_SORT_TYPE", payload: value }),
    setSortDirection: (value: "asc" | "desc") =>
      dispatch({ type: "SET_SORT_DIRECTION", payload: value }),
    setDateRange: (value: DateRangePickerValue) =>
      dispatch({ type: "SET_DATE_RANGE", payload: value }),
    setRatingRange: (value: [number, number]) =>
      dispatch({ type: "SET_RATING_RANGE", payload: value }),
    setRuntimeRange: (value: [number, number]) =>
      dispatch({ type: "SET_RUNTIME_RANGE", payload: value }),
    setIncludeAdult: (value: boolean) =>
      dispatch({ type: "SET_INCLUDE_ADULT", payload: value }),
    setCurrentPage: (value: number) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
  };

  const handlePageChange = (value: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: value });
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-screen-2xl p-8 md:px-4 gap-8 md:gap-4">
      <DiscoverFilter
        state={state}
        functions={filterFunctions}
        refetch={refetch}
        isRefetching={isRefetching}
      />
      <div className="flex flex-col justify-end items-center grow md:max-w-[75%] gap-8">
        {discoveries && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 w-full">
              {discoveries.results.map((movie: any) => {
                if (!movie.poster_path) {
                  return null;
                }
                return (
                  <div
                    key={movie.id}
                    className="flex flex-col items-center px-2 py-4"
                  >
                    <MovieCard movie={movie} withRating />
                    <h3 className="mt-5 font-bold text-center">
                      {movie.title}
                    </h3>
                  </div>
                );
              })}
            </div>
            <Pagination
              total={discoveries.total_pages}
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
