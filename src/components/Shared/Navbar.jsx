import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../ThemeToggle";
import { FaBookReader } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "font-semibold"
          }
        >
          Courses
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/my-enrolled"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "font-semibold"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50 px-4">
      <div className="navbar container mx-auto">
          <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="flex gap-2 justify-center items-center normal-case text-2xl font-bold text-primary"
        >
          <FaBookReader /> EducareHub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navLinks}</ul>
      </div>
      <div className="navbar-end space-x-4">
        <ThemeToggle />
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full" title={user?.displayName}>
                <img src={user?.photoURL} alt="User Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-4 py-2 font-semibold">{user?.displayName}</li>
              <li>
                <Link to="/dashboard/my-enrolled">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm md:btn-md">Login</button>
          </Link>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
