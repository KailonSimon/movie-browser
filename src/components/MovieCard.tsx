import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MovieCard({ movie, withRating }: any) {
  if (!movie) {
    return (
      <div className="w-[150px] h-[225px] bg-base-300 rounded-lg animate-pulse" />
    );
  }
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="w-[150px] h-[225px] max-h-fit inline-flex relative"
    >
      {movie.poster_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={`poster for ${movie.title}`}
          className="rounded-lg"
        />
      ) : null}
      {movie.vote_average > 0 && withRating && (
        <div className="h-[34px] w-[34px] absolute -bottom-4 left-2">
          <CircularProgressbar
            value={movie.vote_average * 10}
            text={`${movie.vote_average * 10}`}
            background
            classes={{
              root: "w-full align-middle",
              trail: "stroke-base-100",
              path:
                movie.vote_average > 7
                  ? "stroke-green-500"
                  : movie.vote_average > 5
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

export default MovieCard;
