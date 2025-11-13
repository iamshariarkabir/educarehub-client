import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";


const partners = [
  "https://i.ibb.co.com/Jj4QvspT/client-logo3.webp",
  "https://i.ibb.co.com/sp8Pkqcb/client-logo10.webp",
  "https://i.ibb.co.com/LdjLMHV8/client-logo1.webp",
  "https://i.ibb.co.com/nqNWggb1/client-logo8.webp",
  "https://i.ibb.co.com/7s3vtwr/client-logo7.webp",
  "https://i.ibb.co.com/R4kRwj7s/client-logo12.webp",
];


const Connection = () => {
  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-col gap-16 md:gap-10">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between bg-base-200 rounded-2xl hover:-translate-y-1.5 shadow-md p-8 hover:shadow-lg transition-all overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold">Become An Instructor</h3>
              <p className="text-gray-600 mt-2">
                Top instructors from around the world teach millions of students
                on our platform.
              </p>
              <Link to="/dashboard/add-course">
                <button className="btn btn-primary mt-5">
                  Start teaching today
                </button>
              </Link>
            </div>
            <div className="relative translate-y-10 lg:translate-y-19 xl:translate-y-14 2xl:translate-y-10 md:translate-x-7">
              {/* --- CHANGE HIGHLIGHT: Using your exact image URL --- */}
              <img
                src="https://i.ibb.co.com/JRCxLFBr/client-logo-banner1.webp"
                alt="Instructors"
                className=""
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between bg-base-200 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-md p-8 hover:shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold">Access To Education</h3>
              <p className="text-gray-600 mt-2">
                Create an account to receive newsletters, course
                recommendations, and promotions.
              </p>
              <Link to="/register">
                <button className="btn btn-primary mt-5">
                  Register for free
                </button>
              </Link>
            </div>
            <div className="relative translate-y-10 lg:translate-y-19 xl:translate-y-14 2xl:translate-y-10 md:translate-x-5">
              {/* --- CHANGE HIGHLIGHT: Using your exact image URL --- */}
              <img
                src="https://i.ibb.co.com/Qjv2SZhr/client-logo-banner2.webp"
                alt="Education"
                className=""
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">Who Will You Learn With?</h2>
          <div className="flex justify-center mt-2">
            <span className="w-20 h-1 bg-[#f27f0c] rounded-full"></span>
          </div>
          <p className="max-w-xl mx-auto mt-4 text-gray-600">
            You can list your partners or instructors’ brands here to show off
            your site’s reputation and help students trust you more.
          </p>
          <div className="max-w-6xl mx-auto mt-10 grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center">
            {partners.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`Partner ${index + 1}`}
                className="mx-auto h-12 object-contain hover:grayscale transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connection;