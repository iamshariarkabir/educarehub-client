import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Container from "../Shared/Container";

const HomeBanner = () => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setCurrentTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleThemeChange);
    return () => {
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  return (
    <motion.div
      className={`hero overflow-hidden ${
        currentTheme === "light"
          ? "animated-gradient-light"
          : "animated-gradient-dark"
      }`}
      key={currentTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="hero-overlay bg-opacity-0"></div>

      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left pt-12">
          <div className="hero-content flex-1">
            <div className="max-w-xl">
              <motion.span
                className="text-sm sm:text-base uppercase tracking-wide text-[#f27f0c] font-semibold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Better Learning Future With Us
              </motion.span>
              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold lg:leading-tight mt-2 ${
                  currentTheme === "light" ? "text-gray-800" : "text-white"
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Committed To <br className="hidden lg:block" /> Learn Excellence
                <br className="hidden lg:block" /> In Education
              </motion.h1>
              <motion.p
                className="max-w-lg mx-auto md:mx-0 mt-4 text-base-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                It is a long established fact that a reader will be distracted
                by readable and popular content that provides meaningful
                learning.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Link to="/courses">
                  <button className="btn btn-primary mt-6">Get Started</button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="relative flex justify-center flex-1 h-[300px] md:h-[500px] mt-10 md:mt-0">
            {/* --- THIS IS THE CORRECTED CODE WITH YOUR EXACT IMAGE URLS --- */}
            <motion.img
              src={"https://i.ibb.co/FLBvQ90C/girl-bg.png"}
              alt="Background Shape"
              className="absolute bottom-0 w-full h-full object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <motion.img
              src={"https://i.ibb.co/39TTd9Zk/banner-model.png"}
              alt="Model"
              className="relative z-10 h-full w-auto object-contain"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            />
            {/* --- END OF CORRECTION --- */}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default HomeBanner;