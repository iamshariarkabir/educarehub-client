import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourse } from "../../api/lib";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddCourse = () => {
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
    document.title = "Dashboard | Add Course";
  }, []);

  const mutation = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      toast.success("Course added successfully!");
     
      queryClient.invalidateQueries(["my-added-courses", user?.email]);
      reset();
      navigate("/dashboard/my-added-courses");
    },
    onError: (error) => {
      toast.error(`Failed to add course: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const courseData = {
      ...data,
      price: parseFloat(data.price), 
      isFeatured: data.isFeatured === "true", 
      instructorName: user?.displayName,
      instructorEmail: user?.email,
      instructorPhoto: user?.photoURL,
    };
    mutation.mutate(courseData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields will go here */}
        <div>
          <label className="label">
            <span className="label-text">Course Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required.</span>
          )}
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
          {errors.imageUrl && (
            <span className="text-red-500">Image URL is required.</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, min: 0 })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <span className="text-red-500">A valid price is required.</span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Duration (e.g., 8 weeks)</span>
            </label>
            <input
              type="text"
              {...register("duration", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.duration && (
              <span className="text-red-500">Duration is required.</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.category && (
              <span className="text-red-500">Category is required.</span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Featured?</span>
            </label>
            <select
              {...register("isFeatured")}
              className="select select-bordered w-full"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
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
          {errors.description && (
            <span className="text-red-500">Description is required.</span>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
