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
import { Credit } from "../shared/interfaces/credit.interface";
import {
  Provider,
  ProviderListByCountry,
} from "../shared/interfaces/provider.interface";

/**
 * Retrieves watch providers for a given movie or TV show from the Movie DB API using the given ID and media type,
 * or retrieves all movie providers available in the US from Movie DB API.
 *
 * @param mediaType - The type of media, which can be either 'movie' or 'tv'.
 * @param filmId - The ID of the movie or TV show. If this parameter is not provided, all movie providers in the specified region will be retrieved.
 * @param watch_region: - The ISO-3166-1 code to filter by region. If this parameter is not provided, US movie providers will be retrieved.
 *
 * @returns A Promise object that resolves to the watch providers data as an object.
 *
 * @see {@link https://developers.themoviedb.org/3/watch-providers/get-movie-providers| API documentation for movie watch providers}
 * @see {@link https://developers.themoviedb.org/3/watch-providers/get-tv-providers| API documentation for TV show watch providers}
 * @see {@link https://developers.themoviedb.org/3/watch-providers/get-available-regions| API documentation for watch provider regions}
 */
type FetchProvidersReturnType<T> = T extends { filmId: string }
  ? ProviderListByCountry
  : Provider[];
export const fetchProviders = async <T extends { filmId?: string }>(
  mediaType: "movie" | "tv",
  options?: T & { watchRegion?: string }
): Promise<FetchProvidersReturnType<T>> => {
  try {
    const { REACT_APP_MOVIE_DB_BASE_URL, REACT_APP_MOVIE_DB_API_KEY } =
      process.env;

    const query = `?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`;

    const url = options?.filmId
      ? `${REACT_APP_MOVIE_DB_BASE_URL}${mediaType}/${options.filmId}/watch/providers${query}`
      : `${REACT_APP_MOVIE_DB_BASE_URL}watch/providers/${mediaType}${query}&watch_region=${
          options?.watchRegion ?? "US"
        }`;

    const response = await fetch(url);
    const { results } = await response.json();

    return results;
  } catch (error) {
    throw new Error(`Failed to fetch providers`);
  }
};

/**
 * Retrieves a list of similar movies or TV shows from the Movie DB API using the given ID and media type.
 * @param mediaId - The ID of the media to retrieve similar items for.
 * @param mediaType - The type of the media to retrieve similar items for. Must be either 'movie' or 'tv'.
 *
 * @returns A Promise that resolves to an object containing a list of similar items.
 *
 * @see {@link https://developers.themoviedb.org/3/movies/get-similar-movies| API documentation for similar movies}
 * @see {@link https://developers.themoviedb.org/3/tv/get-similar-tv-shows| API documentation for similar tv shows}
 */
export const fetchSimilarMedia = async (
  mediaId: string,
  mediaType: "movie" | "tv"
) => {
  const res = await fetch(`
  ${process.env.REACT_APP_MOVIE_DB_BASE_URL}${mediaType}/${mediaId}/similar?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`);
  return await res.json();
};

/**
 * Retrieves credits for a movie or TV show from The Movie Database (TMDb) API, using the given media ID and media type.
 * @param mediaId - The ID of the movie or TV show for which to retrieve credits.
 * @param mediaType - The type of media to retrieve credits for, either "movie" or "tv".
 *
 * @returns A Promise that resolves to an object containing the credits data.
 *
 * @see {@link https://developers.themoviedb.org/3/movies/get-movie-credits| API documentation for movie credits}
 * @see {@link https://developers.themoviedb.org/3/tv/get-tv-credits| API documentation for TV show credits}
 */
export const fetchFilmCredits = async (
  mediaId: string,
  mediaType: "movie" | "tv"
): Promise<Credit[]> =>
  await fetch(`
  ${process.env.REACT_APP_MOVIE_DB_BASE_URL}${mediaType}/${mediaId}/credits`).then(
    (res) => res.json()
  );

/**
 * Retrieves a list of movies or TV shows based on a specific category, using The Movie DB API.
 * @param mediaType - The type of media to retrieve. Must be either "movie" or "tv".
 * @param category - The category of the media to retrieve. Must be one of "popular", "top_rated", or "latest".
 *
 * @returns A promise that resolves to an array of Movie or Show objects, depending on the specified media type.
 *
 * @see {@link https://developers.themoviedb.org/3/movies/get-popular-movies| API documentation for popular movies}
 */
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

