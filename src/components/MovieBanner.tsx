import { Link } from "react-router-dom";

function MovieBanner({ movie }: any) {
  return (
    <div
      className="relative w-full bg-cover p-8 flex justify-center min-h-[40vh]"
      style={{
        backgroundImage: `url('http://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`,
      }}
    >
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-75 z-10" />

      <div className="relative flex flex-col justify-center items-center sm:flex-row z-20 w-full max-w-screen-xl gap-8">
        <div className="w-[300px] min-w-[200px] max-w-[50vw]">
          <img
            src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`poster for ${movie.title}`}
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
            <Link
              to={`/movie/${movie.id}`}
              className="text-3xl font-bold hover:opacity-80"
            >{`${movie.title} ${
              movie.release_date
                ? `(${movie.release_date.substring(0, 4)})`
                : ""
            }`}</Link>
            <p className="italic opacity-75">{movie.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres?.map((genre: any) => (
              <Link
                to={`/genre/${genre.id}`}
                key={genre.id}
                className="bg-base-100 hover:opacity-80 rounded-full px-3 py-1 whitespace-nowrap"
              >
                {genre.name}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mt-[10px] mb-[8px]">
              Overview
            </h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBanner;
