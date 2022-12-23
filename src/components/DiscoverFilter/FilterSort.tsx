import { useState } from "react";
import { Menu } from "@mantine/core";
import { Filter } from "../../services/Filter";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterSortProps = Pick<Filter, "sortType" | "setSortType">;

type SortOption = {
  value: FilterSortProps["sortType"];
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "popularity", label: "Popularity" },
  { value: "vote_average", label: "Rating" },
  { value: "original_title", label: "Title" },
  { value: "vote_count", label: "Number of ratings" },
  { value: "revenue", label: "Revenue" },
];

function FilterSort({ sortType, setSortType }: FilterSortProps) {
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      shadow="md"
      width={250}
      classNames={{
        dropdown: "bg-base-200 border-none",
        item: "data-selected:bg-neutral-content data-selected:data-hovered:bg-neutral-content data-selected:hover:bg-neutral-content data-selected:text-neutral-content text-white data-hovered:bg-base-300 font-semibold",
      }}
    >
      <Menu.Target>
        <button className="text-primary-focus flex items-center justify-between gap-1 rounded-lg">
          {
            sortOptions.find(
              (sortOption: SortOption) => sortOption.value === sortType
            )?.label
          }{" "}
          {opened ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {sortOptions.map((sortOption: SortOption) => (
          <Menu.Item
            key={sortOption.value}
            onClick={() => setSortType(sortOption.value)}
            className={
              sortOption.value === sortType ? "text-neutral-content" : ""
            }
          >
            {sortOption.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default FilterSort;
