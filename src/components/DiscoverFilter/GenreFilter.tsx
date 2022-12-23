import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { MdRemove } from "react-icons/md";
import { Filter, initialState } from "../../services/Filter";

type Genre = {
  id: number;
  name: string;
};

type GenreFilterProps = {
  includedGenres: Filter["includedGenres"];
  setIncludedGenres: Filter["setIncludedGenres"];
  excludedGenres: Filter["excludedGenres"];
  setExcludedGenres: Filter["setExcludedGenres"];
  genres: Genre[];
};

function GenreFilter({
  includedGenres,
  setIncludedGenres,
  excludedGenres,
  setExcludedGenres,
  genres,
}: GenreFilterProps) {
  const handleGenreClick = (id: number) => {
    if (includedGenres.includes(id)) {
      setIncludedGenres(
        includedGenres.filter((genreID: number) => genreID !== id)
      );
      setExcludedGenres([...excludedGenres, id]);
    } else if (excludedGenres.includes(id)) {
      setExcludedGenres(
        excludedGenres.filter((genreID: number) => genreID !== id)
      );
    } else {
      setIncludedGenres([...includedGenres, id]);
    }
  };

  const handleResetClick = () => {
    if (
      JSON.stringify(includedGenres) !==
      JSON.stringify(initialState.includedGenres)
    ) {
      setIncludedGenres(initialState.includedGenres);
    }
    if (
      JSON.stringify(excludedGenres) !==
      JSON.stringify(initialState.excludedGenres)
    ) {
      setExcludedGenres(initialState.excludedGenres);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Genres</h3>
        <button
          className="p-2 hover:bg-base-300 rounded-lg text-lg md:text-xs text-primary-focus font-bold flex items-center justify-between gap-1"
          onClick={() => handleResetClick()}
        >
          <AiOutlineClose />
          <span className="hidden md:flex">RESET</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {genres.map((genre: any) => {
          return (
            <button
              key={genre.id}
              className={`flex items-center gap-2 text-left rounded-lg p-2 ${
                includedGenres.includes(genre.id)
                  ? "bg-base-300"
                  : excludedGenres.includes(genre.id)
                  ? "bg-black"
                  : "text-primary-focus"
              }  hover:text-white`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {excludedGenres.includes(genre.id) ? (
                <MdRemove />
              ) : (
                <AiOutlineCheck />
              )}{" "}
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GenreFilter;
