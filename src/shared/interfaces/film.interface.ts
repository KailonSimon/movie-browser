import { Credit } from "./credit.interface";
import { Genre, Keyword } from "./genre.interface";

export interface Film {
  backdrop_path?: string;
  credits: {
    cast: Credit[];
    crew: Credit[];
  };
  genres: Genre[];
  homepage?: string;
  id: number;
  media_type: string;
  original_language: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  recommendations: {
    page: number;
    results: (Movie | Show)[];
    total_pages: number;
    total_results: number;
  };
  status: string;
  status_message?: string;
  status_code?: number;
  tagline?: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Film {
  adult?: boolean;
  belongs_to_collection?: any[];
  budget?: number;
  imdb_id?: string;
  keywords: { keywords: Keyword[] };
  media_type: "movie";
  original_title?: string;
  release_date?: string;
  revenue: number;
  runtime?: number;
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  title: string;
  video: boolean;
}

export interface Show extends Film {
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  keywords: { results: Keyword[] };
  languages: string[];
  last_air_date: string;
  media_type: "tv";
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  type: string;
}

export type FilmTypeName = "movie" | "tv";

export type FilmType<T> = T extends "movie"
  ? Movie
  : T extends "tv"
  ? Show
  : never;

export interface FetchFilmPageDetails {
  <T extends "movie" | "tv">(filmId: string, type: T): Promise<{
    film: FilmType<T>;
    providers: any;
  }>;
}
