import { Link } from "react-router-dom";
import dayjs from "dayjs";

function MovieAbout({ movie }: any) {
  return (
    <div className="stats stats-vertical bg-base-200 flex flex-col h-min gap-4 w-full col-span-2 py-2">
      <div className="stat">
        <div className="stat-title">Status</div>
        <div className="stat-value">{movie.status}</div>
        {movie.status === "Released" && movie.release_date ? (
          <div className="stat-desc mt-2 text-sm">
            {dayjs(movie.release_date).format("MMMM D, YYYY")}
          </div>
        ) : null}
      </div>

      {movie.vote_average > 0 ? (
        <div className="stat">
          <div className="stat-title">Rating</div>
          <div className="stat-value">
            {Math.floor(movie.vote_average * 10)}%
          </div>
          <div className="stat-desc mt-2 text-sm">
            {movie.vote_count.toLocaleString("en")} votes
          </div>
        </div>
      ) : null}

      {movie.budget ? (
        <div className="stat">
          <div className="stat-title">Budget</div>
          <div className="stat-value">${movie.budget.toLocaleString("en")}</div>
        </div>
      ) : null}

      {movie.revenue ? (
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">
            ${movie.revenue.toLocaleString("en")}
          </div>
        </div>
      ) : null}

      {movie.keywords?.keywords?.length ? (
        <div className="stat">
          <div className="stat-title">Keywords</div>
          <div className="stat-value text-sm">
            <ul className="flex flex-row flex-wrap gap-2 mt-2">
              {movie.keywords.keywords.map((keyword: any) => (
                <li key={keyword.id} className="py-1">
                  <Link
                    to={`/keyword/${keyword.id}`}
                    className="rounded border border-neutral-content px-[10px] py-1 whitespace-nowrap hover:opacity-80"
                  >
                    {keyword.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MovieAbout;
