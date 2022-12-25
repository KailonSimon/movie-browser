import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import FilmAbout from "../components/FilmAbout";
import FilmBanner from "../components/FilmBanner";
import CastCarousel from "../components/CastCarousel";
import FilmProviders from "../components/FilmProviders";
import { fetchFilmPageDetails } from "../services/Films";
import FilmCarousel from "../components/FilmCarousel";
import { Movie } from "../shared/interfaces/film.interface";

const movieInformationQuery = (movieId: string) => ({
  queryKey: ["movies", "details", movieId],
  queryFn: async () => fetchFilmPageDetails(movieId, "movie"),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any): Promise<{ film: Movie; providers: any }> => {
    const query = movieInformationQuery(params.movieId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function MovieRoute() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data, isLoading } = useQuery({
    ...movieInformationQuery(params.movieId!),
    initialData,
  });

  if (!!data.film.status_code) {
    return (
      <div className="w-full h-[calc(100vh-18rem)] flex flex-col justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <FilmBanner film={data.film} />
      <div className="flex flex-col md:flex-row justify-center py-4 bg-base-100">
        <div className="flex flex-col md:grid md:grid-cols-6 max-w-screen-2xl md:gap-8 px-8">
          <div className="flex flex-col py-4 col-span-4 gap-4">
            {data?.providers?.results?.US ? (
              <FilmProviders providers={data.providers.results.US} />
            ) : null}
            {data.film.credits.cast.length > 0 && (
              <CastCarousel cast={data.film.credits.cast} />
            )}
            {data.film.recommendations.results.length > 0 && (
              <FilmCarousel
                title={"Recommended Titles"}
                films={data.film.recommendations.results}
                loading={isLoading}
              />
            )}
          </div>

          <FilmAbout film={data.film} />
        </div>
      </div>
    </div>
  );
}
