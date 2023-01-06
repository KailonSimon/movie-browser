import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Movie, Show } from "../../shared/interfaces/film.interface";

type FilmCardProps = {
  film?: Movie | Show;
  withRating?: boolean;
};

function FilmCard({ film, withRating }: FilmCardProps) {
  if (!film) {
    return (
      <div className="w-[150px] h-[225px] bg-base-300 rounded-lg animate-pulse" />
    );
  }
  return (
    <Link
      to={`/${film.media_type}/${film.id}`}
      className="max-w-[150px] max-h-[225px] inline-flex relative lg:hover:scale-105 transition-transform noSelect"
    >
      {!!film.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w185${film.poster_path}`}
          alt={`poster for ${
            "title" in film ? film.title : "name" in film ? film.name : ""
          }`}
          className="rounded-lg"
        />
      )}
      {film.vote_average > 0 && withRating && (
        <div className="h-[34px] w-[34px] absolute -bottom-4 left-2">
          <CircularProgressbar
            value={film.vote_average * 10}
            text={`${film.vote_average * 10}`}
            background
            classes={{
              root: "w-full align-middle",
              trail: "stroke-base-100",
              path:
                film.vote_average > 7
                  ? "stroke-green-500"
                  : film.vote_average > 5
                  ? "stroke-yellow-300"
                  : "stroke-red-500",
              text: "fill-white text-[38px] font-bold align-middle",
              background: "fill-base-100",
            }}
            styles={{
              text: { dominantBaseline: "middle", textAnchor: "middle" },
              path: {
                strokeLinecap: "round",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
            }}
          />
        </div>
      )}
    </Link>
  );
}

export default FilmCard;
