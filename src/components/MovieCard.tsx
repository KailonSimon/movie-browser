import { Link } from "react-router-dom";

function MovieCard({ movie }: any) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="w-min">
        <div className="w-[150px] h-[225px] rounded-lg overflow-hidden">
          {movie.poster_path ? (
            <img
              src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`poster for ${movie.title}`}
            />
          ) : null}
        </div>
        <h2 className="font-bold hover:opacity-80 mt-1 text-center">
          {movie.title || movie.original_name}
        </h2>
      </div>
    </Link>
  );
}

export default MovieCard;
