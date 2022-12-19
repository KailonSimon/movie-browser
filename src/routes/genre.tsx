import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenreID } from "../services/Movies";
import { useLoaderData, useParams } from "react-router-dom";
import MovieCarousel from "../components/MovieCarousel";

const genreQuery = (genreId: string) => ({
  queryKey: ["movies", genreId],
  queryFn: async () => fetchMoviesByGenreID(genreId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = genreQuery(params.genreId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function Genre() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data }: any = useQuery({
    ...genreQuery(params.genreId!),
    initialData,
  });
  return (
    <div className="p-4 pl-8 w-full max-w-screen-2xl">
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full h-20">
          <h2 className="text-left text-4xl text-neutral-content font-bold">
            {
              data?.genres?.find(
                (genre: any) => genre.id === parseInt(params.genreId!)
              ).name
            }
          </h2>
        </div>
        {data?.movies?.length > 0 && (
          <MovieCarousel title={"Movies"} movies={data.movies} />
        )}
        {data?.shows?.length > 0 && (
          <MovieCarousel title={"TV Shows"} movies={data.shows} />
        )}
      </div>
    </div>
  );
}

export default Genre;
