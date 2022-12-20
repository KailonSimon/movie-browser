import { DateRangePicker } from "@mantine/dates";
import {
  RangeSlider,
  Checkbox,
  Select,
  Loader,
  SegmentedControl,
} from "@mantine/core";
import { AiFillStar, AiFillClockCircle, AiFillCalendar } from "react-icons/ai";
import { FilterFunctions, FilterState } from "../services/Filter";

type FilterProps = {
  state: FilterState;
  functions: FilterFunctions;
  refetch: () => void;
  isRefetching: boolean;
};

function Filter({
  state: {
    medium,
    sortType,
    sortDirection,
    dateRange,
    ratingRange,
    runtimeRange,
    includeAdult,
  },
  functions: {
    setMedium,
    setSortType,
    setSortDirection,
    setDateRange,
    setRatingRange,
    setRuntimeRange,
    setIncludeAdult,
  },
  refetch,
  isRefetching,
}: FilterProps) {
  return (
    <div className="border border-primary-content h-min rounded-xl bg-base-200  flex flex-col gap-4 py-4 p-6 grow md:max-w-[20%]">
      <SegmentedControl
        value={medium}
        onChange={setMedium}
        data={[
          { label: "Movies", value: "movie" },
          { label: "Shows", value: "tv" },
        ]}
        classNames={{
          root: "bg-base-200",
          label: "text-white font-semibold",
          labelActive: "text-black",
          active: "bg-neutral-content",
        }}
      />

      <Select
        label="Sort by"
        value={sortType}
        onChange={setSortType}
        data={[
          { value: "popularity", label: "Popularity" },
          {
            value: "release_date",
            label: medium === "movie" ? "Release date" : "First air date",
          },
          { value: "original_title", label: "Title" },
          { value: "vote_average", label: "Rating" },
          { value: "vote_count", label: "Number of votes" },
          ...(medium === "movie"
            ? [{ value: "revenue", label: "Revenue" }]
            : []),
        ]}
        classNames={{
          label: "text-white font-normal",
          input:
            "h-12 bg-base-100 rounded-lg border-primary-content bg-transparent text-neutral-content font-semibold focus:border-neutral-content",
          dropdown: "bg-base-200 rounded-xl border-primary-content",
          item: "data-selected:bg-neutral-content data-selected:data-hovered:bg-neutral-content data-selected:hover:bg-neutral-content data-selected:text-black text-white data-hovered:bg-base-300 font-semibold",
        }}
      />

      <Select
        label="Sort direction"
        value={sortDirection}
        onChange={setSortDirection}
        data={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
        classNames={{
          label: "text-white font-normal",
          input:
            "h-12 bg-base-100 rounded-lg border-primary-content bg-transparent text-neutral-content font-semibold focus:border-neutral-content",
          dropdown: "bg-base-200 rounded-xl border-primary-content",
          item: "data-selected:bg-neutral-content data-selected:data-hovered:bg-neutral-content data-selected:hover:bg-neutral-content data-selected:text-black text-white data-hovered:bg-base-300 font-semibold",
        }}
      />

      <DateRangePicker
        label={medium === "movie" ? "Release date" : "First air date"}
        labelFormat="MMMM D, YYYY"
        inputFormat="MMM D, YYYY"
        value={dateRange}
        onChange={setDateRange}
        classNames={{
          label: "text-white font-normal",
          input:
            "h-12 bg-base-100 rounded-lg border-primary-content bg-transparent text-neutral-content font-semibold focus:border-neutral-content",
          dropdown: "bg-base-200 rounded-xl border-primary-content",
          calendarHeaderLevel: "text-neutral-content hover:bg-base-300",
          calendarHeaderControl: "active:bg-neutral-content",
          yearPickerControl: "hover:bg-base-300 text-white",
          yearPickerControlActive:
            "bg-neutral-content hover:bg-neutral-content text-black font-semibold",
          monthPickerControl: "hover:bg-base-300 text-white",
          monthPickerControlActive:
            "bg-neutral-content hover:bg-neutral-content text-black font-semibold",
          day: "hover:bg-base-300 text-white data-in-range:bg-neutral-content data-in-range:text-black data-in-range:font-semibold data-selected:bg-neutral-content data-selected:text-black data-selected:font-semibold",
        }}
        initialLevel="year"
        closeCalendarOnChange={false}
        clearable={false}
        icon={<AiFillCalendar size={16} className="fill-neutral-content" />}
      />

      <div className="flex flex-col gap-0.5">
        <label className="text-[14px]">Rating</label>
        <RangeSlider
          size="lg"
          step={5}
          min={5}
          value={ratingRange}
          onChange={setRatingRange}
          classNames={{
            track: "before:bg-base-300",
            bar: "bg-neutral-content",
            thumb: "border border-neutral-content bg-base-200 border-none",
            mark: "border-none bg-base-300",
            markLabel: "text-white",
            label:
              "border border-primary-content bg-base-200 text-neutral-content font-semibold text-[14px]",
          }}
          label={(value: number) => (
            <span className="inline-flex items-center gap-0.5">
              {value / 10} <AiFillStar size={12} />
            </span>
          )}
          thumbSize={26}
          thumbChildren={
            <AiFillStar size={20} className="text-neutral-content" />
          }
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="text-[14px]">Runtime</label>
        <RangeSlider
          size="lg"
          step={30}
          min={30}
          max={300}
          precision={0}
          value={runtimeRange}
          onChange={setRuntimeRange}
          classNames={{
            track: "before:bg-base-300",
            bar: "bg-neutral-content",
            thumb: "border border-neutral-content bg-base-200 border-none",
            mark: "border-none bg-base-300",
            markLabel: "text-white",
            label:
              "border border-primary-content bg-base-200 text-neutral-content font-semibold text-[14px]",
          }}
          label={(value: number) => `${value / 60}h`}
          thumbSize={26}
          thumbChildren={
            <AiFillClockCircle size={20} className="text-neutral-content" />
          }
        />
      </div>

      <div className="grow flex flex-col justify-end mt-8">
        <Checkbox
          label="Include 18+"
          checked={includeAdult}
          onChange={(event) => setIncludeAdult(event.currentTarget.checked)}
          classNames={{
            label: "text-white",
            input:
              "bg-neutral-content checked:bg-neutral-content border-neutral-content checked:border-neutral-content",
            icon: "!text-base-200",
          }}
        />
      </div>

      <button
        className="btn btn-outline"
        onClick={refetch}
        disabled={isRefetching}
      >
        {isRefetching ? (
          <Loader variant="dots" className="fill-neutral-content opacity-50" />
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}

export default Filter;
