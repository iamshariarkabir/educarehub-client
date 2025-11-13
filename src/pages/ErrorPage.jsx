import { Link, useRouteError } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";

const ErrorPage = () => {
  const error = useRouteError();

  useEffect(() => {
    document.title = "EducareHub | Error";
  }, []);

  return (
    <section className="flex items-center h-screen p-16 bg-base-100 text-base-content">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            Sorry, we couldn't find this page.
          </p>
          <p className="text-red-500 mb-8">
            <i>{error.statusText || error.message}</i>
          </p>
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft className="mr-2" /> Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
