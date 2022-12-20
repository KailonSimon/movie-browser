import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { sortFilmCredits } from "../services/API";

function PersonFilmographyTable({ credits }: any) {
  const [sort, setSort] = useState({
    field: "release date",
    descending: true,
  });
  const [sortedFilmCredits, setSortedFilmCredits] = useState(
    sortFilmCredits(credits, "release date", true)
  );

  const handleSortFilmCredits = (field: string, descending: boolean): void => {
    setSort({ field, descending });
    setSortedFilmCredits(sortFilmCredits(credits, field, descending));
  };

  return (
    <div>
      <table className="table table-zebra table-fixed w-full mt-4">
        <thead>
          <tr>
            <th className="w-16 py-0 px-4 overflow-hidden">
              <button
                className="bg-tranparent w-full h-12 hover:opacity-80"
                onClick={() =>
                  handleSortFilmCredits("release date", !sort.descending)
                }
              >
                <span className="inline-flex gap-1">
                  Year{" "}
                  {sort.field === "release date" ? (
                    sort.descending ? (
                      <IoMdArrowDropdown
                        color="#fff"
                        className="relative top-1"
                        size={14}
                      />
                    ) : (
                      <IoMdArrowDropup
                        color="#fff"
                        className="relative top-1"
                        size={14}
                      />
                    )
                  ) : null}
                </span>
              </button>
            </th>
            <th className="py-0 px-4 overflow-hidden">
              <button
                className="bg-tranparent w-full h-12 hover:opacity-80 text-left"
                onClick={() => handleSortFilmCredits("title", !sort.descending)}
              >
                <span className="inline-flex gap-1">
                  Film
                  {sort.field === "title" ? (
                    sort.descending ? (
                      <IoMdArrowDropdown
                        color="#fff"
                        className="relative top-1"
                        size={14}
                      />
                    ) : (
                      <IoMdArrowDropup
                        color="#fff"
                        className="relative top-1"
                        size={14}
                      />
                    )
                  ) : null}
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFilmCredits.map((filmCredit: any) => {
            return (
              <tr key={filmCredit.credit_id}>
                <td>
                  {filmCredit.release_date?.substring(0, 4) ||
                    filmCredit.first_air_date?.substring(0, 4) ||
                    "-"}
                </td>
                <td className="inline-block w-full">
                  <Link
                    to={`/movie/${filmCredit.id}`}
                    className="font-bold hover:opacity-80 whitespace-pre-wrap"
                  >
                    {filmCredit.original_title || filmCredit.original_name}
                  </Link>
                  {(filmCredit.character || filmCredit.job) &&
                    ` as ${filmCredit.character || filmCredit.job}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PersonFilmographyTable;
