import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getMyAddedCourses, deleteCourse } from "../../api/lib";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyAddedCourses = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Dashboard | My Added Courses";
  }, []);

  const {
    data: courses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-added-courses", user?.email],
    queryFn: () => getMyAddedCourses(user?.email),
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("Course deleted successfully.");
      refetch(); // Refetch the courses list
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">My Added Courses</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <th>{index + 1}</th>
                <td>{course.title}</td>
                <td>${course.price}</td>
                <td>{course.category}</td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/update-course/${course._id}`}>
                    <button className="btn btn-ghost btn-xs">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <p className="text-center mt-4">
            You have not added any courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAddedCourses;
