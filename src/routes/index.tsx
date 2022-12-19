import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import "swiper/css";
import { fetchHomePageMovies } from "../services/Movies";
import MovieCarousel from "../components/MovieCarousel";

const homePageMoviesQuery = () => ({
  queryKey: ["movies"],
  queryFn: async () => fetchHomePageMovies(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = homePageMoviesQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export default function Index() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const { data: movies }: any = useQuery({
    ...homePageMoviesQuery(),
    initialData,
  });

  return (
    <div className="w-[calc(100vw-2rem)] max-w-screen-2xl flex flex-col gap-4 md:gap-8 px-4 pt-8 pb-16">
      {movies?.popularMovies?.length > 0 && (
        <MovieCarousel title={"What's Popular"} movies={movies.popularMovies} />
      )}
      {movies?.nowPlayingMovies?.length > 0 && (
        <MovieCarousel title={"Now Playing"} movies={movies.nowPlayingMovies} />
      )}
      {movies?.upcomingMovies?.length > 0 && (
        <MovieCarousel
          title={"Upcoming Titles"}
          movies={movies.upcomingMovies}
        />
      )}
      {movies?.topRatedMovies?.length > 0 && (
        <MovieCarousel
          title={"Top Rated Films"}
          movies={movies.topRatedMovies}
        />
      )}
    </div>
  );
}
