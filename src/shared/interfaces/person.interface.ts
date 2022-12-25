import { Credit } from "./credit.interface";

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography?: string;
  birthday?: string;
  combined_credits?: {
    cast: Credit[];
    crew: Credit[];
  };
  deathday?: string;
  external_ids: {
    facebook_id?: string;
    freebase_id?: string;
    freebase_mid?: string;
    imdb_id?: string;
    instagram_id?: string;
    tvrage_id?: number;
    twitter_id?: string;
    wikidata_id?: string;
  };
  gender: 0 | 1 | 2 | 3;
  homepage?: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth?: string;
  popularity: number;
  profile_path?: string;
}
