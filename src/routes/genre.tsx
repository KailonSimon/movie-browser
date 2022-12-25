import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchFilmsByGenreID } from "../services/Films";
import { useLoaderData, useParams } from "react-router-dom";
import FilmCard from "../components/FilmCard";
import { Genre } from "../shared/interfaces/genre.interface";
import { Movie, Show } from "../shared/interfaces/film.interface";

const genreQuery = (genreId: string) => ({
  queryKey: ["movies", genreId],
  queryFn: async () => fetchFilmsByGenreID(genreId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({
    params,
  }: any): Promise<{ genres: Genre[]; movies: Movie[]; shows: Show[] }> => {
    const query = genreQuery(params.genreId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function GenreRoute() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data } = useQuery({
    ...genreQuery(params.genreId!),
    initialData,
  });

  return (
    <div className="p-4 pl-8 w-full max-w-screen-2xl">
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full h-20">
          {!!data.genres && (
            <h2 className="text-left text-2xl text-white font-bold">
              {
                data.genres?.find(
                  (genre: any) => genre.id === parseInt(params.genreId!)
                )?.name
              }
            </h2>
          )}
        </div>
        {data?.movies || data?.shows ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(75px,150px))] w-full gap-4 justify-items-center md:justify-items-start">
            {[...data.movies, ...data.shows].map((film) => {
              if (!film.poster_path) {
                return null;
              }
              return <FilmCard film={film} key={film.id} />;
            })}
          </div>
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
}
