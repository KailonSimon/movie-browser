import { Person } from "./person.interface";

export interface Credit {
  character?: string;
  credit_type?: string;
  department?: string;
  genre_ids?: number[];
  id: string;
  job?: string;
  media?: {
    id: number;
    name: string;
    original_name?: string;
    character?: string;
    episodes: any[];
    seasons: {
      air_date: string;
      poster_path?: string;
      season_number: number;
    }[];
  };
  media_type?: string;
  name: string;
  person?: Partial<Person>;
  profile_path?: string;
}
