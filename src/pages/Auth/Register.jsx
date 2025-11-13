import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // --- NEW: State for the confirm password field's visibility ---
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch, // We need watch to compare password fields
    formState: { errors },
  } = useForm();

  // Watch the value of the password field to use it in the validation
  const password = watch("password", "");

  useEffect(() => {
    document.title = "EducareHub | Register";
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating account...");

    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            toast.success("Registration Successful!", { id: toastId });
            reset();
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message, { id: toastId });
          });
      })
      .catch((error) => {
        toast.error("Registration Failed. Please try again.", { id: toastId });
        if (error.code === "auth/email-already-in-use") {
          setError("email", {
            type: "manual",
            message: "This email is already registered.",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleGoogleSignIn = () => {
    const toastId = toast.loading("Signing in with Google...");
    googleSignIn()
      .then(() => {
        toast.success("Google Sign-In Successful!", { id: toastId });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left lg:pr-10 max-w-lg">
          <h1 className="text-5xl font-bold">Join Us Now!</h1>
          <p className="py-6">
            Create your account to start learning from the best. Join a
            community of learners and experts today.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Name, Photo URL, and Email fields remain the same */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className={`input input-bordered ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                {...register("photoURL", { required: "Photo URL is required" })}
                placeholder="Photo URL"
                className={`input input-bordered ${
                  errors.photoURL ? "input-error" : ""
                }`}
              />
              {errors.photoURL && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.photoURL.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="email"
                className={`input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /(?=.[A-Z])(?=.[a-z])/,
                      message:
                        "Password must contain an uppercase and a lowercase letter",
                    },
                  })}
                  placeholder="password"
                  className={`input input-bordered w-full pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* --- NEW: Confirm Password Field --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="confirm password"
                  className={`input input-bordered w-full pr-10 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          {/* Social login and link to login page remain the same */}
          <div className="divider px-8">OR</div>
          <div className="p-4 pt-0 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
            <p className="mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;