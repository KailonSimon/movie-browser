import { ReactNode, useState } from "react";
import { Popover } from "@mantine/core";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterSelectContainerProps = {
  title: string;
  children: ReactNode;
};

function FilterSelectContainer({
  title,
  children,
}: FilterSelectContainerProps) {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      width={400}
      position="bottom"
      withArrow
      classNames={{
        dropdown: "bg-base-200 border-none rounded-lg p-0",
        arrow: "border-none",
      }}
    >
      <Popover.Target>
        <button
          className="p-2 text-primary-focus hover:bg-base-300 flex items-center justify-between gap-1 rounded-lg"
          onClick={() => setOpened((o) => !o)}
        >
          {title}{" "}
          {opened ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
}

export default FilterSelectContainer;
