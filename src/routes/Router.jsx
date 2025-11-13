import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import AllCourses from "../pages/Courses/AllCourses";
import CourseDetails from "../pages/Courses/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyEnrolledCourses from "../pages/Dashboard/MyEnrolledCourses";
import AddCourse from "../pages/Dashboard/AddCourse";
import MyAddedCourses from "../pages/Dashboard/MyAddedCourses";
import UpdateCourse from "../pages/Dashboard/UpdateCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/courses", element: <AllCourses /> },
      {
        path: "/course/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "my-enrolled", element: <MyEnrolledCourses /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "my-added-courses", element: <MyAddedCourses /> },
      { path: "update-course/:id", element: <UpdateCourse /> },
    ],
  },
]);

export default router;
