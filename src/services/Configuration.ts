export const fetchCountries = async () =>
  await fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&watch_region=US`
  ).then((res) => res.json());
