import { NavLink, Outlet } from "react-router";
import { FaHome, FaList, FaPlusCircle, FaBook, FaBars } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Container from "../components/Shared/Container";

const DashboardLayout = () => {
  const { user } = useAuth();


  const isInstructor = true; 

  const dashboardNavLinks = (
    <>
      
      <li>
        <NavLink
          to="/dashboard/my-enrolled"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white" : ""
          }
        >
          {" "}
          <FaList /> My Enrolled Courses
        </NavLink>
      </li>

      {isInstructor && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-course"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              {" "}
              <FaPlusCircle /> Add Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-added-courses"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              {" "}
              <FaBook /> My Added Courses
            </NavLink>
          </li>
        </>
      )}

      <div className="divider"></div>
      <li>
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses">
          <FaList /> All Courses
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* --- CHANGE HIGHLIGHT: Main content area with proper structure --- */}
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-100 lg:hidden sticky top-0 z-40 shadow-md">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-lg font-bold text-primary">
            EducareHub Dashboard
          </div>
        </div>
        {/* Page content here */}
        <main className="flex-1 p-4 md:p-8 bg-base-200">
          <Outlet />
        </main>
      </div>

      {/* --- CHANGE HIGHLIGHT: Redesigned Sidebar --- */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <div className="p-4 mb-4 border-b">
            <h2 className="text-xl font-bold">EducareHub</h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
              <div>
                <h3 className="font-bold">{user?.displayName}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
          {dashboardNavLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
