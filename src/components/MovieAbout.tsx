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
  return (
    <section className="col-span-2 flex flex-col py-4">
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Status</bdi>
        {movie.status}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Original Language</bdi>
        {new Intl.DisplayNames(["en"], { type: "language" }).of(
          movie.original_language || "en"
        )}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Budget</bdi>
        {movie.budget ? `$${movie.budget.toLocaleString("en")}` : "-"}
      </p>
      <p className="mb-[20px]">
        <bdi className="font-semibold block">Revenue</bdi>
        {movie.revenue ? `$${movie.revenue.toLocaleString("en")}` : "-"}
      </p>
      <p className="text-lg font-semibold block mb-[10px]">Keywords</p>

      {movie.keywords?.keywords?.length > 0 && (
        <ul className="flex flex-row flex-wrap gap-2">
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
      )}
    </section>
  );
}

export default MovieAbout;
