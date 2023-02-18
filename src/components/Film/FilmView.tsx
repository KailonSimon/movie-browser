import { Movie, Show } from "../../shared/interfaces/film.interface";
import FilmAbout from "./FilmAbout";
import FilmBanner from "./FilmBanner";
import FilmProviders from "./FilmProviders";
import FilmCarousel from "./FilmCarousel";
import FilmVideos from "./FilmVideos";
import PersonCarousel from "../Person/PersonCarousel";
import FilmReviews from "./FilmReviews";
import sortedUniqBy from "lodash/sortedUniqBy";
import { ProviderListByCountry } from "../../shared/interfaces/provider.interface";

function FilmView({
  film,
  providers,
}: {
  film: Movie | Show;
  providers?: ProviderListByCountry;
}) {
  return (
    <div className="w-full relative">
      <FilmBanner film={film} />
      <div className="flex flex-col md:flex-row justify-center py-4 pb-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="flex flex-col md:grid md:grid-cols-6 w-full max-w-screen-2xl md:gap-8 px-4 md:p-8">
          <div className="flex flex-col py-4 col-span-4 gap-4">
            {providers && <FilmProviders providers={providers["US"]} />}
            {!!film.videos?.results.length && (
              <FilmVideos
                videos={film.videos.results
                  .filter((video: any) => video.site === "YouTube")
                  .slice(0, 4)}
              />
            )}
            {!!film.credits.cast.length && (
              <PersonCarousel
                title={"Top Billed Cast"}
                people={film.credits.cast}
              />
            )}
            {!!film.reviews.results.length && (
              <FilmReviews
                reviews={sortedUniqBy(
                  [...film.reviews.results].reverse(),
                  "content"
                )}
              />
            )}
            {!!film.recommendations.results.length && (
              <FilmCarousel
                title={"Recommended Titles"}
                films={film.recommendations.results}
              />
            )}
          </div>
          <FilmAbout film={film} />
        </div>
      </div>
    </div>
  );
}

export default FilmView;
