import { RangeSlider } from "@mantine/core";
import { AiFillStar, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { Filter, initialState } from "../../services/Filter";

type RatingFilterProps = Pick<
  Filter,
  | "ratingRange"
  | "setRatingRange"
  | "minimumRatingCount"
  | "setMinimumRatingCount"
>;

type RatingItem = {
  value: number;
  label: string;
};

const ratingItems: RatingItem[] = [
  { value: 100, label: "100+" },
  { value: 1000, label: "1k+" },
  { value: 10000, label: "10k+" },
];

function RatingFilter({
  ratingRange,
  setRatingRange,
  minimumRatingCount,
  setMinimumRatingCount,
}: RatingFilterProps) {
  const handleResetClick = () => {
    if (
      JSON.stringify(ratingRange) !== JSON.stringify(initialState.ratingRange)
    ) {
      setRatingRange(initialState.ratingRange);
    }
    if (minimumRatingCount !== initialState.minimumRatingCount) {
      setMinimumRatingCount(initialState.minimumRatingCount);
    }
  };
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium">Rating</h3>
          <button
            className="p-2 hover:bg-base-300 rounded-lg text-lg md:text-xs text-primary-focus font-bold flex items-center justify-between gap-1"
            onClick={handleResetClick}
          >
            <AiOutlineClose />
            <span className="hidden md:flex">RESET</span>
          </button>
        </div>
        <div className="flex items-center px-2">
          <span className="text-xs">0</span>
          <RangeSlider
            size="lg"
            step={5}
            value={ratingRange}
            onChange={setRatingRange}
            classNames={{
              root: "mx-2 w-full",
              track: "before:bg-base-300 h-0.5",
              bar: "bg-neutral-content",
              thumb: "bg-neutral-content border-none",
              mark: "border-none bg-base-300",
              markLabel: "text-white",
              label:
                "border border-primary-content bg-base-300 text-white font-semibold text-[12px] p-1",
            }}
            label={(value: number) => (
              <span className="inline-flex items-center gap-0.5">
                {value / 10} <AiFillStar size={12} />
              </span>
            )}
            thumbSize={20}
          />
          <span className="text-xs">10</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <div className="flex justify-between grow">
            <h3 className="text-xl font-medium">Rating Count</h3>
            <button
              className="p-2 hover:bg-base-300 rounded-lg text-xs text-primary-focus font-bold flex items-center justify-between gap-1"
              onClick={handleResetClick}
            >
              <AiOutlineClose />
              RESET
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {ratingItems.map((ratingItem: RatingItem) => (
            <button
              key={ratingItem.label}
              className={`flex items-center gap-1 text-left rounded-lg p-2 hover:text-white ${
                ratingItem.value === minimumRatingCount
                  ? "bg-base-300"
                  : "text-primary-focus"
              }`}
              onClick={() =>
                ratingItem.value === minimumRatingCount
                  ? setMinimumRatingCount(0)
                  : setMinimumRatingCount(ratingItem.value)
              }
            >
              <AiOutlineCheck /> {ratingItem.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingFilter;
