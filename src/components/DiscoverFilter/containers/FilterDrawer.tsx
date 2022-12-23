import { ReactNode, useState } from "react";
import { Drawer } from "@mantine/core";
import { AiFillFilter, AiOutlineCheck } from "react-icons/ai";

type FilterDrawerProps = {
  children: ReactNode;
};

function FilterDrawer({ children }: FilterDrawerProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {" "}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding={0}
        size="500px"
        classNames={{
          drawer: "bg-base-100 max-w-[75vw]",
          body: "h-full flex flex-col",
          header: "hidden",
        }}
      >
        <div className="flex items-center justify-between min-h-[56px] shadow-xl px-4">
          <h2 className="text-white text-xl font-medium">Filters</h2>
          <button
            className="p-2 hover:bg-base-300 rounded-lg font-bold flex items-center justify-between gap-1 text-neutral-content"
            onClick={() => setOpened(false)}
          >
            <AiOutlineCheck /> Done
          </button>
        </div>
        <div className="flex flex-col divide-y divide-base-200 text-white overflow-y-scroll">
          {children}
        </div>
      </Drawer>
      <button
        className="inline-flex md:hidden items-center justify-center bg-base-300 w-[32px] rounded aspect-square"
        onClick={() => setOpened(true)}
      >
        <AiFillFilter size={18} />
      </button>
    </>
  );
}

export default FilterDrawer;
