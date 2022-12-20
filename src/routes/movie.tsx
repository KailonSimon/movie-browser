import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import MovieAbout from "../components/MovieAbout";
import MovieBanner from "../components/MovieBanner";
import MovieCast from "../components/MovieCast";
import MovieProviders from "../components/MovieProviders";
import { fetchMoviePageDetails } from "../services/Movies";
import MovieCarousel from "../components/MovieCarousel";

const movieInformationQuery = (movieId: string) => ({
  queryKey: ["movies", "details", movieId],
  queryFn: async () => fetchMoviePageDetails(movieId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = movieInformationQuery(params.movieId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function Movie() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data: movie }: any = useQuery({
    ...movieInformationQuery(params.movieId!),
    initialData,
  });

  if (movie.status_code === 34) {
    return (
      <div className="w-full h-[calc(100vh-18rem)] flex flex-col justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{movie.status_message}</i>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <MovieBanner movie={movie} />
      <div className="flex flex-col md:flex-row justify-center py-4">
        <div className="flex flex-col md:grid md:grid-cols-6 max-w-screen-2xl md:gap-8 px-8">
          <div className="flex flex-col py-4 col-span-4 gap-4">
            {movie?.providers?.results?.US ? (
              <MovieProviders providers={movie.providers.results.US} />
            ) : null}
            {movie?.credits?.cast?.length > 0 && (
              <MovieCast cast={movie.credits.cast} />
            )}
            {movie.recommendations?.results?.length > 0 && (
              <MovieCarousel
                title={"Recommended Titles"}
                movies={movie.recommendations.results}
              />
            )}
          </div>

          <MovieAbout movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default Movie;
