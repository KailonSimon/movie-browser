import { FilterState } from "./Filter";
import dayjs from "dayjs";

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
  medium,
  sortType,
  sortDirection,
  dateRange,
  ratingRange,
  runtimeRange,
  includeAdult,
  currentPage,
}: FilterState) => {
  const url =
    `https://api.themoviedb.org/3/discover/${medium}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&` +
    new URLSearchParams({
      sort_by: `${sortType}.${sortDirection}`,
      ...(medium === "movie"
        ? {
            "primary_release_date.gte": dayjs(dateRange[0]).format(
              "YYYY-MM-DD"
            ),
          }
        : { "first_air_date.gte": dayjs(dateRange[0]).format("YYYY-MM-DD") }),
      ...(medium === "movie"
        ? {
            "primary_release_date.lte": dayjs(dateRange[1]).format(
              "YYYY-MM-DD"
            ),
          }
        : { "first_air_date.lte": dayjs(dateRange[1]).format("YYYY-MM-DD") }),
      "vote_average.gte": (ratingRange[0] / 10).toString(),
      "vote_average.lte": (ratingRange[1] / 10).toString(),
      "with_runtime.gte": runtimeRange[0].toString(),
      "with_runtime.lte": runtimeRange[1].toString(),
      ...(medium === "movie" ? { include_adult: includeAdult.toString() } : {}),
      page: currentPage.toString(),
    });
  return await fetch(url).then((res) => res.json());
};
