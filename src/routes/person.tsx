import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { fetchPersonDetails } from "../services/People";
import { sortArrayByPopularity } from "../services/API";
import { PersonAbout, PersonFilmographyTable } from "../components/Person";
import { FilmCarousel } from "../components/Film";
import { Person } from "../shared/interfaces/person.interface";
import { Spoiler } from "@mantine/core";

const personInformationQuery = (personId: string) => ({
  queryKey: ["people", personId],
  queryFn: async () => fetchPersonDetails(personId),
});
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any): Promise<Person> => {
    const query = personInformationQuery(params.personId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function PersonRoute() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const params = useParams();
  const { data: person } = useQuery({
    ...personInformationQuery(params.personId!),
    initialData,
  });

  return (
    <div className="w-full relative p-8 flex justify-center">
      <div className="flex flex-col md:flex-row gap-[30px] w-full max-w-screen-2xl">
        <div className="flex flex-col min-w-[300px] items-center md:items-start">
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
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
          <h2 className="text-4xl font-bold hidden md:block">{person.name}</h2>
          {person.biography ? (
            <div>
              <h3 className="text-2xl text-white font-semibold">Biography</h3>
              <Spoiler
                maxHeight={120}
                showLabel="Read more"
                hideLabel="Hide"
                classNames={{
                  root: "py-3",
                  control:
                    "text-neutral-content focus:outline-neutral-content w-full flex justify-center md:justify-start mt-1",
                }}
              >
                <p className="text-base">{person.biography}</p>
              </Spoiler>
            </div>
          ) : null}
          {person.combined_credits && !!person.combined_credits.cast.length && (
            <FilmCarousel
              title="Known for"
              films={sortArrayByPopularity(person.combined_credits.cast)}
            />
          )}

          {person.combined_credits &&
            !!person.combined_credits.cast.length &&
            !!person.combined_credits.crew.length && (
              <PersonFilmographyTable
                credits={[
                  ...person.combined_credits.cast,
                  ...person.combined_credits.crew,
                ]}
              />
            )}
        </div>
      </div>
    </div>
  );
}
