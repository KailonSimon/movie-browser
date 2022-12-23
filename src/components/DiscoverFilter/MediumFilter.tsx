import { SegmentedControl } from "@mantine/core";
import { Filter } from "../../services/Filter";

type MediumFilterProps = Pick<Filter, "medium" | "setMedium">;

function MediumFilter({ medium, setMedium }: MediumFilterProps) {
  return (
    <SegmentedControl
      value={medium}
      onChange={setMedium}
      data={[
        { label: "Movies", value: "movie" },
        { label: "Shows", value: "tv" },
      ]}
      classNames={{
        root: "bg-transparent gap-4",
        label:
          "!text-white opacity-70 hover:opacity-95 font-semibold text-xl px-0",
        labelActive:
          "opacity-100 underline underline-offset-4 decoration-4 decoration-neutral-content",
        active: "bg-transparent",
        control: "!border-none",
      }}
    />
  );
}

export default MediumFilter;
