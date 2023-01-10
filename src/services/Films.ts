import { FilterState } from "./Filter";
import dayjs from "dayjs";
import { fetchData } from "./API";
import {
  FetchFilmPageDetails,
  Movie,
  Show,
} from "../shared/interfaces/film.interface";
import { Genre } from "../shared/interfaces/genre.interface";
import { FetchDiscoverResults } from "../shared/interfaces/discover.interface";

export const fetchProvidersById = async (
  filmId: string,
  media_type: "movie" | "tv"
) => {
  return await fetch(
    `${process.env.REACT_APP_MOVIE_DB_BASE_URL}${media_type}/${filmId}/watch/providers?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`
  ).then((res) => res.json());
};

export const fetchAllMoviesProviders = async () => {
  return await fetch(
    `${process.env.REACT_APP_MOVIE_DB_BASE_URL}watch/providers/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&watch_region=US`
  ).then((res) => res.json());
};

export const fetchSimilarMovies = async (movieId: string) => {
  const res = await fetch(`
  ${process.env.REACT_APP_MOVIE_DB_BASE_URL}movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`);
  return await res.json();
};

export const fetchMovieCredits = async (movieId: string) =>
  await fetch(`
  ${process.env.REACT_APP_MOVIE_DB_BASE_URL}movie/${movieId}/credits`).then(
    (res) => res.json()
  );

export async function fetchFilmsByCategory(
  mediaType: "movie" | "tv",
  category: "popular" | "top_rated" | "latest"
): Promise<Movie[] | Show[]> {
  const response = await fetchData(`${mediaType}/${category}`);
  return response.results.map((film: any) => ({
    ...film,
    media_type: mediaType,
  }));
}

export async function fetchHomePageFilms(): Promise<{
  popular: (Movie | Show)[];
  topRated: (Movie | Show)[];
}> {
  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      fetchFilmsByCategory("movie", "popular"),
      fetchFilmsByCategory("tv", "popular"),
      fetchFilmsByCategory("movie", "top_rated"),
      fetchFilmsByCategory("tv", "top_rated"),
    ]);
  return {
    popular: [...popularMovies, ...popularShows],
    topRated: [...topRatedMovies, ...topRatedShows],
  };
}

export const fetchFilmPageDetails: FetchFilmPageDetails = async (
  filmId: string,
  media_type: "movie" | "tv"
) => {
  const [film, providers] = await Promise.all([
    fetch(
      `${process.env.REACT_APP_MOVIE_DB_BASE_URL}${media_type}/${filmId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=credits,keywords,recommendations,videos,reviews`
    ).then((res) => res.json()),
    fetchProvidersById(filmId, media_type),
  ]);
  return {
    film: { ...film, media_type },
    providers,
  };
};

export const fetchGenres = async () =>
  await fetch(`
  ${process.env.REACT_APP_MOVIE_DB_BASE_URL}genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`).then(
    (res) => res.json()
  );

export const fetchFilmsByGenreID = async (
  genreId: string
): Promise<{ genres: Genre[]; movies: Movie[]; shows: Show[] }> => {
  const movieURL = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&region=US`;
  const showURL = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreId}&region=US`;
  const [genresRes, moviesRes, showsRes] = await Promise.all([
    fetchGenres(),
    fetch(movieURL).then((res) => res.json()),
    fetch(showURL).then((res) => res.json()),
  ]);

  return {
    genres: genresRes.genres,
    movies: moviesRes.results.map((film: Movie) => ({
      ...film,
      media_type: "movie",
    })),
    shows: showsRes.results.map((film: Show) => ({
      ...film,
      media_type: "tv",
    })),
  };
};

export const getDiscoveriesUrl = (
  filterState: FilterState,
  pageParam: number
) =>
  `${process.env.REACT_APP_MOVIE_DB_BASE_URL}discover/${filterState.medium}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&` +
  new URLSearchParams({
    sort_by: `${filterState.sortType}.desc`,
    ...(filterState.activeProviders.length
      ? {
          with_watch_providers: filterState.activeProviders.join("|"),
          watch_region: "US",
        }
      : {}),
    ...(filterState.medium === "movie"
      ? {
          "primary_release_date.gte": dayjs()
            .year(new Date().getFullYear() - 100 + filterState.dateRange[0])
            .startOf("year")
            .format("YYYY-MM-DD"),
        }
      : {
          "first_air_date.gte": dayjs()
            .year(new Date().getFullYear() - 100 + filterState.dateRange[0])
            .startOf("year")
            .format("YYYY-MM-DD"),
        }),
    ...(filterState.medium === "movie"
      ? {
          "primary_release_date.lte": dayjs()
            .year(new Date().getFullYear() - 100 + filterState.dateRange[1])
            .startOf("year")
            .format("YYYY-MM-DD"),
        }
      : {
          "first_air_date.lte": dayjs()
            .year(new Date().getFullYear() - 100 + filterState.dateRange[1])
            .startOf("year")
            .format("YYYY-MM-DD"),
        }),
    ...(filterState.includedGenres.length && {
      with_genres: filterState.includedGenres.join("|"),
    }),
    ...(filterState.excludedGenres.length && {
      without_genres: filterState.excludedGenres.join("|"),
    }),
    "vote_average.gte": (filterState.ratingRange[0] / 10).toString(),
    "vote_average.lte": (filterState.ratingRange[1] / 10).toString(),
    ...(filterState.minimumRatingCount && {
      "vote_count.gte": filterState.minimumRatingCount.toString(),
    }),
    "with_runtime.gte": filterState.runtimeRange[0].toString(),
    ...(filterState.runtimeRange[1] < 150 && {
      "with_runtime.lte": filterState.runtimeRange[1].toString(),
    }),
    ...(filterState.monetizationTypes.length && {
      with_watch_monetization_types: filterState.monetizationTypes.join("|"),
    }),
    ...(filterState.medium === "movie"
      ? { include_adult: filterState.includeAdult.toString() }
      : {}),
    page: pageParam.toString(),
  });

export const fetchDiscoverResults: FetchDiscoverResults = async (
  filterState: FilterState,
  pageParam: number
) => {
  try {
    const response = await fetch(getDiscoveriesUrl(filterState, pageParam));
    if (!response.ok) {
      throw new Error("Failed to fetch discover results");
    }
    const data = await response.json();
    return {
      ...data,
      results: data.results.map((film: any) => ({
        ...film,
        media_type: filterState.medium,
      })),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
