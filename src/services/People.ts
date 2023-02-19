import { Person } from "../shared/interfaces/person.interface";

/**
 * Retrieves details for a person from the Movie DB API.
 * @param personId - The unique identifier of the person to fetch details for.
 *
 * @returns - A promise that resolves to an object containing the details of the person.
 *
 * @see {@link https://developers.themoviedb.org/3/people/get-person-details| API documentation for person details}
 */
export const fetchPersonDetails = async (personId: string): Promise<Person> => {
  return await fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=combined_credits,external_ids`
  ).then((res) => res.json());
};