/**
 * Retrieves a list of popular and top-rated movies and TV shows from [The Movie DB API](https://developers.themoviedb.org/3/movies/get-similar-movies) using category types and returns them as a Promise.
 * @returns A Promise that resolves to an object with the following properties:
 *  - popular: An array of popular movies and TV shows, each represented as a Movie or Show object.
 *  - topRated: An array of top-rated movies and TV shows, each represented as a Movie or Show object.
 *
 *  Implements {@link fetchFilmsByCategory| fetchFilmsByCategory}.
 */
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

/**
 * Retrieves details of a movie or TV show from The Movie Database API using its ID.
 * @param media_type The type of media to fetch. Must be either "movie" or "tv".
 * @param filmId The ID of the movie or TV show to fetch.
 *
 * @returns An object containing details about the movie or TV show, as well as a list of providers that offer it.
 *
 * @see {@link https://developers.themoviedb.org/3/movies/get-movie-details| API documentation for movie details}
 * @see {@link https://developers.themoviedb.org/3/tv/get-tv-details| API documentation for tv show details}
 */

export const fetchFilmPageDetails: FetchFilmPageDetails = async (
  media_type: "movie" | "tv",
  filmId: string
) => {
  const [film, providers] = await Promise.all([
    fetch(
      `${process.env.REACT_APP_MOVIE_DB_BASE_URL}${media_type}/${filmId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=credits,keywords,recommendations,videos,reviews`
    ).then((res) => res.json()),
    fetchProviders(media_type, { filmId }),
  ]);
  return {
    film: { ...film, media_type },
    providers,
  };
};

/**
 * Retrieves a list of all available movie or TV genres from The Movie Database API.
 * @param media_type The type of media to retrieve genres for. Must be either "movie" or "tv".
 *
 * @returns A Promise that resolves to an object containing an array of genre objects, each with an ID and a name.
 *
 * @see {@link https://developers.themoviedb.org/3/genres/get-movie-list| API documentation for movie genres}
 * @see {@link https://developers.themoviedb.org/3/genres/get-tv-list| API documentation for tv show genres}
 */
export const fetchGenres = async (
  media_type: "movie" | "tv"
): Promise<Genre[]> => {
  if (media_type !== "movie" && media_type !== "tv") {
    throw new Error("Invalid media type");
  }
  const url = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}genre/${media_type}/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    const { genres }: { genres: Genre[] } = await response.json();
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
};
/**
 * Retrieves movies and TV shows of a given genre from The Movie Database API and their associated genres.
 * @param genreId - The ID of the genre to search for.
 *
 * @returns A Promise that resolves to an object with three properties:
 *  - genres: an array of Genre objects representing all genres associated with the movies and TV shows returned.
 *  - movies: an array of Movie objects representing all movies of the given genre.
 *  - shows: an array of Show objects representing all TV shows of the given genre.
 */
export const fetchFilmsByGenreID = async (
  genreId: string
): Promise<{ genres: Genre[]; movies: Movie[]; shows: Show[] }> => {
  const movieURL = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&region=US`;
  const showURL = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreId}&region=US`;
  const [genres, moviesRes, showsRes] = await Promise.all([
    fetchGenres("movie"),
    fetch(movieURL).then((res) => res.json()),
    fetch(showURL).then((res) => res.json()),
  ]);

  return {
    genres,
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

/**
 * Returns the URL for a discover search based on the provided filter state and page number.
 * @param filterState - The current filter state for the search.
 * @param pageParam - The page number of the search results to return.
 *
 * @returns The URL for the discover search.
 *
 * @see {@link https://developers.themoviedb.org/3/discover/movie-discover| API documentation for Movie Discover}
 * @see {@link https://developers.themoviedb.org/3/discover/tv-discover| API documentation for TV Discover}
 */
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

/**
 * Retrieves the discover search results based on the provided filter state and page number.
 * @param filterState - The current filter state for the search.
 * @param pageParam - The page number of the search results to return.
 *
 * @returns A promise that resolves to the discover search results.
 *
 * Implements {@link getDiscoveriesUrl| getDiscoveriesUrl}.
 * @see {@link https://developers.themoviedb.org/3/discover/movie-discover| API documentation for Movie Discover}
 * @see {@link https://developers.themoviedb.org/3/discover/tv-discover| API documentation for TV Discover}
 */
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
