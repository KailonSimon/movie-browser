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
  const [icon, setIcon] = useState(<FaChevronDown size={12} />);
  return (
    <Popover
      width={400}
      position="bottom"
      withArrow
      classNames={{
        dropdown: "bg-base-200 border-none rounded-lg p-0",
        arrow: "border-none",
      }}
      onOpen={() => setIcon(<FaChevronUp size={12} />)}
      onClose={() => setIcon(<FaChevronDown size={12} />)}
    >
      <Popover.Target popupType="menu">
        <button className="p-2 text-primary-focus hover:bg-base-300 flex items-center justify-between gap-1 rounded-lg">
          {title} {icon}
        </button>
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
}

export default FilterSelectContainer;
