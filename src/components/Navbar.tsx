import { TextInput } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
  let activeClassName = "font-bold text-neutral-content";
  return (
    <div className="navbar fixed bg-base-200 md:px-8 flex justify-center z-[99]">
      <div className="w-full max-w-screen-2xl">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Movie<span className="text-base-content">Browser</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="px-1 inline-flex w-max gap-8">
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
        </div>

        <div className="hidden md:flex navbar-end">
          <div className="form-control">
            <TextInput
              classNames={{
                wrapper: "hidden md:flex",
                input:
                  "bg-transparent border-base-300 focus:border-neutral-content rounded-full",
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
