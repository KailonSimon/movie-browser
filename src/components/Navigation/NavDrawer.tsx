import { Drawer, Group, Burger } from "@mantine/core";

type NavDrawerProps = {
  opened: boolean;
  setOpened: (value: React.SetStateAction<boolean>) => void;
  children: JSX.Element;
};

export default function NavDrawer({
  opened,
  setOpened,
  children,
}: NavDrawerProps) {
  return (
    <div className="flex md:hidden absolute">
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="75%"
        classNames={{
          root: "mt-[100px]",
          drawer: "mt-[100px] bg-base-100 text-white",
          header: "hidden",
          body: "flex justify-center text-center",
        }}
      >
        {children}
      </Drawer>

      <Group position="center">
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          classNames={{
            burger:
              "bg-neutral-content before:bg-neutral-content after:bg-neutral-content",
          }}
        />
      </Group>
    </div>
  );
}
