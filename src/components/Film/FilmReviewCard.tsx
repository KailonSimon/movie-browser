import { Review } from "../../shared/interfaces/film.interface";
import { Avatar, Badge, Spoiler } from "@mantine/core";
import { AiFillStar } from "react-icons/ai";
import dayjs from "dayjs";
import { marked } from "marked";

function FilmReviewCard({ review }: { review: Review }) {
  const avatarPath =
    review.author_details.avatar_path?.length > 32
      ? review.author_details.avatar_path.slice(1)
      : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`;
  return (
    <div className="flex border border-base-300 bg-base-200 rounded-xl gap-1 md:gap-4 p-3 md:p-6 w-full overflow-hidden text-sm">
      <div className="flex flex-col gap-4 grow max-w-full">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex gap-1 items-center">
            {!!review.author_details.avatar_path ? (
              <Avatar
                radius="xl"
                size="sm"
                src={avatarPath}
                alt={review.author_details.username}
                classNames={{ root: "mr-1 md:mr-2" }}
              />
            ) : (
              <Avatar
                radius="xl"
                size="sm"
                alt={review.author_details.username}
                classNames={{ root: "mr-1 md:mr-2" }}
              >
                {review.author_details.username[0]}
              </Avatar>
            )}
            <h3 className="text-neutral-content font-bold mr-1">
              {review.author_details.username}
            </h3>
            {review.author_details.rating > 0 && (
              <Badge
                classNames={{
                  root: "bg-transparent text-neutral-content border border-base-300 px-2",
                }}
                radius="sm"
                rightSection={<AiFillStar />}
              >
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 0,
                }).format(review.author_details.rating)}
              </Badge>
            )}
          </div>
          <span className="text-xs text-primary-focus">
            {dayjs(review.created_at).format("MMM D, YYYY")}
          </span>
        </div>
        <Spoiler
          maxHeight={64}
          showLabel="Read more"
          hideLabel="Hide"
          classNames={{
            control:
              "text-neutral-content focus:outline-neutral-content w-full flex justify-center md:justify-start mt-1",
          }}
        >
          <div
            className="review-content whitespace-pre-wrap break-word max-w-full"
            dangerouslySetInnerHTML={{ __html: marked.parse(review.content) }}
          />
        </Spoiler>
      </div>
    </div>
  );
}

export default FilmReviewCard;
