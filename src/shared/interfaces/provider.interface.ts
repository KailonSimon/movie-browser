import { Country } from "../enums/countries.enums";

export interface Provider {
  display_priorities: Record<string, number>;
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export type ProviderCountry = {
  link: string;
  ads?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
  free?: Provider[];
  rent?: Provider[];
};

export type ProviderListByCountry = {
  [key in Country]: ProviderCountry;
};
