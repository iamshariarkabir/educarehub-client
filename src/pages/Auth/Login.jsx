import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Local loading state specifically for the form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError, // To set server-side errors on the form
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "EducareHub | Login";
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Logging in...");

    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Successful!", { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Login Failed. Please check your credentials.", {
          id: toastId,
        });
        // Set a specific, user-friendly error on the form for invalid credentials
        if (error.code === "auth/invalid-credential") {
          setError("password", {
            type: "manual",
            message: "Incorrect email or password.",
          });
          setError("email", { type: "manual" });
        }
      })
      .finally(() => {
        // Ensure the button is re-enabled on success or failure
        setIsSubmitting(false);
      });
  };

  const handleGoogleSignIn = () => {
    const toastId = toast.loading("Signing in with Google...");
    googleSignIn()
      .then((result) => {
        toast.success("Google Sign-In Successful!", { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:pl-10 max-w-lg">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back! Access your courses and continue your learning journey
            with EducareHub.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              {/* Container to prevent layout shift of the eye icon */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
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
                <span className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </span>
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
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="divider px-8">OR</div>
          <div className="p-4 pt-0 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
            <p className="mt-4">
              New to EducareHub?{" "}
              <Link to="/register" className="link link-primary">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;