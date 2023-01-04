import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { fetchFilmPageDetails } from "../services/Films";
import { Show } from "../shared/interfaces/film.interface";
import FilmView from "../components/Film/FilmView";

const showInformationQuery = (showId: string) => ({
  queryKey: ["shows", "details", showId],
  queryFn: async () => fetchFilmPageDetails(showId, "tv"),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any): Promise<{ film: Show; providers: any }> => {
    const query = showInformationQuery(params.showId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function ShowRoute() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data } = useQuery({
    ...showInformationQuery(params.showId!),
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

  return <FilmView film={data.film} providers={data.providers.results.US} />;
}
