import { RangeSlider } from "@mantine/core";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { Filter, initialState } from "../../services/Filter";

type RuntimeFilterProps = Pick<Filter, "runtimeRange" | "setRuntimeRange">;

type RuntimeItem = {
  value: [number, number];
  label: string;
};

const runtimeItems: RuntimeItem[] = [
  { value: [0, 30], label: "<30m" },
  { value: [0, 45], label: "45m" },
  { value: [0, 60], label: "1h" },
  { value: [0, 90], label: "1.5h" },
  { value: [0, 120], label: "2h" },
  { value: [0, 150], label: "2.5+" },
];

function RuntimeFilter({ runtimeRange, setRuntimeRange }: RuntimeFilterProps) {
  const handleResetClick = () => {
    if (
      JSON.stringify(runtimeRange) !== JSON.stringify(initialState.runtimeRange)
    ) {
      setRuntimeRange(initialState.runtimeRange);
    }
  };
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Runtime</h3>
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
          value={runtimeRange}
          onChange={setRuntimeRange}
          max={150}
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
            <span className="inline-flex items-center gap-0.5">{value} m</span>
          )}
          thumbSize={20}
        />
        <span className="text-xs whitespace-nowrap">{"2.5 h+"}</span>
      </div>

      <div className="flex flex-wrap w-full gap-2">
        {runtimeItems.map((runtimeItem: RuntimeItem) => (
          <button
            key={runtimeItem.label}
            className={`p-2 hover:text-white rounded-lg flex items-center gap-2 ${
              JSON.stringify(runtimeRange) === JSON.stringify(runtimeItem.value)
                ? "bg-base-300"
                : "text-primary-focus"
            }`}
            onClick={() =>
              JSON.stringify(runtimeRange) === JSON.stringify(runtimeItem.value)
                ? setRuntimeRange([0, 150])
                : setRuntimeRange(runtimeItem.value)
            }
          >
            <AiOutlineCheck />
            {runtimeItem.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RuntimeFilter;
