import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyEnrollments } from "../../api/lib";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MyEnrolledCourses = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | My Enrolled Courses";
  }, []);

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["my-enrollments", user?.email],
    queryFn: () => getMyEnrollments(user?.email),
    enabled: !!user?.email, // Only run the query if the user's email is available
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
      {enrollments.length === 0 ? (
        <p>
          You haven't enrolled in any courses yet.{" "}
          <a href="/courses" className="link link-primary">
            Explore courses now!
          </a>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={enrollment.courseImageUrl}
                  alt={enrollment.courseTitle}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{enrollment.courseTitle}</h2>
                <p>
                  Enrolled on:{" "}
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
