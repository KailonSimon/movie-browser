import { RangeSlider } from "@mantine/core";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { Filter, initialState } from "../../services/Filter";

type ReleaseDateFilterProps = Pick<Filter, "dateRange" | "setDateRange">;

function ReleaseDateFilter({
  dateRange,
  setDateRange,
}: ReleaseDateFilterProps) {
  const handleResetClick = () => {
    if (JSON.stringify(dateRange) !== JSON.stringify(initialState.dateRange)) {
      setDateRange(initialState.dateRange);
    }
  };
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Release year</h3>
        <button
          className="p-2 hover:bg-base-300 rounded-lg text-lg md:text-xs text-primary-focus font-bold flex items-center justify-between gap-1"
          onClick={handleResetClick}
        >
          <AiOutlineClose />
          <span className="hidden md:flex">RESET</span>
        </button>
      </div>
      <div className="flex items-center px-2">
        <span className="text-xs">{new Date().getFullYear() - 100}</span>
        <RangeSlider
          size="lg"
          value={dateRange}
          onChange={setDateRange}
          step={1}
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
            <span className="inline-flex items-center gap-0.5">{value}</span>
          )}
          scale={(value: number) => value + new Date().getFullYear() - 100}
          thumbSize={20}
        />
        <span className="text-xs">{new Date().getFullYear()}</span>
      </div>

      <div className="flex w-full gap-2">
        <button
          className={`p-2 hover:text-white rounded-lg flex items-center gap-2 ${
            JSON.stringify(dateRange) === JSON.stringify([100, 101])
              ? "bg-base-300"
              : "text-primary-focus"
          }`}
          onClick={() =>
            JSON.stringify(dateRange) === JSON.stringify([100, 101])
              ? setDateRange([0, 100])
              : setDateRange([100, 101])
          }
        >
          <AiOutlineCheck /> This year
        </button>
        <button
          className={`p-2 hover:text-white rounded-lg flex items-center gap-2 ${
            JSON.stringify(dateRange) === JSON.stringify([99, 100])
              ? "bg-base-300"
              : "text-primary-focus"
          }`}
          onClick={() =>
            JSON.stringify(dateRange) === JSON.stringify([99, 100])
              ? setDateRange([0, 100])
              : setDateRange([99, 100])
          }
        >
          <AiOutlineCheck /> Last year
        </button>
      </div>
    </div>
  );
}

export default ReleaseDateFilter;
