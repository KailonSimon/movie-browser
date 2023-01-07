import { Movie, Show } from "../../shared/interfaces/film.interface";
import { AiOutlineInfoCircle, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

type FilmHeroProps = {
  film: Movie | Show;
  getNextSuggestion: () => void;
};

function FilmHero({ film, getNextSuggestion }: FilmHeroProps) {
  const title = film.media_type === "movie" ? film.title : film.name;
  return (
    <div
      className="hero min-h-[24rem] rounded-2xl bg-top overflow-hidden relative flex"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${film.backdrop_path})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80 absolute"></div>
      <div className="hero-content text-center p-4 md:p-12 w-full flex justify-start">
        <div className="text-left w-full max-w-2xl">
          <h1 className="mb-5 text-neutral-content text-3xl sm:text-4xl lg:text-5xl font-bold !font-[Oswald]">
            {title}
          </h1>

          <p className="mb-5 text-sm sm:text-base">{film.overview}</p>
          <div className="flex flex-wrap gap-2 justify-between">
            <Link
              to={`/${film.media_type}/${film.id}`}
              className="btn grow btn-active bg-base-100/50 border-none flex gap-2 md:hover:scale-105 backdrop-filter backdrop-blur-lg min-w-[50%]"
            >
              <AiOutlineInfoCircle size="16" /> More info
            </Link>
            <button
              className="btn grow btn-wide btn-ghost flex gap-2"
              onClick={getNextSuggestion}
            >
              Next suggestion <AiFillCaretRight size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmHero;
