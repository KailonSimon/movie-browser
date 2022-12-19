export const fetchPersonDetails = async (personId: string) => {
  return await fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=combined_credits,external_ids`
  ).then((res) => res.json());
};
