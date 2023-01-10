import { useState } from "react";
import { Review } from "../../shared/interfaces/film.interface";
import FilmReviewCard from "./FilmReviewCard";

function FilmReviews({ reviews }: { reviews: Review[] }) {
  const [allReviewsShown, setAllReviewsShown] = useState(false);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-white text-left">Reviews</h2>
      <div className="flex flex-col gap-4 py-5 items-center">
        {reviews.slice(0, 3).map((review: Review) => (
          <FilmReviewCard review={review} key={review.id} />
        ))}
        {reviews.length > 3 &&
          allReviewsShown &&
          reviews
            .slice(3)
            .map((review: Review) => (
              <FilmReviewCard review={review} key={review.id} />
            ))}
        {reviews.length > 3 && (
          <button
            className="btn btn-ghost w-fit text-neutral-content normal-case"
            onClick={() => setAllReviewsShown(!allReviewsShown)}
          >
            {allReviewsShown
              ? "Show less"
              : `Show more (${reviews.length - 3})`}
          </button>
        )}
      </div>
    </div>
  );
}

export default FilmReviews;
