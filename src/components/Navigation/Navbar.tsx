import { Link, NavLink, useLocation } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const NavLinks = () => {
  let activeClassName = "font-bold text-neutral-content";
  return (
    <ul className="px-1 inline-flex flex-col md:flex-row w-max gap-4 md:gap-8 text-2xl md:text-base">
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
    <div className="navbar fixed md:px-8 flex flex-col z-[99] backdrop-filter backdrop-blur-lg bg-base-100/50">
      <nav className="flex w-full max-w-screen-2xl relative">
        <NavDrawer
          opened={drawerOpened}
          setOpened={(value) => setDrawerOpened(value)}
        >
          <NavLinks />
        </NavDrawer>
        <div className="flex w-full justify-center md:navbar-start">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl flex flex-nowrap w-min !bg-transparent"
          >
            Movie<span className="text-base-content">Browser</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <NavLinks />
        </div>

        <div className="hidden md:flex navbar-end">
          <SearchBar />
        </div>
      </nav>
      <div className="w-full md:hidden">
        <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
