import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FilmCard from "./FilmCard";
import { Movie, Show } from "../../shared/interfaces/film.interface";

interface FilmGridProps {
  films: (Movie | Show)[];
  totalFilms?: number;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
}

const calculateSkeletonItemCount = (
  totalItems: number,
  shownItems: number
): number => {
  const remainingItems = totalItems - shownItems;
  const maxSkeletonItems = 19;
  const skeletonItemCount =
    remainingItems > maxSkeletonItems ? maxSkeletonItems : remainingItems;
  return skeletonItemCount;
};

function FilmGrid({
  films,
  totalFilms,
  fetchNextPage,
  hasNextPage,
}: FilmGridProps) {
  const { ref: loaderRef, inView } = useInView();
  useEffect(() => {
    if (inView && !!fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(75px,150px))] w-full gap-4 justify-items-center md:justify-items-start">
      {films.map((film) => {
        if (!film.poster_path) {
          return null;
        }
        return <FilmCard film={film} key={film.id} />;
      })}

      {hasNextPage && totalFilms && (
        <>
          <div
            className="w-[150px] h-[225px] bg-base-300 rounded-lg animate-pulse border border-red-400"
            ref={loaderRef}
          />
          {[...Array(calculateSkeletonItemCount(totalFilms, films.length))].map(
            (o, i) => (
              <FilmCard key={i} />
            )
          )}
        </>
      )}
    </div>
  );
}

export default FilmGrid;
