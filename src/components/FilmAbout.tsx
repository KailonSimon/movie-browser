import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Movie, Show } from "../shared/interfaces/film.interface";

function FilmAbout({ film }: { film: Movie | Show }) {
  const keywords =
    film.media_type === "movie"
      ? film.keywords?.keywords
      : film.keywords?.results;

  return (
    <div className="stats stats-vertical bg-base-200 flex flex-col max-w-[28rem] h-min gap-4 w-full col-span-2 py-2">
      <div className="stat">
        <div className="stat-title">Status</div>
        <div className="stat-value whitespace-pre-wrap">{film.status}</div>

        <div className="stat-desc mt-2 text-sm">
          {dayjs(
            film.media_type === "movie"
              ? film.release_date
              : film.first_air_date
          ).format("MMMM D, YYYY")}
        </div>
      </div>

      {film.vote_average > 0 ? (
        <div className="stat">
          <div className="stat-title">Rating</div>
          <div className="stat-value whitespace-pre-wrap">
            {Math.floor(film.vote_average * 10)}%
          </div>
          <div className="stat-desc mt-2 text-sm">
            {film.vote_count.toLocaleString("en")} votes
          </div>
        </div>
      ) : null}

      {film.media_type === "tv" && film.number_of_seasons > 0 && (
        <div className="stat">
          <div className="stat-title">No. of Seasons</div>
          <div className="stat-value whitespace-pre-wrap">
            {film.number_of_seasons}
          </div>
        </div>
      )}
      {film.media_type === "tv" && film.number_of_episodes > 0 && (
        <div className="stat">
          <div className="stat-title">No. of Episodes</div>
          <div className="stat-value whitespace-pre-wrap">
            {film.number_of_episodes}
          </div>
        </div>
      )}

      {film.media_type === "movie" && !!film.budget && (
        <div className="stat">
          <div className="stat-title">Budget</div>
          <div className="stat-value whitespace-pre-wrap">
            ${film.budget.toLocaleString("en")}
          </div>
        </div>
      )}

      {film.media_type === "movie" && !!film.revenue && (
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value whitespace-pre-wrap">
            ${film.revenue.toLocaleString("en")}
          </div>
        </div>
      )}

      {keywords?.length > 0 && (
        <div className="stat">
          <div className="stat-title">Keywords</div>
          <div className="stat-value text-sm">
            <ul className="flex flex-row flex-wrap gap-2 mt-2">
              {keywords.map((keyword: any) => (
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
      )}
    </div>
  );
}

export default FilmAbout;
