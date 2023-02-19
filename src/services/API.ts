import orderBy from "lodash/orderBy";
import { Country } from "../shared/enums/countries.enums";

export function sortArrayByPopularity(array: any) {
  return [...array].sort(
    (a: any, b: any) => parseFloat(b.popularity) - parseFloat(a.popularity)
  );
}

export const sortFilmCredits = (
  filmCredits: [],
  field: string,
  descending: boolean
): any[] => {
  switch (field) {
    case "release date":
      const creditsWithoutDates = filmCredits.filter(
        (filmCredit: any) =>
          !filmCredit.release_date && !filmCredit.first_air_date
      );
      return [
        ...orderBy(
          filmCredits,
          [
            function (filmCredit: any) {
              return filmCredit.release_date || filmCredit.first_air_date;
            },
          ],
          [descending ? "desc" : "asc"]
        ).filter(
          (filmCredit: any) =>
            filmCredit.release_date || filmCredit.first_air_date
        ),
        ...creditsWithoutDates,
      ];

    case "title":
      return orderBy(
        filmCredits,
        [
          function (filmCredit: any) {
            return filmCredit.original_title || filmCredit.original_name;
          },
        ],
        [descending ? "asc" : "desc"]
      );

    default:
      return filmCredits;
  }
};

export const fetchData = async (
  endpoint: string,
  language = "en-US",
  page = 1,
  region = "US" as Country
) => {
  const url = `${process.env.REACT_APP_MOVIE_DB_BASE_URL}${endpoint}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=${language}&page=${page}&region=${region}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const fetchSearchResults = async (query: string) => {
  const url =
    `${process.env.REACT_APP_MOVIE_DB_BASE_URL}search/multi?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&` +
    new URLSearchParams({ query });
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
