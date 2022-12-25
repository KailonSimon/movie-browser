import { TextInput } from "@mantine/core";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import NavDrawer from "./NavDrawer";
import { useEffect, useState } from "react";

const NavLinks = () => {
  let activeClassName = "font-bold text-neutral-content";
  return (
    <ul className="px-1 inline-flex flex-col md:flex-row w-max gap-8 text-2xl md:text-base">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "font-semibold text-neutral-content opacity-70 hover:opacity-100"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="discover"
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "font-semibold text-neutral-content opacity-70 hover:opacity-100"
          }
        >
          Discover
        </NavLink>
      </li>
    </ul>
  );
};

function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setDrawerOpened(false);
  }, [pathname]);

  return (
    <div className="navbar fixed bg-base-200 md:px-8 flex z-[99]">
      <div className="w-full max-w-screen-2xl relative">
        <NavDrawer
          opened={drawerOpened}
          setOpened={(value) => setDrawerOpened(value)}
        >
          <NavLinks />
        </NavDrawer>

        <div className="flex w-full justify-center md:navbar-start">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl flex flex-nowrap w-min b"
          >
            Movie<span className="text-base-content">Browser</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <NavLinks />
        </div>

        <div className="hidden md:flex navbar-end">
          <div className="form-control">
            <TextInput
              classNames={{
                wrapper: "hidden md:flex",
                input:
                  "bg-transparent border-base-300 focus:border-neutral-content rounded-full text-white",
              }}
              placeholder="Search"
              icon={
                <AiOutlineSearch size={16} className="fill-neutral-content" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
