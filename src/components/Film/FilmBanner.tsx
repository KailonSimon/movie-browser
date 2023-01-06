import { Link } from "react-router-dom";
import { Movie, Show } from "../../shared/interfaces/film.interface";

type FilmBannerProps = {
  film: Movie | Show;
};

function FilmBanner({ film }: FilmBannerProps) {
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${film.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300${film.poster_path}`;
  const title = film.media_type === "movie" ? film.title : film.name;

  return (
    <div className="relative w-full p-8 md:py-16 flex justify-center">
      {!!film.backdrop_path && (
        <div
          className="fixed top-0 w-full h-full -z-10 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}
        />
      )}

      <div className="relative flex flex-col justify-center items-center sm:flex-row z-20 w-full max-w-screen-xl gap-8">
        <div className="w-[300px] min-w-[200px] max-w-[50vw]">
          <img
            src={posterUrl}
            alt={`poster for ${title}`}
            className="rounded-lg shadow shadow-slate-700/40"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "2/3",
            }}
          />
        </div>
        <div className="flex flex-col justify-center h-full md:max-w-[40%]">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl text-center text-neutral-content sm:text-left font-bold font-display">
              {title}
            </h1>
            <p className="italic opacity-75 text-center sm:text-left">
              {film.tagline}
            </p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2">
            {film.genres?.map((genre: any) => (
              <Link
                to={`/genre/${genre.id}`}
                key={genre.id}
                className="hover:opacity-80 rounded-full px-3 py-1 whitespace-nowrap glass font-display"
              >
                {genre.name}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mt-[10px] mb-[8px]">
              Overview
            </h3>
            <p>{film.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmBanner;
