import { Movie, Show } from "../../shared/interfaces/film.interface";
import { Provider } from "../DiscoverFilter/ProviderFilter";
import FilmAbout from "./FilmAbout";
import FilmBanner from "./FilmBanner";
import FilmProviders from "./FilmProviders";
import FilmCarousel from "./FilmCarousel";
import FilmVideos from "./FilmVideos";
import PersonCarousel from "../Person/PersonCarousel";

function FilmView({
  film,
  providers,
}: {
  film: Movie | Show;
  providers?: Provider[];
}) {
  return (
    <div className="w-full relative">
      <FilmBanner film={film} />
      <div className="flex flex-col md:flex-row justify-center py-4 bg-base-100">
        <div className="flex flex-col md:grid md:grid-cols-6 max-w-screen-2xl md:gap-8 px-8">
          <div className="flex flex-col py-4 col-span-4 gap-4">
            {providers && <FilmProviders providers={providers} />}
            {film.videos && (
              <FilmVideos
                videos={film.videos.results
                  .filter((video: any) => video.site === "YouTube")
                  .slice(0, 4)}
              />
            )}
            <PersonCarousel
              title={"Top Billed Cast"}
              people={film.credits.cast}
            />
            <FilmCarousel
              title={"Recommended Titles"}
              films={film.recommendations.results}
            />
          </div>
          <FilmAbout film={film} />
        </div>
      </div>
    </div>
  );
}

export default FilmView;
