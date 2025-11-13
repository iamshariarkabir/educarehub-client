import axios from "axios";
import axiosInstance from "./axios";

// =================================================================
//                         COURSE API CALLS
// =================================================================

// Fetch all courses (can be filtered by category)
export const getAllCourses = async (category) => {
  let url = "/courses";
  if (category) {
    url += `?category=${category}`;
  }
  const { data } = await axiosInstance.get(url);
  return data;
};

// Fetch featured courses for the home page
export const getFeaturedCourses = async () => {
  const { data } = await axiosInstance.get("/courses?featured=true");
  return data;
};

// Fetch a single course by its ID
export const getCourseById = async (id) => {
  const { data } = await axiosInstance.get(`/courses/${id}`);
  return data;
};

// Fetch courses added by a specific instructor
export const getMyAddedCourses = async (email) => {
  const { data } = await axiosInstance.get(`/my-courses/${email}`);
  return data;
};

// Add a new course
export const addCourse = async (courseData) => {
  const { data } = await axiosInstance.post("/courses", courseData);
  return data;
};

// Update an existing course
export const updateCourse = async ({ id, courseData }) => {
  const { data } = await axiosInstance.put(`/courses/${id}`, courseData);
  return data;
};

// Delete a course
export const deleteCourse = async (id) => {
  const { data } = await axiosInstance.delete(`/courses/${id}`);
  return data;
};

// =================================================================
//                       ENROLLMENT API CALLS
// =================================================================

// Create a new enrollment
export const createEnrollment = async (enrollmentData) => {
  const { data } = await axiosInstance.post("/enrollments", enrollmentData);
  return data;
};

// Fetch all enrollments for a specific student
export const getMyEnrollments = async (email) => {
  const { data } = await axiosInstance.get(`/my-enrollments/${email}`);
  return data;
};

// =================================================================
//                          USER API CALLS
// =================================================================

// Save a new user to the database
export const saveUser = async (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: "student", // Default role
  };
  const { data } = await axiosInstance.post("/users", currentUser);
  return data;
};
