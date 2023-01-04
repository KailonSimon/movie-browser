import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { fetchHomePageFilms } from "../services/Films";
import { FilmCarousel } from "../components/Film";
import orderBy from "lodash/orderBy";
import { Movie, Show } from "../shared/interfaces/film.interface";
import "swiper/css";

const homePageFilmsQuery = {
  queryKey: ["films"],
  queryFn: fetchHomePageFilms,
};

export const loader =
  (queryClient: QueryClient) =>
  async (): Promise<{
    popular: (Movie | Show)[];
    topRated: (Movie | Show)[];
  }> => {
    const query = homePageFilmsQuery;
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function Index() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const { data: films, isLoading } = useQuery({
    ...homePageFilmsQuery,
    initialData,
  });

  return (
    <div className="w-[calc(100vw-2rem)] max-w-screen-2xl min-h-[calc(100vh-4rem)] flex flex-col gap-4 md:gap-8 px-4 pt-8 pb-16">
      <FilmCarousel
        title={"What's Popular"}
        films={orderBy(films.popular, [(film) => film.popularity], ["desc"])}
        loading={isLoading}
      />

      <FilmCarousel
        title={"Top Rated Movies & Shows"}
        films={orderBy(films.topRated, [(film) => film.vote_average], ["desc"])}
        loading={isLoading}
      />
    </div>
  );
}
