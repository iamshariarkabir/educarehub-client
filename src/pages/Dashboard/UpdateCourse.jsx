import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { getCourseById, updateCourse } from "../../api/lib";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const UpdateCourse = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Dashboard | Update Course";
  }, []);

  // Fetch the existing course data
  const { data: course, isLoading } = useQuery({
    queryKey: ["course-to-update", id],
    queryFn: () => getCourseById(id),
  });

  
  useEffect(() => {
    if (course) {
      // Pre-fill the form with the fetched course data
      const {
        title,
        imageUrl,
        price,
        duration,
        category,
        isFeatured,
        description,
      } = course;
      reset({
        title,
        imageUrl,
        price,
        duration,
        category,
        isFeatured,
        description,
      });
    }
  }, [course, reset]);
  // --- END OF CHANGE ---

  const mutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["my-added-courses", user?.email],
      });
      queryClient.invalidateQueries({ queryKey: ["course-to-update", id] });
      navigate("/dashboard/my-added-courses");
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const courseData = {
      ...data,
      price: parseFloat(data.price),
      isFeatured: data.isFeatured.toString() === "true",
    };
    mutation.mutate({ id, courseData });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-2xl mx-auto bg-base-100 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Course Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            {...register("imageUrl", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Duration</span>
            </label>
            <input
              type="text"
              {...register("duration", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full"
            >
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Featured?</span>
            </label>
            <select
              {...register("isFeatured")}
              className="select select-bordered w-full"
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
