import { fetchSearchResults } from "../services/API";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import FilmGrid from "../components/containers/FilmGrid";

const searchQuery = (query: string) => ({
  queryKey: ["search"],
  queryFn: () => fetchSearchResults(query),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = searchQuery(params.query);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function SearchRoute() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data, isSuccess } = useQuery({
    ...searchQuery(params.query!),
    initialData,
  });

  return (
    <div className="w-full relative p-8">
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-2xl text-white text-left">{`Results for "${params.query!}"`}</h2>
        {isSuccess && <FilmGrid films={data.results} />}
      </div>
    </div>
  );
}
