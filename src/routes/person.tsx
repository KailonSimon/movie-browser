import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchPersonDetails } from "../services/People";
import { sortArrayByPopularity } from "../services/API";
import MovieCard from "../components/MovieCard";
import PersonFilmographyTable from "../components/PersonFilmographyTable";
import PersonAbout from "../components/PersonAbout";
import MovieCarousel from "../components/MovieCarousel";

const personInformationQuery = (personId: string) => ({
  queryKey: ["people", personId],
  queryFn: async () => fetchPersonDetails(personId),
});
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = personInformationQuery(params.personId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function Person() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data: person }: any = useQuery({
    ...personInformationQuery(params.personId!),
    initialData,
  });

  return (
    <div className="w-full relative p-8 flex justify-center">
      <div className="flex flex-col md:flex-row gap-[30px] w-full max-w-screen-2xl">
        <div className="flex flex-col min-w-[300px] items-center md:items-start">
          {person.profile_path ? (
            <img
              src={`http://image.tmdb.org/t/p/original/${person.profile_path}`}
              alt={person.name}
              style={{
                height: 450,
                width: "auto",
                maxHeight: "40vh",
                aspectRatio: "2/3",
                objectFit: "cover",
              }}
              className="rounded-lg"
            />
          ) : (
            <div className="w-auto h-[450px] aspect-[2/3] bg-base-200 rounded-lg flex justify-center items-center">
              <span className="text-neutral-content">No Image</span>
            </div>
          )}
          <h2 className="text-3xl font-bold md:hidden mt-4">{person.name}</h2>
          <PersonAbout person={person} />
        </div>
        <div className="grow overflow-hidden flex flex-col gap-4">
          <h2 className="text-3xl font-bold hidden md:block">{person.name}</h2>
          {person.biography ? (
            <>
              <h3 className="text-lg font-semibold">Biography</h3>
              <p>{person.biography}</p>
            </>
          ) : null}
          <MovieCarousel
            title="Known for"
            movies={sortArrayByPopularity(person.combined_credits.cast)}
          />
          <PersonFilmographyTable
            credits={[
              ...person.combined_credits.cast,
              ...person.combined_credits.crew,
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Person;
