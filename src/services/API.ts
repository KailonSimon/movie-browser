import orderBy from "lodash/orderBy";

export const sortArrayByPopularity: any = (array: []) => {
  return [...array].sort(
    (a: any, b: any) => parseFloat(b.popularity) - parseFloat(a.popularity)
  );
};

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
