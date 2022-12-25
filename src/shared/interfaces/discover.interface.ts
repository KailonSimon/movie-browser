import { FilterState } from "../../services/Filter";
import { Movie, Show } from "./film.interface";

export interface DiscoverResults {
  page: number;
  results: Movie[] | Show[];
  total_pages: number;
  total_results: number;
}

export interface FetchDiscoverResults {
  (filter: FilterState, pageParam: number): Promise<DiscoverResults>;
}
