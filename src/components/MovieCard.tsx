import { Link } from "react-router-dom";

function MovieCard({ movie }: any) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="w-[150px] h-[225px] max-h-fit inline-flex rounded-lg overflow-hidden"
    >
      {movie.poster_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={`poster for ${movie.title}`}
        />
      ) : null}
    </Link>
  );
}

export default MovieCard;
