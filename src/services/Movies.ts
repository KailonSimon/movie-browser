import { FilterState } from "./Filter";

export const fetchMovieProvidersById = async (movieId: string) => {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`
  ).then((res) => res.json());
};

export const fetchAllMoviesProviders = async () => {
  return await fetch(
    `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`
  ).then((res) => res.json());
};

export const fetchSimilarMovies = async (movieId: string) => {
  const res = await fetch(`
      https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`);
  return await res.json();
};

export const fetchMovieCredits = async (movieId: string) => {
  const res = await fetch(`
        https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`);
  return await res.json();
};

export const fetchHomePageMovies = async () => {
  const [popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
    ]);
  return {
    popularMovies: popularMovies.results,
    nowPlayingMovies: nowPlayingMovies.results,
    upcomingMovies: upcomingMovies.results,
    topRatedMovies: topRatedMovies.results,
  };
};

export const fetchMoviePageDetails = async (movieId: string) => {
  const [details, providers] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=credits,keywords,recommendations`
    ).then((res) => res.json()),
    fetchMovieProvidersById(movieId),
  ]);
  return { ...details, providers };
};

export const fetchGenres = async () => {
  return await fetch(`
  https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`).then(
    (res) => res.json()
  );
};

export const fetchMoviesByGenreID = async (genreId: string) => {
  const [genres, movies, shows] = await Promise.all([
    fetchGenres(),
    fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&region=US`).then(
      (res) => res.json()
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&region=US`
    ).then((res) => res.json()),
  ]);

  return {
    genres: genres.genres,
    movies: movies.results,
    shows: shows.results,
  };
};

export const fetchDiscoverResults = async ({
  sortType,
  sortDirection,
  dateRange,
  ratingRange,
  runtimeRange,
  includeAdult,
  currentPage,
}: FilterState) => {
  return await fetch(`
  https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=${sortType}.${sortDirection}&include_adult=${includeAdult}&page=${currentPage}`).then(
    (res) => res.json()
  );
};
