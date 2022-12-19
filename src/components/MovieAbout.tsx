import { Link } from "react-router-dom";

function MovieAbout({ movie }: any) {
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
