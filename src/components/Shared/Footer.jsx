import React from "react";
import { Link } from "react-router";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaBookReader,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      e.target.reset();
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="py-10 bg-base-200 sm:pt-16 lg:pt-24">
      <div className="px-4 container mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-8">
            {/* --- Logo and Text --- */}
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <FaBookReader />
              EducareHub
            </Link>

            <p className="text-base leading-relaxed mt-7">
              A premier online learning platform, committed to fostering a
              community of lifelong learners and providing access to world-class
              education for everyone, everywhere.
            </p>

            {/* --- Social Media Icons --- */}
            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a
                  href="#"
                  title="Twitter"
                  className="flex items-center justify-center transition-all duration-200 text-base-content hover:text-primary focus:text-primary"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Facebook"
                  className="flex items-center justify-center transition-all duration-200 text-base-content hover:text-primary focus:text-primary"
                >
                  <FaFacebookF className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Instagram"
                  className="flex items-center justify-center transition-all duration-200 text-base-content hover:text-primary focus:text-primary"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="GitHub"
                  className="flex items-center justify-center transition-all duration-200 text-base-content hover:text-primary focus:text-primary"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* --- Company Links --- */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Help Links --- */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Newsletter Subscription --- */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>
            <form onSubmit={handleSubscribe} className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-primary caret-primary bg-base-100"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3 w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-300 dark:border-gray-700" />

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          © Copyright 2025, All Rights Reserved by EducareHub
        </p>
      </div>
    </footer>
  );
};

export default Footer;